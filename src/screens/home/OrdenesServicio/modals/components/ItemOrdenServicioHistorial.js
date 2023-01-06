import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLORS } from '../../../../../constants'
import routes from '../../../../../constants/routes'

const ItemOrdenServicioHistorial = ({ orden, navigation }) => {
  return (
    <View style={styles.item}>
      <View style={styles.imagen}>
        <Image
          // resizeMode='contain'
          source={{
            uri: orden?.prestador?.perfil?.secure_id
              ? orden?.prestador?.perfil?.secure_id
              : 'https://i.pinimg.com/474x/bd/f4/d3/bdf4d3fe1f9a17136319df951fe9b3e0.jpg',
          }}
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        />
      </View>
      <View style={styles.contenido}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
          {orden.servicio?.nombre}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          {orden.descripcion?.substring(0, 100)}
        </Text>
        <Text style={{ marginBottom: 5 }}>Calificacion</Text>
        <View style={styles.acciones}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate(routes.ORDENESERVICIO_HISTORIAL_ITEM_MODAL, {
                orden,
                navigation,
              })
            }
          >
            <Text style={{ color: 'white' }}>Ver Mas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ItemOrdenServicioHistorial

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: 200,
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    borderRadius: 15,
  },
  imagen: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flex: 2,
    backgroundColor: 'green',
  },
  contenido: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  btn: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '47%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
})
