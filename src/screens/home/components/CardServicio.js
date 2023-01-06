import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'

const CardServicio = ({ titulo, icono, handleFilter }) => {
  return (
    <View style={{ width: '30%' }}>
      <TouchableOpacity onPress={() => handleFilter(titulo)}>
        <View style={styles.card}>
          <View style={styles.icono}>{icono}</View>
          <View style={styles.titulo}>
            <Text style={{ fontSize: 19, fontWeight: '600' }}>{titulo}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CardServicio

const styles = StyleSheet.create({
  card: {
    height: '100%',
    backgroundColor: '#fafafa',
    width: '100%',
    borderRadius: 15,
    padding: 15,
  },
  titulo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  icono: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})
