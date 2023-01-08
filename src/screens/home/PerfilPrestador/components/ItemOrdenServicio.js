import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLORS } from '../../../../constants'
import routes from '../../../../constants/routes'
import { AirbnbRating } from '@rneui/themed'

const ItemOrdenServicio = ({ ordenServicio, navigation, prestador }) => {
  // const [description, setDescription] = useState(descri)
  return (
    <View style={styles.item}>
      <View style={styles.imagen}>
        <Image
          // resizeMode='contain'
          source={{
            uri: ordenServicio?.resena?.imagen?.secure_url
              ? ordenServicio?.resena?.imagen?.secure_url
              : 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg',
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
          {ordenServicio?.servicio?.nombre}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          {ordenServicio?.descripcion?.substring(0, 30)}
        </Text>
        {ordenServicio?.resena?.calificacion != null ? (
          <AirbnbRating
            count={5}
            defaultRating={ordenServicio?.resena?.calificacion}
            showRating={false}
            isDisabled={true}
            size={20}
          />
        ) : (
          <></>
        )}

        <View style={styles.acciones}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate(routes.ORDENSERVICIOMODAL, {
                ordenServicio,
                prestador,
              })
            }
          >
            <Text style={{ color: 'white' }}>Ver Mas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate(routes.CREARORDENSERVICIOMODAL, {
                ordenServicio,
                prestador: prestador,
              })
            }
          >
            <Text style={{ color: 'white' }}>Contratar</Text>
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
})
