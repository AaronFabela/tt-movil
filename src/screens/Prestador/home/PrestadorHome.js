import { StyleSheet, Text, View, RefreshControl } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useEffect } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { COLORS } from '../../../constants/'
import routes from '../../../constants/routes'
import ItemOrdenServicio from './components/ItemOrdenServicio'
import { useState } from 'react'
import ordenServicioService from '../../../services/ordenServicio.service'
import { ScrollView } from 'react-native'
import { Alert } from 'react-native'

const PrestadorHome = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [ordenesServicio, setOrdenesServicio] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    firstLoad()
  }, [])

  const firstLoad = () => {
    ordenServicioService.getOrdenesServicioByActivas(userInfo.id).then(
      (response) => {
        setOrdenesServicio(response.data)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )
    setRefreshing(false)
  }

  const onRefresh = () => {
    setRefreshing(true)
    firstLoad()
  }
  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {(userInfo?.direccionActual === undefined) |
        (userInfo?.direccionActual === null) ? (
          <View style={styles.noDireccion}>
            <Text style={{ width: '80%', textAlign: 'center', fontSize: 20 }}>
              No cuentas con una dirección inicial, debes ingresarala para que
              los Empleadores te puedan encontrar
            </Text>
            <TouchableOpacity
              style={styles.botonDir}
              onPress={() => navigation.navigate(routes.PRESTADOR_MAPMODAL)}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>
                Ingresar dirección
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ordenesServicio}>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}
            >
              Ordenes de Servicio Activas
            </Text>
            <View style={styles.lista}>
              {ordenesServicio?.length > 0 ? (
                ordenesServicio.map((ordenServicio) => (
                  <ItemOrdenServicio
                    key={ordenServicio._id}
                    ordenServicio={ordenServicio}
                    navigation={navigation}
                  />
                ))
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Text style={{ fontSize: 20, marginBottom: 15 }}>
                    No cuenta con ordenes de servicio activas
                  </Text>
                  <Image
                    source={require('../../../assets/problem.png')}
                    style={{ height: 150, width: 150 }}
                  ></Image>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default PrestadorHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  noDireccion: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  botonDir: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    width: '70%',
    height: 50,
    backgroundColor: COLORS.primary,
  },
  ordenesServicio: {
    marginTop: 15,
    height: '100%',
  },
  lista: {
    width: '100%',
  },
})
