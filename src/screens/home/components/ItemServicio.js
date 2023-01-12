import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React from 'react'
import routes from '../../../constants/routes'
import { Chip } from 'react-native-paper'
import { COLORS } from '../../../constants'
import { AirbnbRating } from '@rneui/themed'

const ItemServicio = ({ cover, prestador, navigation }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.PERFILPRESTADORHOME, {
            id: prestador._id,
            navigation,
          })
        }
      >
        <View style={styles.item}>
          <View style={styles.imagen}>
            <Image
              source={{
                uri: prestador.perfil?.secure_url
                  ? prestador.perfil?.secure_url
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
              {prestador?.usuario}
            </Text>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={styles.acciones}
                  onStartShouldSetResponder={() => true}
                >
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
            <View style={{ alignItems: 'flex-start' }}>
              <AirbnbRating
                count={5}
                defaultRating={4.5}
                showRating={false}
                isDisabled={true}
                size={15}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

export default ItemServicio

// const styles = StyleSheet.create({
//   item: {
//     width: '100%',
//     height: 230,
//     marginBottom: 15,
//     backgroundColor: COLORS.primary,
//   },
//   cover: {
//     height: '100%',
//     width: '100%',
//   },
//   descripcion: {
//     justifyContent: 'center',
//     height: '35%',
//     width: '100%',
//     paddingVertical: 5,
//     backgroundColor: '#fafafa',
//     // backgroundColor: 'red',
//   },
//   servicios: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginLeft: 15,
//   },
//   chip: {
//     backgroundColor: 'rgba(6, 40, 61,0.3)',
//     alignSelf: 'center',
//     padding: 5,
//     borderRadius: 10,
//     borderColor: COLORS.primary,
//     borderWidth: 1,
//     marginRight: 8,
//     color: COLORS.primary,
//   },
// })

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
    justifyContent: 'flex-start',
  },
  acciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
})
