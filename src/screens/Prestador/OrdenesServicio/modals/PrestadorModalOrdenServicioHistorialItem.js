import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../../constants'
import { Rating } from 'react-native-rating-component'
import { TextInput } from 'react-native-paper'
import UploadFileGeneral from '../../../../components/UploadFIleGeneral'
import * as ImagePicker from 'expo-image-picker'
import ToastManager, { Toast } from 'toastify-react-native'
import resenaService from '../../../../services/reseña.service'
import { ActivityIndicator } from 'react-native-paper'
import { Alert } from 'react-native'
import { AirbnbRating } from '@rneui/themed'

const PrestadorModalOrdenServicioHistorialItem = ({ route, navigation }) => {
  const { orden } = route.params
  const [calificacion, setCalificacion] = useState(3)
  const [descripcion, setDescripcion] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendResena, setSendResena] = useState(false)

  const [imagen, setImagen] = useState({
    uri: null,
    type: null,
    name: null,
  })

  return (
    <ScrollView
      style={{ width: '100%', flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <ToastManager />
      {isSending ? (
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      ) : (
        <View style={styles.container}>
          <View style={styles.contenido}>
            <View style={styles.cajita}>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                {orden?.empleador?.usuario}
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
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginTop: 15,
                }}
              >
                Calificacion
              </Text>
              {orden?.resena === null || orden?.resena === undefined ? (
                <View style={styles.acciones}>
                  <Text>Orden sin calificación</Text>
                </View>
              ) : (
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={[styles.lineaTexto, styles.margen]}>
                    <Text style={styles.titulo}>Reseña: </Text>
                    <Text style={styles.descripcion}>
                      {orden?.resena?.descripcion}
                    </Text>
                  </Text>
                  <View style={{ alignItems: 'center', width: '100%' }}>
                    <Image
                      style={{ width: 200, height: 200, marginBottom: 15 }}
                      source={{ uri: orden?.resena?.imagen?.secure_url }}
                    />
                    <AirbnbRating
                      count={5}
                      defaultRating={orden?.resena?.calificacion}
                      showRating={false}
                      isDisabled={true}
                      size={30}
                    />
                  </View>

                  {/* <Text>{orden?.resena.}</Text> */}
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default PrestadorModalOrdenServicioHistorialItem

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  contenido: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
  },
  contenidoOrden: {
    marginVertical: 15,
    width: '100%',
  },
  margen: {
    marginBottom: 15,
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
  },
  descripcion: { marginBottom: 10, fontSize: 20 },

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
  accionBoton2: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
})
