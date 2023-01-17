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
import { AuthContext } from '../../../../context/AuthContext'
import { COLORS } from '../../../../constants'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ActivityIndicator, RadioButton, TextInput } from 'react-native-paper'
import ordenServicioService from '../../../../services/ordenServicio.service'
import { Alert } from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'
import * as ImagePicker from 'expo-image-picker'
import ItemServicioDisponible from '../components/ItemServicioDisponible'
import ModalItemServicioDisponible from '../components/ModalItemServicioDisponible'
import mime from 'mime'
import UploadFile from '../../../auth/RegisterPrestador/components/UploadFile'

const ModalCrearOrdenServicio = ({ route, navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const { ordenServicio, prestador } = route.params
  const dia = new Date()
  const [date, setDate] = useState(dia)
  const [time, setTime] = useState(dia)
  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  const [servicioActivo, setServicioActivo] = useState('')
  const [notas, setNotas] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imagen, setImagen] = useState({
    uri: null,
    type: null,
    name: null,
  })
  const [servicionew, setServicionew] = useState(null)

  useEffect(() => {
    setServicioActivo(
      ordenServicio?.servicio?.nombre != null ||
        ordenServicio?.servicio?.nombre != undefined
        ? ordenServicio?.servicio?.nombre
        : ''
    )
    console.log('hols', ordenServicio?.servicio?.nombre)
  }, [])

  const handleOpenTime = () => {
    setOpenTime(!openTime)
  }

  const handleDate = (event, selectedDate) => {
    console.log(selectedDate)
    setDate(selectedDate)
    setOpenDate(false)
  }

  const handleTime = (event, selectedTime) => {
    console.log(selectedTime)
    setTime(selectedTime)
    setOpenTime(false)
  }

  const handleImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      const newImageUri = 'file:///' + result.uri.split('file:/').join('')
      setImagen({
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      })
    }
  }

  const handleEnviar = async () => {
    setIsLoading(true)
    if (
      (servicioActivo !== undefined) &
      (descripcion.trim().length > 0) &
      (imagen.uri !== null)
    ) {
      console.log('hola', servicioActivo)

      try {
        const data = new FormData()
        data.append('servicio', servicioActivo._id)
        data.append('prestador', prestador._id)
        data.append('empleador', userInfo.id)
        data.append('descripcion', descripcion)
        data.append('direccion', userInfo.direccionActual._id)
        data.append('fecha', date.toLocaleDateString())
        data.append('hora', time.toLocaleTimeString())
        data.append('image', imagen)

        console.log(data)
        console.log('enviando')
        await ordenServicioService.crearOrdenServicio(data)
        setIsLoading(false)
        Alert.alert('Orden creada con exito')
        navigation.pop(1)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
        Toast.error(error, 'top')
      }
    } else {
      Toast.error('Existen datos faltantes', 'top')
      setIsLoading(false)
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
                    uri: userInfo.perfil?.secure_url
                      ? userInfo.perfil?.secure_url
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                  }}
                  style={{ height: 100, width: 100 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {userInfo.usuario}
                </Text>
                <Text style={{ fontSize: 10 }}>Empleador</Text>
              </View>
              <View style={styles.prestador}>
                <Image
                  source={{
                    uri: prestador.perfil?.secure_url
                      ? prestador.perfil?.secure_url
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                  }}
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {prestador?.usuario}
                </Text>
                <Text style={{ fontSize: 10 }}>Prestador</Text>
              </View>
            </View>
            <View style={styles.fecha}>
              <View style={styles.picker}>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => setOpenDate(true)}
                >
                  <Text style={{ color: 'white' }}>Fecha</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {date.toDateString()}
                </Text>
              </View>
              <View style={styles.picker}>
                <TouchableOpacity style={styles.boton}>
                  <Text
                    style={{ color: 'white' }}
                    onPress={() => handleOpenTime()}
                  >
                    Hora
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  {time.toLocaleTimeString()}
                </Text>
              </View>

              {openDate ? (
                <DateTimePicker
                  testID='datePicker'
                  value={date}
                  mode={'date'}
                  onChange={handleDate}
                />
              ) : null}
              {openTime ? (
                <DateTimePicker
                  testID='timePicker'
                  value={time}
                  mode={'time'}
                  onChange={handleTime}
                />
              ) : null}
            </View>
            <View style={styles.cardServDisp}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {prestador?.servicios?.map((servicio) => (
                  <ModalItemServicioDisponible
                    key={servicio._id}
                    icono={{ uri: servicio.icono }}
                    servicio={servicio}
                    setServicioActivo={setServicioActivo}
                    servicioActivo={servicioActivo}
                  />
                ))}
              </ScrollView>
            </View>
            <Text>Min 25 caracteres</Text>
            <TextInput
              value={descripcion}
              onChangeText={(text) => setDescripcion(text)}
              label='Descripcion'
              mode='outlined'
              outlineColor={COLORS.primary}
              selectionColor={COLORS.turques}
              textColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
              style={{ width: '100%', marginBottom: 15 }}
            />
            <UploadFile
              handleUpload={handleImagen}
              uriType={imagen}
              styles={styles}
            />
            <TouchableOpacity style={styles.enviar}>
              <Text
                style={{ color: 'white', fontSize: 18 }}
                // onPress={() => (handleEnviar(), setIsLoading(true))}
                onPress={() => handleEnviar()}
              >
                Crear Orden Servicio
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default ModalCrearOrdenServicio

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
    marginTop: 15,
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
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.primary,
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
  botonesImagen: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
})
