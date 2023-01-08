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
import { Rating } from '@rneui/base'
import { AirbnbRating } from '@rneui/themed'

const ModalOrdenServicio = ({ route, navigation }) => {
  const { ordenServicio, prestador } = route.params

  return (
    <ScrollView
      style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.contenido}>
          <View style={styles.cajita}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
              {ordenServicio?.prestador?.usuario}
            </Text>
            <Text style={styles.lineaTexto}>
              <Text style={{ color: COLORS.gray }}>
                {new Date(ordenServicio?.fecha).toLocaleDateString()}
              </Text>
            </Text>
          </View>
          <View style={styles.contenidoOrden}>
            <View style={styles.cajita}>
              <Text
                style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}
              >
                Detalles
              </Text>
              <Text style={styles.lineaTexto}>
                <Text style={styles.titulo}>Servicio: </Text>
                <Text style={styles.descripcion}>
                  {ordenServicio?.servicio?.nombre}
                </Text>
              </Text>
              <Text style={[styles.lineaTexto, styles.margen]}>
                <Text style={styles.titulo}>Descripcion: </Text>
                <Text style={styles.descripcion}>
                  {ordenServicio?.descripcion}
                </Text>
              </Text>
            </View>
          </View>
          {(ordenServicio?.resena != null) |
          (ordenServicio?.resena != undefined) ? (
            <>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Calificación
              </Text>
              <View style={{ alignItems: 'flex-start', width: '100%' }}>
                <Text style={[styles.lineaTexto, styles.margen]}>
                  <Text style={styles.titulo}>Reseña: </Text>
                  <Text style={styles.descripcion}>
                    {ordenServicio?.resena?.descripcion}
                  </Text>
                </Text>
                <View style={{ alignItems: 'center', width: '100%' }}>
                  <Image
                    style={{ width: 200, height: 200, marginBottom: 15 }}
                    source={{ uri: ordenServicio?.resena?.imagen?.secure_url }}
                  />
                  <AirbnbRating
                    count={5}
                    defaultRating={ordenServicio?.resena?.calificacion}
                    showRating={false}
                    isDisabled={true}
                    size={30}
                  />
                </View>
              </View>
            </>
          ) : (
            <></>
          )}
          <View style={styles.acciones}>
            <TouchableOpacity
              style={styles.accionBoton}
              onPress={() =>
                navigation.navigate(routes.CREARORDENSERVICIOMODAL, {
                  prestador,
                  ordenServicio,
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
  margen: { alignItems: 'center' },
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
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  cajita: {
    borderColor: 'white',
    width: '100%',
    borderBottomColor: COLORS.grayLight,
    borderWidth: 1,
  },
  lineaTexto: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
  },
  descripcion: { marginBottom: 10, fontSize: 20 },
})
