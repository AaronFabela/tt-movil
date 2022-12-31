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

  useEffect(() => {
    prestadoresService.getPrestadores().then(
      (response) => {
        setPrestadores(response.data)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

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
        <ScrollView>
          <View style={styles.servicios}>
            <View style={styles.serviciosRow}>
              <CardServicio
                titulo={'Carpinteria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/carpentry.png`)}
                    style={{ width: 60, height: 60 }}
                  />
                }
              />
              <CardServicio
                titulo={'Plomeria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/plumber.png`)}
                    style={{ width: 60, height: 60 }}
                  />
                }
              />
            </View>
            <View style={styles.serviciosRow}>
              <MiniCardServicio
                titulo={'Cerrajeria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/cerrajeria.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
              />
              <MiniCardServicio
                titulo={'Albañileria'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/brickwall.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
              />
              <MiniCardServicio
                titulo={'Electricista'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/electricist.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
              />
              <MiniCardServicio
                titulo={'Pintura'}
                icono={
                  <Image
                    source={require(`../../assets/iconosServicios/paint.png`)}
                    style={{ width: 50, height: 50 }}
                  />
                }
              />
            </View>
          </View>
          <View style={styles.listaServicios}>
            {prestadores.map((prestador) => (
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
            ))}
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
