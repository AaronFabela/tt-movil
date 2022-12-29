import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ItemDireccion = ({ id, nombre, direccion }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.direccion}>{direccion}</Text>
    </View>
  )
}

export default ItemDireccion

const styles = StyleSheet.create({
  item: {
    padding: 10,
    justifyContent: 'center',
    width: '100%',
    height: 70,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  nombre: {
    fontSize: 25,
  },
  direccion: {
    fontSize: 20,
  },
})
