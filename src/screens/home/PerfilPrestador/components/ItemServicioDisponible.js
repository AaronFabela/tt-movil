import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ItemServicioDisponible = ({ icono, nombre }) => {
  return (
    <View style={styles.miniCard}>
      <View style={styles.icono}>
        <Image source={icono} style={{ width: 40, height: 40 }}></Image>
      </View>
      <Text style={{ fontWeight: 'bold' }}>{nombre}</Text>
    </View>
  )
}

export default ItemServicioDisponible

const styles = StyleSheet.create({
  miniCard: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    height: 60,
    width: 80,
    backgroundColor: '#fafafa',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
})
