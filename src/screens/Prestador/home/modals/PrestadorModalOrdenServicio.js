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
import MapOrdenServicio from '../components/MapOrdenServicio'
import ordenServicioService from '../../../../services/ordenServicio.service'

const PrestadorModalOrdenServicio = ({ route, navigation }) => {
  const { ordenServicio, prestador } = route.params

  const handleTerminada = async () => {
    await ordenServicioService.terminarOrdenServicio(ordenServicio._id)
    navigation.pop(1)
  }

  return (
    <ScrollView
      style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.contenido}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
            {ordenServicio?.empleador?.usuario}
          </Text>
          <View style={styles.contenidoOrden}>
            <Text style={styles.titulo}>Descripcion</Text>
            <Text style={styles.descripcion}>{ordenServicio?.descripcion}</Text>
            <Text style={styles.titulo}>Notas</Text>
            <Text style={styles.descripcion}>{ordenServicio?.notas}</Text>
            <Text style={styles.titulo}>Fecha</Text>
            <Text style={styles.descripcion}>
              {new Date(ordenServicio?.fecha).toLocaleDateString()}
            </Text>
            <Text style={styles.titulo}>Hora</Text>
            <Text style={styles.descripcion}>
              {new Date(ordenServicio?.fecha).toLocaleTimeString()}
            </Text>
          </View>
          <MapOrdenServicio region={ordenServicio?.direccion} />
          <View style={styles.acciones}>
            <TouchableOpacity
              style={styles.accionBoton}
              onPress={() => handleTerminada()}
            >
              <Text style={{ color: 'white' }}>Terminada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accionBoton}>
              <Text style={{ color: 'white' }}>Cancelada</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default PrestadorModalOrdenServicio

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
