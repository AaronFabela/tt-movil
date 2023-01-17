import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import React, { useCallback } from 'react'
import { COLORS } from '../../../../constants'
import routes from '../../../../constants/routes'
import MapOrdenServicio from '../components/MapOrdenServicio'
import ordenServicioService from '../../../../services/ordenServicio.service'
import * as Linking from 'expo-linking'

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
          <View style={styles.cajita}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={{ uri: ordenServicio?.empleador?.perfil?.secure_url }}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 100,
                  borderColor: COLORS.primary,
                  borderWidth: 3,
                }}
              />
            </View>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
              {ordenServicio?.empleador?.usuario}
            </Text>
            <Text style={styles.lineaTexto}>
              <Text style={{ color: COLORS.gray }}>
                {new Date(ordenServicio?.fecha).toLocaleDateString() +
                  ' - ' +
                  new Date(ordenServicio?.hora).toLocaleTimeString()}
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
              <Text style={[styles.lineaTexto, styles.margen]}>
                <Text style={styles.titulo}>Notas: </Text>
                <Text style={styles.descripcion}>{ordenServicio?.notas}</Text>
              </Text>
            </View>
            <View style={styles.cajita}>
              <Text
                style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}
              >
                Dirección
              </Text>
              <Text style={styles.lineaTexto}>
                <Text style={styles.titulo}>Domicilio: </Text>
                <Text style={styles.descripcion}>
                  {ordenServicio?.direccion?.direccion}
                </Text>
              </Text>
              <Text style={[styles.lineaTexto, styles.margen]}>
                <Text style={styles.titulo}>Referencias: </Text>
                <Text style={styles.descripcion}>
                  {ordenServicio?.direccion?.referencias}
                </Text>
              </Text>
              {ordenServicio?.direccion?.url != null ||
              ordenServicio?.direccion?.url != undefined ? (
                <TouchableOpacity
                  style={styles.accionBotonNavigate}
                  onPress={() => Linking.openURL(ordenServicio?.direccion?.url)}
                >
                  <Text>Navegar</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </View>
          <MapOrdenServicio region={ordenServicio?.direccion} />
          <TouchableOpacity
            style={[styles.accionBoton, styles.terminar]}
            onPress={() => handleTerminada()}
          >
            <Text style={{ color: 'white' }}>Terminar</Text>
          </TouchableOpacity>
          <View style={styles.acciones}>
            <TouchableOpacity
              style={[styles.accionBoton, styles.rojo]}
              onPress={() =>
                navigation.navigate(routes.PRESTADOR_CANCELAR, {
                  ordenServicio,
                })
              }
            >
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accionBoton, styles.reportar]}
              onPress={() =>
                navigation.navigate(routes.PRESTADOR_REPORTE, { ordenServicio })
              }
            >
              <Text style={{ color: 'red' }}>Reportar</Text>
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
    marginBottom: 15,
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
    width: '45%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  terminar: {
    marginTop: 15,
    width: '100%',
    height: 40,
  },
  rojo: {
    backgroundColor: 'red',
  },
  reportar: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'red',
  },
  accionBotonNavigate: {
    backgroundColor: COLORS.green,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})
