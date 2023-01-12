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
            uri: orden.prestador?.perfil?.secure_url
              ? orden.prestador?.perfil?.secure_url
              : 'https://fastly.4sqi.net/img/general/600x600/33DWRTO3WOIL4QTI4WXTXCLBLV34EMYWRSG2Z5QJIKXYM1UG.jpg',
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
          {orden.prestador?.usuario}
        </Text>
        <View style={styles.chiplist}>
          <View style={styles.chip}>
            <Text style={{ color: COLORS.primary }}>
              {orden.servicio.nombre}
            </Text>
          </View>
        </View>
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
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate(routes.HOME_TAB, {
                screen: routes.CHAT_NAVIGATION,
              })
            }
          >
            <Text style={{ color: 'white' }}>Mensaje</Text>
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
    backgroundColor: 'white',
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
  chiplist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  chip: {
    backgroundColor: 'rgba(0, 56, 255,0.15)',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginRight: 8,
    color: COLORS.primary,
    marginBottom: 5,
  },
})
