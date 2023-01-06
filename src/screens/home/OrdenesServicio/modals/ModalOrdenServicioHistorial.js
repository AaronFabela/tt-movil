import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import ordenServicioService from '../../../../services/ordenServicio.service'
import { AuthContext } from '../../../../context/AuthContext'
import ItemOrdenServicioHistorial from './components/ItemOrdenServicioHistorial'
import { COLORS } from '../../../../constants'

const ModalOrdenServicioHistorial = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const [ordenServicioHistorial, setOrdenServicioHistorial] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log(userInfo.id)
    ordenServicioService.getOrdenesServicioByTerminadas(userInfo.id).then(
      (response) => {
        setOrdenServicioHistorial(response.data)
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
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
      ) : ordenServicioHistorial.length > 0 ? (
        <View style={styles.container}>
          {ordenServicioHistorial.map((orden) => (
            <>
              <ItemOrdenServicioHistorial
                key={orden._id}
                orden={orden}
                navigation={navigation}
              />
            </>
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
          <Text style={{ fontSize: 20 }}>
            No cuentas con ordenes terminadas
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

export default ModalOrdenServicioHistorial

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    flex: 1,
    marginTop: 15,
  },
})
