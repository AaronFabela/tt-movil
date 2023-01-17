import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { COLORS } from '../../../../constants'
import { ActivityIndicator, RadioButton, TextInput } from 'react-native-paper'
import ordenServicioService from '../../../../services/ordenServicio.service'
import { Alert } from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'

const ModalCancelarServicio = ({ route, navigation }) => {
  const { ordenServicio } = route.params
  const [motivos, setMotivos] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelar = async () => {
    if (motivos.trim().length !== 0) {
      try {
        const m = ordenServicio.prestador.usuario + ': ' + motivos
        const response = await ordenServicioService.cancelarOrdenServicio(
          ordenServicio._id,
          m
        )
        navigation.pop(2)
      } catch (error) {
        console.log(error)
        Toast.error('Error en el servidor', 'top')
      }
    } else {
      Toast.error('Ingresa un motivo', 'top')
    }
  }

  return (
    <ScrollView>
      <ToastManager />
      <View style={styles.container}>
        {isLoading ? (
          <>
            <ActivityIndicator
              size={50}
              animating={true}
              color={COLORS.primary}
            />
          </>
        ) : (
          <>
            <View style={styles.datos}>
              <View style={styles.empleador}>
                <Image
                  source={{
                    uri: ordenServicio?.prestador?.perfil?.secure_url
                      ? ordenServicio?.prestador?.perfil?.secure_url
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                  }}
                  style={{ height: 100, width: 100 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {ordenServicio?.prestador?.usuario}
                </Text>
                <Text style={{ fontSize: 10 }}>Prestador</Text>
              </View>
              <View style={styles.prestador}>
                <Image
                  source={{
                    uri: ordenServicio?.empleador?.perfil?.secure_url
                      ? ordenServicio?.empleador?.perfil?.secure_url
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                  }}
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {ordenServicio?.empleador?.usuario}
                </Text>
                <Text style={{ fontSize: 10 }}>Empleador</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <Text>Min 10 caracteres</Text>
            </View>
            <TextInput
              value={motivos}
              onChangeText={(text) => setMotivos(text)}
              label='Motivos'
              mode='outlined'
              outlineColor={'red'}
              selectionColor={COLORS.turques}
              textColor={'black'}
              activeOutlineColor={'red'}
              style={{ width: '100%', marginBottom: 15 }}
            />
            <TouchableOpacity style={styles.enviar}>
              <Text
                style={{ color: 'white', fontSize: 18 }}
                // onPress={() => (handleEnviar(), setIsLoading(true))}
                onPress={() => handleCancelar()}
              >
                Cancelar Orden
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default ModalCancelarServicio

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // marginTop: 15,
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  datos: {
    marginVertical: 15,
    width: '100%',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empleador: {
    width: '45%',
    height: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prestador: {
    width: '45%',
    height: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fecha: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
    height: 55,
  },
  picker: {
    width: '45%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  servicios: {
    marginTop: 15,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  enviar: {
    marginTop: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  cardServDisp: {
    marginVertical: 15,
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
