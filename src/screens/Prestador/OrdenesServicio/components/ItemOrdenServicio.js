import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLORS } from '../../../../constants'
import routes from '../../../../constants/routes'

const ItemOrdenServicio = ({ orden, navigation }) => {
  return (
    <View style={styles.item}>
      <View style={styles.imagen}>
        <Image
          // resizeMode='contain'
          source={{
            uri: orden.empleador?.perfil?.secure_url
              ? orden.empleador?.perfil?.secure_url
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
          {orden.empleador?.usuario}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          Servicio: {orden?.servicio?.nombre}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          {orden.descripcion?.substring(0, 30)}
        </Text>

        <View style={styles.acciones}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate(routes.ORDENESERVICIO_ACTIVA_MODAL, {
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

export default ItemOrdenServicio

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: 150,
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
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
})
