import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const MiniCardServicioModal = ({ titulo, icono, handleFilter, navigation }) => {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={() => (handleFilter(titulo), navigation.goBack())}
      >
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

export default MiniCardServicioModal

const styles = StyleSheet.create({
  card: {
    width: '100%',
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
