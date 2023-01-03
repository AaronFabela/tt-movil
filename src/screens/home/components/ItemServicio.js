import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React from 'react'
import routes from '../../../constants/routes'
import { Chip } from 'react-native-paper'
import { COLORS } from '../../../constants'

const ItemServicio = ({ cover, prestador, navigation }) => {
  return (
    <>
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.PERFILPRESTADORHOME, {
              id: prestador._id,
              navigation,
            })
          }
          style={{ backgroundColor: COLORS.primary, height: '65%' }}
        >
          <View style={styles.cover}>{cover}</View>
        </TouchableOpacity>
        <View style={styles.descripcion}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.PERFILPRESTADORHOME, {
                id: prestador._id,
                navigation,
              })
            }
          >
            <Text style={{ fontSize: 25, marginLeft: 15, marginBottom: 5 }}>
              {prestador.usuario}
            </Text>
          </TouchableOpacity>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.servicios}>
              {prestador?.servicios?.map((servicio) => (
                <View style={styles.chip}>
                  <Text style={{ color: COLORS.primary }}>
                    {servicio.nombre}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default ItemServicio

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 230,
    marginBottom: 15,
    backgroundColor: COLORS.primary,
  },
  cover: {
    height: '100%',
    width: '100%',
  },
  descripcion: {
    justifyContent: 'center',
    height: '35%',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '#fafafa',
    // backgroundColor: 'red',
  },
  servicios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 15,
  },
  chip: {
    backgroundColor: 'rgba(6, 40, 61,0.3)',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginRight: 8,
    color: COLORS.primary,
  },
})
