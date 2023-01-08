import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../constants'

const ItemServicioDisponible = ({
  icono,
  nombre,
  setServicioActivo,
  servicioActivo,
  handleFilter,
}) => {
  return (
    <TouchableOpacity
      onPress={() => (setServicioActivo(nombre), handleFilter(nombre))}
    >
      <View style={styles.miniCard}>
        <View
          style={servicioActivo === nombre ? styles.iconoActivo : styles.icono}
        >
          <Image source={icono} style={{ width: 40, height: 40 }}></Image>
        </View>
        <Text style={{ fontWeight: 'bold' }}>{nombre}</Text>
      </View>
    </TouchableOpacity>
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
  iconoActivo: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.success,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
})
