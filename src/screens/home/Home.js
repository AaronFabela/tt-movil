import { Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import { AuthContext } from '../../context/AuthContext'
import { getCurrentLocation } from '../../utils/helpers'
import { ActivityIndicator } from 'react-native-paper'
import CardServicio from './components/CardServicio'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MiniCardServicio from './components/MiniCardServicio'
import ItemServicio from './components/ItemServicio'
import prestadoresService from '../../services/prestadores.service'

const Home = ({ navigation }) => {
  const { userInfo, ubicacion, setUbicacion } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [prestadores, setPrestadores] = useState([])
  const [prestadoresFilter, setPrestadoresFilter] = useState([])

  useEffect(() => {
    prestadoresService.getPrestadoresByActivos().then(
      (response) => {
        setPrestadores(response.data)
        setPrestadoresFilter(response.data)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const handleFilter = (servicio) => {
    const prestadoresF = []
    for (let i = 0; i < prestadores.length; i++) {
      for (let j = 0; j < prestadores[i].servicios.length; j++) {
        prestadores[i]?.servicios[j]?.nombre === servicio
          ? prestadoresF.push(prestadores[i])
          : null
      }
    }
    setPrestadoresFilter(prestadoresF)
  }

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}
    >
      {isLoading ? (
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator
            size={50}
            animating={true}
            color={COLORS.primary}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
        >
          <View style={styles.servicios}>
            <View style={styles.serviciosRow}>
              <CardServicio
                titulo={'carpinteria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/carpentry.png`)}
                    style={{ width: 60, height: 60 }}
                  />
                }
                handleFilter={handleFilter}
              />
              <CardServicio
                titulo={'plomeria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/plumber.png`)}
                    style={{ width: 60, height: 60 }}
                  />
                }
                handleFilter={handleFilter}
              />
            </View>
            <View style={styles.serviciosRow}>
              <MiniCardServicio
                titulo={'cerrajeria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/cerrajeria.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
                handleFilter={handleFilter}
              />
              <MiniCardServicio
                titulo={'albañileria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/brickwall.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
                handleFilter={handleFilter}
              />
              <MiniCardServicio
                titulo={'electricista'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/electricist.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
                handleFilter={handleFilter}
              />
              <MiniCardServicio
                titulo={'pintura'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/paint.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
                handleFilter={handleFilter}
              />
            </View>
          </View>
          <View style={styles.listaServicios}>
            {prestadoresFilter.length > 0 ? (
              prestadoresFilter?.map((prestador) => (
                <ItemServicio
                  key={prestador._id}
                  cover={
                    <Image
                      source={{
                        uri: 'https://www.creadores.unam.mx/wp-content/uploads/2019/04/Escuela-Superior-de-Co%CC%81mputo-1280x720.jpg',
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  }
                  prestador={prestador}
                  navigation={navigation}
                />
              ))
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Image
                  source={require('../../assets/problem.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text>No contamos con prestadores en tu zona</Text>
              </View>
            )}
            {}
          </View>
        </ScrollView>
        // <Text>Hola</Text>
      )}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  servicios: {
    width: '100%',
    paddingHorizontal: 15,
    height: 300,
  },
  listaServicios: {
    width: '100%',
    paddingHorizontal: 15,
  },
  serviciosRow: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
