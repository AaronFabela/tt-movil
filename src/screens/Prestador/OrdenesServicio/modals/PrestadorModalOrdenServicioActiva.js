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
import ordenServicioService from '../../../../services/ordenServicio.service'
import { Alert } from 'react-native'

const PrestadorModalOrdenServicioActiva = ({ route }) => {
  const { orden, navigation } = route.params

  const handleCancelar = async () => {
    try {
      const response = await ordenServicioService.cancelarOrdenServicio(
        orden._id
      )
      Alert.alert('Orden Cancelada')
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView
      style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.contenido}>
          <View style={styles.cajita}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
              {orden?.prestador?.usuario}
            </Text>
            <Text style={styles.lineaTexto}>
              <Text style={{ color: COLORS.gray }}>
                {new Date(orden?.fecha).toLocaleDateString()}
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
                  {orden?.servicio?.nombre}
                </Text>
              </Text>
              <Text style={[styles.lineaTexto, styles.margen]}>
                <Text style={styles.titulo}>Descripcion: </Text>
                <Text style={styles.descripcion}>{orden?.descripcion}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.acciones}>
            {/* <TouchableOpacity style={styles.accionBoton}>
              <Text style={{ color: 'white' }}>Mensaje</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.accionBoton}
              onPress={() => handleCancelar()}
            >
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default PrestadorModalOrdenServicioActiva

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
    fontSize: 20,
  },
  descripcion: { marginBottom: 10, fontSize: 20 },
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
})
