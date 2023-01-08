import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../../constants'

const ItemDireccion = ({
  id,
  nombre,
  direccion,
  direccionActualId,
  handleSetCurrentDireccion,
  handleDeleteDireccion,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.titulo}>
        <Text style={styles.nombre}>{nombre}</Text>
      </View>
      <View style={styles.acciones}>
        <TouchableOpacity
          style={styles.accion}
          onPress={() => handleSetCurrentDireccion(id)}
        >
          <Feather
            name='check-circle'
            color={id === direccionActualId ? COLORS.success : COLORS.grayLight}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.accion}>
          <Feather
            name='trash-2'
            color={COLORS.danger}
            size={30}
            onPress={() => handleDeleteDireccion(id)}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemDireccion

const styles = StyleSheet.create({
  item: {
    padding: 10,
    width: '100%',
    height: 70,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nombre: {
    fontSize: 25,
  },
  direccion: {
    fontSize: 20,
  },
  titulo: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 3,
    height: '100%',
  },
  acciones: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    height: '100%',
  },
  accion: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
