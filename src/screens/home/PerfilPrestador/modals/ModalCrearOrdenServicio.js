import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { COLORS } from '../../../../constants'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ActivityIndicator, RadioButton, TextInput } from 'react-native-paper'
import ordenServicioService from '../../../../services/ordenServicio.service'
import { Alert } from 'react-native'
import ToastManager, { Toast } from 'toastify-react-native'

const ModalCrearOrdenServicio = ({ route, params, navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const { prestador } = route.params
  const dia = new Date()
  const [date, setDate] = useState(dia)
  const [time, setTime] = useState(dia)
  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)
  const [servicio, setServicio] = useState('')
  const [notas, setNotas] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const handleServicio = (servicio) => {
    console.log(servicio)
    setServicio(servicio)
  }

  const handleEnviar = async () => {
    try {
      await ordenServicioService.crearOrdenServicio(
        servicio,
        prestador._id,
        userInfo.id,
        descripcion,
        notas,
        userInfo.direccionActual._id,
        date,
        time
      )
      setIsLoading(false)
      Alert.alert('Orden creada con exito')
      navigation.pop(1)
    } catch (error) {
      console.log(error)
      Toast.error(error.response.data.errors[0].msg, 'top')
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
            <View style={styles.servicios}>
              <RadioButton.Group
                onValueChange={(newServicio) => handleServicio(newServicio)}
                value={servicio}
              >
                {prestador?.servicios.map((servicio) => (
                  <View style={styles.radioBtn} key={servicio._id}>
                    <Text>{servicio.nombre}</Text>
                    <RadioButton value={`${servicio._id}`} />
                  </View>
                ))}
              </RadioButton.Group>
            </View>
            <TextInput
              value={descripcion}
              onChangeText={(text) => setDescripcion(text)}
              label='Descripcion'
              mode='outlined'
              outlineColor={COLORS.primary}
              selectionColor={COLORS.turques}
              textColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
              style={{ width: '100%', marginTop: 15 }}
            />
            <TextInput
              value={notas}
              onChangeText={(text) => setNotas(text)}
              label='Notas'
              mode='outlined'
              outlineColor={COLORS.primary}
              selectionColor={COLORS.turques}
              textColor={COLORS.primary}
              activeOutlineColor={COLORS.primary}
              style={{ width: '100%', marginTop: 15 }}
            />
            <TouchableOpacity style={styles.enviar}>
              <Text
                style={{ color: 'white', fontSize: 18 }}
                onPress={() => (handleEnviar(), setIsLoading(true))}
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
    backgroundColor: '#fafafa',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prestador: {
    width: '45%',
    height: '100%',
    backgroundColor: '#fafafa',
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
})
