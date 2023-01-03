import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import prestadoresService from '../../../services/prestadores.service'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useState } from 'react'
import { COLORS } from '../../../constants'
import { Tab, TabView } from '@rneui/themed'
import ItemOrdenServicio from './components/ItemOrdenServicio'
import ItemServicioDisponible from './components/ItemServicioDisponible'
import ordenServicioService from '../../../services/ordenServicio.service'

const PerfilPrestador = ({ route }) => {
  const { id, navigation } = route.params
  const [prestador, setPrestador] = useState([])
  const [index, setIndex] = React.useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [ordenesServicio, setOrdenesServicio] = useState([])
  const [ordenesServicioFiltradas, setOrdenesServicioFiltradas] = useState([])
  useEffect(() => {
    prestadoresService
      .getPrestadorId(id)
      .then(
        (response) => {
          setPrestador(response.data)
        },
        (error) => {
          console.log(error)
        }
      )
      .then(
        ordenServicioService.getOrdenServicioByPrestador(id).then(
          (response) => {
            console.log(response.data)
            setOrdenesServicio(response.data)
            setIsLoading(false)
          },
          (error) => {
            console.log(error)
          }
        )
      )

    // navigation.setOptions({ title: nombre })
  }, [])
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}
    >
      {isLoading ? (
        <View
          style={{
            padding: 15,
            width: '100%',
            flex: 1,
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator
            size={50}
            animating={true}
            color={COLORS.primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.perfil}>
              <View style={styles.portada}>
                <View style={styles.imagenPerfil}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View style={styles.datos}>
                  <View style={styles.informacion}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                      {prestador?.usuario}
                    </Text>
                    <Text style={{ fontSize: 15 }}>{prestador?.email}</Text>
                  </View>
                  <View style={styles.btn}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        width: 70,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: 'white' }}>Mensaje</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.serviciosDisp}>
              <View style={styles.serTitulo}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Servicios ofertados
                </Text>
              </View>
              <View style={styles.cardServDisp}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {prestador?.servicios?.map((servicio) => (
                    <ItemServicioDisponible
                      key={servicio._id}
                      icono={require('../../../assets/iconosServicios/electricist.png')}
                      nombre={servicio.nombre}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.ordenesServicio}>
              {ordenesServicio?.length > 0 ? (
                ordenesServicio.map((ordenServicio) => (
                  <ItemOrdenServicio
                    key={ordenServicio._id}
                    ordenServicio={ordenServicio}
                    navigation={navigation}
                    prestador={prestador}
                  />
                ))
              ) : (
                <Text>No cuenta con ordenes de servicio terminadas</Text>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default PerfilPrestador

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
  },
  perfil: {
    marginVertical: 15,
    width: '100%',
  },
  portada: {
    height: 100,
    flexDirection: 'row',
  },
  imagenPerfil: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datos: {
    flex: 7,
    flexDirection: 'row',
    padding: 15,
  },
  informacion: {
    flex: 2,
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviciosDisp: {
    height: 130,
    marginBottom: 15,
  },
  serTitulo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardServDisp: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ordenesServicio: {
    width: '100%',
  },
})
