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
import servicioService from '../../services/servicios.service'
import routes from '../../constants/routes'

const Home = ({ navigation }) => {
  const { userInfo, ubicacion, setUbicacion } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [prestadores, setPrestadores] = useState([])
  const [prestadoresFilter, setPrestadoresFilter] = useState([])
  const [servicios, setServicios] = useState([])
  const [servicios1, setServicios1] = useState([])
  const [servicios2, setServicios2] = useState([])

  useEffect(() => {
    prestadoresService.getPrestadoresByActivos().then(
      (response) => {
        setPrestadores(response.data)
        setPrestadoresFilter(response.data)
      },
      (error) => {
        console.log(error)
      }
    )

    servicioService.getServicios().then(
      (response) => {
        setServicios(response.data)
        setServicios1(response.data.slice(0, 3))
        setServicios2(response.data.slice(3))
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
              {servicios1.map((servicio1) => (
                <CardServicio
                  titulo={servicio1.nombre}
                  icono={
                    <Image
                      source={require(`../../assets/iconosServicios/carpentry.png`)}
                      style={{ width: 60, height: 60 }}
                    />
                  }
                  handleFilter={handleFilter}
                />
              ))}
            </View>
            <View style={styles.serviciosRow}>
              <ScrollView horizontal={true}>
                {servicios2.map((servicio2) => (
                  <MiniCardServicio
                    titulo={servicio2.nombre}
                    icono={
                      <Image
                        source={require(`../../assets/iconosServicios/houseCleaning.png`)}
                        style={{ width: 50, height: 50 }}
                      />
                    }
                    handleFilter={handleFilter}
                  />
                ))}
                <MiniCardServicio
                  titulo='Todos'
                  icono={
                    <Image
                      source={require(`../../assets/iconosServicios/all.png`)}
                      style={{ width: 50, height: 50 }}
                    />
                  }
                  handleFilter={() =>
                    navigation.navigate(routes.SERVICIOSMODAL, {
                      servicios,
                      handleFilter,
                    })
                  }
                />
              </ScrollView>
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
