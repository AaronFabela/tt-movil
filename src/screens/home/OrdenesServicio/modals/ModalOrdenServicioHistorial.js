import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedbackComponent,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import ordenServicioService from '../../../../services/ordenServicio.service'
import { AuthContext } from '../../../../context/AuthContext'
import ItemOrdenServicioHistorial from './components/ItemOrdenServicioHistorial'
import { COLORS } from '../../../../constants'

const ModalOrdenServicioHistorial = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const [ordenServicioTerminadas, setOrdenServicioTerminadas] = useState([])
  const [ordenServicioCanceladas, setOrdenServicioCanceladas] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [active, setActive] = useState('terminadas')

  useEffect(() => {
    console.log(userInfo.id)
    ordenServicioService.getOrdenesServicioByTerminadas(userInfo.id).then(
      (response) => {
        setOrdenServicioTerminadas(response.data)
      },
      (error) => {
        console.log(error)
      }
    )

    ordenServicioService.getOrdenesServicioByCanceladas(userInfo.id).then(
      (response) => {
        setOrdenServicioCanceladas(response.data)
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.toogleBtn}>
          <TouchableOpacity
            style={
              active === 'terminadas'
                ? [styles.toogle, styles.active]
                : [styles.toogle]
            }
            onPress={() => setActive('terminadas')}
          >
            <Text>Terminadas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              active === 'canceladas'
                ? [styles.toogle, styles.active]
                : [styles.toogle]
            }
            onPress={() => setActive('canceladas')}
          >
            <Text>Canceladas</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      ) : (
        (() => {
          switch (active) {
            case 'terminadas':
              return ordenServicioTerminadas.length > 0 ? (
                <View style={styles.container}>
                  {ordenServicioTerminadas.map((orden) => (
                    <ItemOrdenServicioHistorial
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
                  <Text style={{ fontSize: 20 }}>
                    No cuentas con ordenes terminadas
                  </Text>
                </View>
              )
            case 'canceladas':
              return ordenServicioCanceladas.length > 0 ? (
                <View style={styles.container}>
                  {ordenServicioCanceladas.map((orden) => (
                    <ItemOrdenServicioHistorial
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
                  <Text style={{ fontSize: 20 }}>
                    No cuentas con ordenes canceladas
                  </Text>
                </View>
              )
          }
        })()
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
  toogleBtn: {
    marginTop: 15,
    padding: 5,
    width: '80%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray2,
    borderRadius: 15,
  },
  toogle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: COLORS.gray2,
    borderRadius: 15,
  },
  active: {
    backgroundColor: 'white',
  },
})
