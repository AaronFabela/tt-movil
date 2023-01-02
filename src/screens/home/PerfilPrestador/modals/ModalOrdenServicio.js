import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import React from 'react'
import { COLORS } from '../../../../constants'
import routes from '../../../../constants/routes'

const ModalOrdenServicio = ({ route, navigation }) => {
  const { ordenServicio, prestador } = route.params

  return (
    <ScrollView
      style={{ width: '100%', flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.contenido}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Orden de Servicio
          </Text>
          <View style={styles.contenidoOrden}>
            <Text style={styles.titulo}>Descripcion</Text>
            <Text style={styles.descripcion}>{ordenServicio?.descripcion}</Text>
            <Text style={styles.titulo}>Notas</Text>
            <Text style={styles.descripcion}>{ordenServicio?.notas}</Text>
            <Text style={styles.titulo}>Calificacion</Text>
            <Text style={styles.descripcion}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Asperiores excepturi recusandae quo accusantium modi fugiat labore
              id, perspiciatis quasi
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://i.scdn.co/image/ab67616d0000b273ac7bbd44360e147f4bb81bf2',
            }}
            // resizeMode='cover'
            style={{ height: 400, width: '100%' }}
          />
          <View style={styles.acciones}>
            <TouchableOpacity style={styles.accionBoton}>
              <Text style={{ color: 'white' }}>Mensaje</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accionBoton}
              onPress={() =>
                navigation.navigate(routes.CREARORDENSERVICIOMODAL, {
                  prestador,
                })
              }
            >
              <Text style={{ color: 'white' }}>Contratar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ModalOrdenServicio

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contenido: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
  },
  contenidoOrden: {
    marginVertical: 15,
    width: '100%',
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descripcion: { marginBottom: 10 },

  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginVertical: 15,
  },
  accionBoton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
})
