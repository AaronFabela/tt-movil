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
import UploadFileGeneral from '../../../../components/UploadFIleGeneral'
import ToastManager, { Toast } from 'toastify-react-native'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import reporteService from '../../../../services/reporte.service'

const ModalReporte = ({ route, navigation }) => {
  const { ordenServicio } = route.params
  const [descripcion, setDescripcion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [reporte, setReporte] = useState({ uri: null, type: null, name: null })

  const handleEnviar = async () => {
    try {
      const data = new FormData()
      const fecha = new Date()
      // const response = await authService.signup(usuario, email, password, rol)
      data.append('idOrdenServicio', ordenServicio._id)
      data.append('idReportador', ordenServicio.empleador._id)
      data.append('idReportado', ordenServicio.prestador._id)
      data.append('descripcion', descripcion)
      data.append('fecha', new Date().toLocaleDateString())
      data.append('imagen', reporte)

      // console.log(servicios)
      console.log(data)
      const response = await reporteService.crearReporte(data)
      navigation.navigate(2)
      // const response = await solicitudService.solicitudPrestador(data)

      if (response.code === 400) {
        const key = response.key.toUpperCase()
        setIsSending(false)
        console.log(response)
        Toast.error(`${response.data.message}`, 'top')
      } else {
        setIsSending(false)
        Alert.alert('Reseña creada Correctamente')
        navigation.goBack()
      }
    } catch (error) {
      setIsSending(false)
      console.log(error)
      // Toast.error(error.response.data.errors[0].msg, 'top')
    }
  }

  const handleReporte = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      const newImageUri = 'file:///' + result.uri.split('file:/').join('')

      setReporte({
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      })
    }
    console.log(result)
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
                    uri: ordenServicio?.empleador?.perfil?.secure_url
                      ? ordenServicio?.empleador?.perfil?.secure_url
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
                    uri: ordenServicio?.prestador?.perfil?.secure_url
                      ? ordenServicio?.prestador?.perfil?.secure_url
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
              <Text>Min 25 caracteres</Text>
            </View>
            <TextInput
              value={descripcion}
              onChangeText={(text) => setDescripcion(text)}
              label='Descripcion'
              mode='outlined'
              outlineColor={'red'}
              selectionColor={COLORS.turques}
              textColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
              style={{ width: '100%', marginBottom: 15 }}
            />
            <UploadFileGeneral handleUpload={handleReporte} uriType={reporte} />
            <TouchableOpacity style={styles.enviar}>
              <Text
                style={{ color: 'white', fontSize: 18 }}
                // onPress={() => (handleEnviar(), setIsLoading(true))}
                onPress={() => handleEnviar()}
              >
                Generar Reporte
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default ModalReporte

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
