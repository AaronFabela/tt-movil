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

const ModalOrdenServicioActiva = ({ route }) => {
  const { orden } = route.params
  return (
    <ScrollView
      style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.contenido}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            Orden Servicio Activa
          </Text>
          <View style={styles.contenidoOrden}>
            <Text style={styles.titulo}>Servicio</Text>
            <Text style={styles.descripcion}>{orden.servicio.nombre}</Text>
            <Text style={styles.titulo}>Descripcion</Text>
            <Text style={styles.descripcion}>{orden.descripcion}</Text>
            <Text style={styles.titulo}>Fecha</Text>
            <Text style={styles.descripcion}>{orden.fecha}</Text>
            <Text style={styles.titulo}>Hora</Text>
            <Text style={styles.descripcion}>{orden.hora}</Text>
          </View>
          <View style={styles.acciones}>
            <TouchableOpacity style={styles.accionBoton}>
              <Text style={{ color: 'white' }}>Mensaje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accionBoton}>
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ModalOrdenServicioActiva

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
