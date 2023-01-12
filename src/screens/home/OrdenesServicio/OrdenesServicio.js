import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import React from 'react'
import ItemOrdenServicio from './components/ItemOrdenServicio'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useEffect } from 'react'
import ordenServicioService from '../../../services/ordenServicio.service'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { COLORS } from '../../../constants'

const OrdenesServicio = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [ordenesServicio, setOrdenesServicio] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    firstLoad()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    firstLoad()
  }

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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoading ? (
        <>
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
        </>
      ) : ordenesServicio.length > 0 ? (
        <View style={styles.container}>
          {ordenesServicio.map((orden) => (
            <ItemOrdenServicio
              key={orden._id}
              orden={orden}
              navigation={navigation}
            />
          ))}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>No cuentas con ordenes activas</Text>
        </View>
      )}
    </ScrollView>
  )
}

export default OrdenesServicio

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
    width: '100%',
    flex: 1,
  },
})
