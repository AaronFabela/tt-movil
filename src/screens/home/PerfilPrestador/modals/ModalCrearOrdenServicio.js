import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { COLORS } from '../../../../constants'
import DateTimePicker from '@react-native-community/datetimepicker'

const ModalCrearOrdenServicio = ({ route, params }) => {
  const { userInfo } = useContext(AuthContext)
  const { servicios } = route.params
  const dia = new Date()
  const [date, setDate] = useState(dia)
  const [time, setTime] = useState(dia)
  const [openDate, setOpenDate] = useState(false)
  const [openTime, setOpenTime] = useState(false)

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
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 15 }}>ModalCrearOrdenServicio{servicios}</Text>
      <View style={styles.datos}>
        <View style={styles.empleador}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
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
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={{ height: 100, width: 100 }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            Nombre Prestador
          </Text>
          <Text style={{ fontSize: 10 }}>Prestador</Text>
        </View>
      </View>
      <View style={styles.fecha}>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => setOpenDate(true)}
        >
          <Text style={{ color: 'white' }}>Fecha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton}>
          <Text style={{ color: 'white' }} onPress={() => setOpenTime(true)}>
            Hora
          </Text>
        </TouchableOpacity>
        {openDate ? (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={'date'}
            onChange={handleDate}
          />
        ) : null}
        {openTime ? (
          <DateTimePicker
            testID='dateTimePicker'
            value={time}
            mode={'time'}
            onChange={handleTime}
          />
        ) : null}
      </View>
    </View>
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
    height: 50,
  },
  boton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
})
