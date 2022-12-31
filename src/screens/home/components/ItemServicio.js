import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import routes from '../../../constants/routes'

const ItemServicio = ({ cover, prestador, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.PERFILPRESTADORHOME, {
          id: prestador._id,
          navigation,
        })
      }
    >
      <View style={styles.item}>
        <View style={styles.cover}>{cover}</View>
        <View style={styles.descripcion}>
          <Text style={{ fontSize: 25 }}>{prestador.usuario}</Text>
          <Text style={{ fontSize: 15 }}>service</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ItemServicio

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 230,
    marginBottom: 15,
  },
  cover: {
    height: '65%',
    width: '100%',
  },
  descripcion: {
    justifyContent: 'center',
    height: '35%',
    width: '100%',
    padding: 15,
    backgroundColor: '#fafafa',
  },
})
