import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { COLORS } from '../../constants'

const Mensaje = ({ propio, mensaje }) => {
  return (
    <View style={propio ? styles.enviado : styles.recibido}>
      <View style={propio ? styles.mensajeEnviado : styles.mensajeRecibido}>
        <Text style={{ color: 'white' }}>{mensaje}</Text>
      </View>
    </View>
  )
}

export default Mensaje

const styles = StyleSheet.create({
  enviado: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  recibido: {
    alignItems: 'flex-start',

    // backgroundColor: 'green',
  },
  mensajeEnviado: {
    width: 120,
    minHeight: 40,
    backgroundColor: COLORS.primary,
    color: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  mensajeRecibido: {
    width: 120,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
})
