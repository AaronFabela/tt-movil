import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const MiniCardServicio = ({ titulo, icono, handleFilter }) => {
  return (
    <View
      style={{
        width: 80,
        alignItems: 'center',
        marginRight: 15,
      }}
    >
      <TouchableOpacity onPress={() => handleFilter(titulo)}>
        <View style={styles.card}>
          <View style={styles.icono}>{icono}</View>
        </View>
        <View style={styles.titulo}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>{titulo}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MiniCardServicio

const styles = StyleSheet.create({
  card: {
    height: 80,
    backgroundColor: '#fafafa',
    borderRadius: 15,
    padding: 15,
  },
  titulo: {
    // flex: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    flex: 1,
    alignItems: 'center',
  },
})
