import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../constants'
import { Rating } from 'react-native-rating-component'
import { TextInput } from 'react-native-paper'
import UploadFileGeneral from '../../../../components/UploadFIleGeneral'
import * as ImagePicker from 'expo-image-picker'
import ToastManager, { Toast } from 'toastify-react-native'
import resenaService from '../../../../services/reseña.service'
import { ActivityIndicator } from 'react-native-paper'
import { Alert } from 'react-native'

const ModalOrdenServicioHistorialItem = ({ route, navigation }) => {
  const { orden } = route.params
  const [calificacion, setCalificacion] = useState(3)
  const [descripcion, setDescripcion] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendResena, setSendResena] = useState(false)

  const [imagen, setImagen] = useState({
    uri: null,
    type: null,
    name: null,
  })

  const handleImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImagen({ uri: result.uri, type: result.type, name: result.fileName })
    }
  }

  const handleResena = async () => {
    try {
      const data = new FormData()
      const fecha = new Date()
      // const response = await authService.signup(usuario, email, password, rol)
      data.append('calificacion', calificacion)
      data.append('descripcion', descripcion)
      data.append('fecha', '05/01/2023')
      data.append('idOrdenServicio', orden._id)
      data.append('imagen', imagen)
      // console.log(servicios)
      console.log(data)
      const response = await resenaService.crearResena(data)
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

  return (
    <ScrollView
      style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <ToastManager />
      {isSending ? (
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      ) : (
        <View style={styles.container}>
          <View style={styles.contenido}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {orden?.prestador?.usuario}
            </Text>
            <View style={styles.contenidoOrden}>
              <Text style={styles.titulo}>Servicio</Text>
              <Text style={styles.descripcion}>{orden?.servicio?.nombre}</Text>
              <Text style={styles.titulo}>Descripcion</Text>
              <Text style={styles.descripcion}>{orden?.descripcion}</Text>
              <Text style={styles.titulo}>Fecha</Text>
              <Text style={styles.descripcion}>
                {new Date(orden?.fecha).toLocaleDateString()}
              </Text>
              <Text style={styles.titulo}>Hora</Text>
              <Text style={styles.descripcion}>
                {new Date(orden?.hora).toLocaleTimeString()}
              </Text>
            </View>
            {orden?.resena === null || orden?.resena === undefined ? (
              sendResena ? (
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Reseña
                  </Text>
                  <TextInput
                    style={{ width: '100%', marginBottom: 10 }}
                    placeholder='Descripcion'
                    mode='outlined'
                    value={descripcion}
                    onChangeText={(text) => setDescripcion(text)}
                  />
                  <Rating
                    initialValue={3}
                    onChangeValue={(value) => setCalificacion(value)}
                  />
                  <UploadFileGeneral
                    handleUpload={handleImagen}
                    uriType={imagen}
                  />
                  <View style={styles.acciones}>
                    <TouchableOpacity
                      style={styles.accionBoton}
                      onPress={() => (setIsSending(true), handleResena())}
                    >
                      <Text style={{ color: 'white' }}>Enviar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.accionBoton}
                      onPress={() => setSendResena(false)}
                    >
                      <Text style={{ color: 'white' }}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.acciones}>
                  <TouchableOpacity
                    style={styles.accionBoton2}
                    onPress={() => setSendResena(true)}
                  >
                    <Text style={{ color: 'white' }}>Calificar</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <View>
                <Image source={{ uri: resena }} />
                <Text></Text>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default ModalOrdenServicioHistorialItem

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contenido: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
  },
  contenidoOrden: {
    marginVertical: 15,
    width: '100%',
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descripcion: { marginBottom: 10 },

  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginVertical: 15,
  },
  accionBoton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  accionBoton2: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
})
