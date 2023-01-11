import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../constants'

const ModalItemServicioDisponible = ({
  icono,
  servicio,
  setServicioActivo,
  servicioActivo,
}) => {
  return (
    <TouchableOpacity onPress={() => setServicioActivo(servicio)}>
      <View style={styles.miniCard}>
        <View
          style={
            servicioActivo.nombre === servicio.nombre
              ? styles.iconoActivo
              : styles.icono
          }
        >
          <Image source={icono} style={{ width: 40, height: 40 }}></Image>
        </View>
        <Text style={{ fontWeight: 'bold' }}>{servicio.nombre}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ModalItemServicioDisponible

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
