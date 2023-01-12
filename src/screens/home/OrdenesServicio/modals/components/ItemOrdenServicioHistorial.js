import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLORS } from '../../../../../constants'
import routes from '../../../../../constants/routes'
import { AirbnbRating } from '@rneui/themed'

const ItemOrdenServicioHistorial = ({ orden, navigation }) => {
  return (
    <View style={styles.item}>
      <View style={styles.imagen}>
        <Image
          // resizeMode='contain'
          source={{
            uri: orden?.prestador?.perfil?.secure_url
              ? orden?.prestador?.perfil?.secure_url
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {orden.prestador?.usuario}
        </Text>
        <View style={styles.sameLine}>
          <View style={styles.chip}>
            <Text style={{ color: COLORS.primary }}>
              {orden?.servicio?.nombre}
            </Text>
          </View>
          {orden?.resena?.calificacion != null ? (
            <AirbnbRating
              count={5}
              defaultRating={orden?.resena?.calificacion}
              showRating={false}
              isDisabled={true}
              size={15}
            />
          ) : (
            <></>
          )}
        </View>

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
  },
  contenido: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  sameLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
