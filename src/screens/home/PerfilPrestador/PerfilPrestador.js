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
import routes from '../../../constants/routes'
import chatService from '../../../services/chat.service'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Alert } from 'react-native'

const PerfilPrestador = ({ route }) => {
  const { userInfo } = useContext(AuthContext)
  const { id, navigation } = route.params
  const [prestador, setPrestador] = useState([])
  const [index, setIndex] = React.useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [ordenesServicio, setOrdenesServicio] = useState([])
  const [ordenesServicioFiltradas, setOrdenesServicioFiltradas] = useState([])
  const [servicioActivo, setServicioActivo] = useState('Todos')
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
        ordenServicioService.getOrdenesServicioByTerminadas(id).then(
          (response) => {
            console.log(response.data)
            setOrdenesServicio(response.data)
            setOrdenesServicioFiltradas(response.data)
            setIsLoading(false)
          },
          (error) => {
            console.log(error)
          }
        )
      )

    // navigation.setOptions({ title: nombre })
  }, [])

  const handleFilter = (servicio) => {
    if (servicio === 'Todos') {
      setOrdenesServicioFiltradas(ordenesServicio)
    } else {
      const ordenesF = []
      for (let i = 0; i < ordenesServicio.length; i++) {
        ordenesServicio[i]?.servicio?.nombre === servicio
          ? ordenesF.push(ordenesServicio[i])
          : null
      }
      setOrdenesServicioFiltradas(ordenesF)
    }
  }

  const handleMessage = async () => {
    try {
      const response = await chatService.nuevoChat(userInfo.id, prestador._id)
      if (response != null) {
        Alert.alert('Chat creado con éxito')
        navigation.navigate(routes.HOME_TAB, {
          screen: routes.CHAT_NAVIGATION,
        })
      }
    } catch (error) {}
  }

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
                      uri: prestador?.perfil?.secure_url
                        ? prestador?.perfil?.secure_url
                        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
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
                        width: '100%',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 5,
                      }}
                    >
                      <Text
                        style={{ color: 'white' }}
                        onPress={() => handleMessage()}
                      >
                        Mensaje
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        width: '100%',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate(routes.CREARORDENSERVICIOMODAL, {
                          prestador,
                        })
                      }
                    >
                      <Text style={{ color: 'white' }}>Contratar</Text>
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
                      icono={{ uri: servicio.icono }}
                      nombre={servicio.nombre}
                      setServicioActivo={setServicioActivo}
                      servicioActivo={servicioActivo}
                      handleFilter={handleFilter}
                    />
                  ))}
                  <ItemServicioDisponible
                    key='todos'
                    icono={require('../../../assets/iconosServicios/all.png')}
                    nombre='Todos'
                    setServicioActivo={setServicioActivo}
                    servicioActivo={servicioActivo}
                    handleFilter={handleFilter}
                  />
                </ScrollView>
              </View>
            </View>
            <View style={styles.ordenesServicio}>
              {ordenesServicioFiltradas?.length > 0 ? (
                ordenesServicioFiltradas.map((ordenServicio) => (
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
