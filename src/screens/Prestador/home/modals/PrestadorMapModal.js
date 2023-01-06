import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../../../context/AuthContext'
import { COLORS } from '../../../../constants'
import MapSetDirection from '../../../../components/MapSetDirection'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native'
import direccionService from '../../../../services/direccion.service'
import usuarioService from '../../../../services/usuario.service'
import { getCurrentLocation } from '../../../../utils/helpers'

const PrestadorMapModal = ({ navigation }) => {
  const { userInfo, ubicacion, setUserInfo, setUbicacion } =
    useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    referencias: '',
  })
  const [index, setIndex] = useState(0)
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [newDirection, setNewDirection] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [pin, setPin] = useState({
    latitude: 0,
    longitude: 0,
  })
  useEffect(() => {
    getCurrentLocation().then((response) => {
      console.log(userInfo)
      setUbicacion(response.coords)
      setRegion({
        ...region,
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      })
      setPin({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      })
      setIsLoading(false)
    })
  }, [])
  const handleCreateNewDirection = async () => {
    try {
      const response = await direccionService.crearDireccion(
        userInfo.id,
        form.nombre,
        form.direccion,
        form.referencias,
        newDirection.latitude,
        newDirection.longitude
      )
      if (response != undefined) {
        const res = await direccionService.setDireccionActual(
          userInfo.id,
          response.data._id
        )
        const updateUser = await usuarioService.getUsuarioById(userInfo.id)
        setUserInfo({
          ...userInfo,
          direcciones: updateUser.data.direcciones,
          direccionActual: updateUser.data.direccionActual,
        })
        Alert.alert('Direccion añadida con exito')
        navigation.pop(3)
      } else {
        Toast.error(error.response.data.message, 'top')
      }
    } catch (error) {
      console.log(error)
      // Toast.error(error.response.data.errors[0].msg, 'top')
    }
  }
  const handleNewDirection = (latitude, longitude) => {
    Alert.alert('Confirmar Ubicación', '¿Deseas confirmar esta ubicacion?', [
      {
        text: 'Confirmar',
        onPress: () => handleSetNewDirection(latitude, longitude),
      },
      {
        text: 'Seguir Editando',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ])
  }
  const handleSetNewDirection = (latitude, longitude) => {
    setNewDirection({
      latitude,
      longitude,
    })
    setIndex(1)
  }
  return (
    <>
      {isLoading ? (
        <View style={styles.containerLoad}>
          <ActivityIndicator
            size={50}
            animating={true}
            color={COLORS.primary}
          />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <View style={styles.modal}> */}
          {(() => {
            switch (index) {
              case 0:
                return (
                  <>
                    <View style={styles.newDireccion}>
                      <>
                        <View style={styles.mapa}>
                          <MapSetDirection region={region} setPin={setPin} />
                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: '1%',
                            width: '100%',
                            left: '5%',
                          }}
                        >
                          <TouchableOpacity
                            style={styles.agregarDirMap}
                            onPress={() =>
                              handleNewDirection(pin.latitude, pin.longitude)
                            }
                          >
                            <Text style={{ color: 'white', fontSize: 20 }}>
                              Seleccionar Ubicacion
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            top: '5%',
                            width: '100%',
                            left: '85%',
                          }}
                        >
                          <TouchableOpacity
                            style={styles.botonBack}
                            onPress={() => navigation.goBack()}
                          >
                            <Ionicons
                              name='arrow-back'
                              color={COLORS.primary}
                              size={35}
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                    </View>
                  </>
                )
              case 1:
                return (
                  <View style={styles.container2}>
                    <View style={styles.titulo}>
                      <Text style={{ fontSize: 25 }}>
                        Informacion Adicional
                      </Text>
                      <Ionicons
                        name='arrow-back'
                        color={COLORS.primary}
                        size={35}
                        onPress={() => setIndex(0)}
                      />
                    </View>
                    <View style={styles.contenido}>
                      <View style={styles.form}>
                        <TextInput
                          label='Direccion'
                          value={form.direccion}
                          mode='outlined'
                          onChangeText={(text) =>
                            setForm({ ...form, direccion: text })
                          }
                          style={styles.input}
                          outlineColor={COLORS.primary}
                          selectionColor={COLORS.turques}
                          textColor={COLORS.primary}
                          activeOutlineColor={COLORS.primary}
                        />
                        <TextInput
                          label='Alias'
                          value={form.nombre}
                          mode='outlined'
                          onChangeText={(text) =>
                            setForm({ ...form, nombre: text })
                          }
                          style={styles.input}
                          outlineColor={COLORS.primary}
                          selectionColor={COLORS.turques}
                          textColor={COLORS.primary}
                          activeOutlineColor={COLORS.primary}
                        />
                        <TextInput
                          label='Referencias'
                          value={form.referencias}
                          mode='outlined'
                          onChangeText={(text) =>
                            setForm({ ...form, referencias: text })
                          }
                          style={styles.input}
                          outlineColor={COLORS.primary}
                          selectionColor={COLORS.turques}
                          textColor={COLORS.primary}
                          activeOutlineColor={COLORS.primary}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.agregarDir}
                        onPress={() => handleCreateNewDirection()}
                      >
                        <Text style={{ color: 'white', fontSize: 20 }}>
                          Agregar Nueva Direccion
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              case 2:
                return <Won handleClick={handleClick} />
              default:
                return null
            }
          })()}
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    // padding: 25,
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 25,
  },
  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 25,
  },
  newDireccion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapa: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 5,
    paddingBottom: 15,
  },
  agregarDirMap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 70,
    marginBottom: 30,
    borderRadius: 15,
    color: 'white',
    backgroundColor: COLORS.primary,
  },
  botonBack: {
    backgroundColor: 'white',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  modal: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    shadowColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.primary,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 15,
    marginBottom: 15,
  },
  direcciones: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 9,
    paddingBottom: 15,
  },
  agregarDir: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: 50,
    borderRadius: 15,
    color: 'white',
    backgroundColor: COLORS.primary,
  },
  input: {
    width: '100%',
  },
})

export default PrestadorMapModal
