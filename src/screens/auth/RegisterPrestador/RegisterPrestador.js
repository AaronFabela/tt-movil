import React, { useState } from 'react'
import { Text, View, Alert, StyleSheet } from 'react-native'
import routes from '../../../constants/routes'
import { COLORS } from '../../../constants'
import ToastManager, { Toast } from 'toastify-react-native'
import * as ImagePicker from 'expo-image-picker'
import DatosGenerales from './components/DatosGenerales'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import UploadFile from './components/UploadFile'
import solicitudService from '../../../services/solicitud.service'
import { Chip } from 'react-native-paper'

const RegisterPrestador = ({ navigation }) => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [rol, setRol] = useState('prestador')
  const data = new FormData()
  const [images, setImages] = useState({
    perfil: {
      uri: null,
      type: null,
      name: null,
    },
    ine: { uri: null, type: null, name: null },
    domicilio: { uri: null, type: null, name: null },
  })
  const [error, setError] = useState({
    form: true,
    perfil: true,
    ine: true,
    domicilio: true,
    servicios: true,
  })
  const [servicios, setServicios] = useState([])
  const [sCarpintero, setSCarpintero] = useState(false)
  const [sCerrajeria, setSCerrajeria] = useState(false)
  const [sPlomeria, setSPlomeria] = useState(false)
  const [sElectricista, setSElectricista] = useState(false)

  const handleImagePerfil = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImages({
        ...images,
        perfil: { uri: result.uri, type: result.type, name: result.fileName },
      })
    }
    console.log(images)
  }

  const handleImageIne = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImages({
        ...images,
        ine: { uri: result.uri, type: result.type, name: result.fileName },
      })
    }
    console.log(images)
  }

  const handleImageDomicilio = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImages({
        ...images,
        domicilio: {
          uri: result.uri,
          type: result.type,
          name: result.fileName,
        },
      })
    }
  }

  const validate = () => {
    console.log(rol)
    if (
      usuario != null &&
      password != null &&
      email != null &&
      (rol != null || rol != '------')
    ) {
      handleRegister()
    } else {
      Toast.error('Ingresa todos los campos correctamente', 'top')
    }
  }

  const handleForm = () => {
    if (
      usuario.trim().length !== 0 &&
      password.trim().length !== 0 &&
      email.trim().length !== 0
    ) {
      setError({ ...error, form: false })
    } else {
      Toast.error('Ingresa todos los campos correctamente', 'top')
      setError({ ...error, form: true })
    }
  }

  const handleRegister = async () => {
    try {
      // const response = await authService.signup(usuario, email, password, rol)
      data.append('usuario', usuario)
      data.append('email', email)
      data.append('password', password)
      data.append('rol', rol)
      data.append('perfil', images.perfil)
      data.append('INE', images.ine)
      data.append('comprobanteDomicilio', images.domicilio)
      data.append('servicios', servicios)
      // console.log(servicios)
      console.log(data)
      const response = await solicitudService.solicitudPrestador(data)

      if (response.code === 400) {
        const key = response.key.toUpperCase()
        Toast.error(`${response.data.message}`, 'top')
        setUsuario(null)
        setEmail(null)
        setPassword(null)
        setRol(null)
      } else {
        Alert.alert('Solicitud Enviada Correctamente')
        navigation.navigate(routes.LOGIN)
      }
    } catch (error) {
      console.log(error)
      Toast.error(error.response.data.errors[0].msg, 'top')
    }
  }

  const handleImage = (type) => {
    switch (type) {
      case 'perfil':
        if (images.perfil != null) {
          setError({ ...error, perfil: false })
        } else {
          Toast.error('Sube tu foto de perfil', 'top')
          setError({ ...error, perfil: true })
        }
        break
      case 'ine':
        if (images.ine != null) {
          setError({ ...error, ine: false })
        } else {
          Toast.error('Sube tu INE', 'top')
          setError({ ...error, ine: true })
        }
        break
      case 'domicilio':
        if (images.domicilio != null) {
          setError({ ...error, domicilio: false })
        } else {
          Toast.error('Sube tu Comprobante de Domicilio', 'top')
          setError({ ...error, domicilio: true })
        }
        break
      default:
        break
    }
  }

  const handleServicios = (servicio) => {
    if (servicios.includes(servicio)) {
      setServicios(servicios.filter((serv) => serv != servicio))
    } else {
      servicios.push(servicio)
    }
  }

  return (
    <View style={styles.container}>
      {/* <Spinner */}
      <ToastManager />
      <View style={styles.top}>
        <Text>Chambitas</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.titulo}>Registar Prestador</Text>

        <View style={styles.wrapper}>
          <View style={{ flex: 1 }}>
            <ProgressSteps>
              <ProgressStep
                label='Formulario'
                previousBtnText='Anterior'
                nextBtnText='Siguiente'
                onNext={() => handleForm()}
                errors={error.form}
              >
                <View style={{ alignItems: 'center' }}>
                  <DatosGenerales
                    email={email}
                    setEmail={setEmail}
                    usuario={usuario}
                    setUsuario={setUsuario}
                    password={password}
                    setPassword={setPassword}
                    styles={styles}
                  />
                </View>
              </ProgressStep>
              <ProgressStep
                label='Foto Perfil'
                previousBtnText='Anterior'
                nextBtnText='Siguiente'
                onNext={() => handleImage('perfil')}
                errors={error.perfil}
              >
                <View style={{ alignItems: 'center' }}>
                  <UploadFile
                    styles={styles}
                    handleUpload={handleImagePerfil}
                    uriType={images.perfil}
                    titulo='Selecciona Foto de Perfil'
                  />
                </View>
              </ProgressStep>
              <ProgressStep
                label='INE'
                previousBtnText='Anterior'
                nextBtnText='Siguiente'
                onNext={() => handleImage('ine')}
                errors={error.ine}
              >
                <View style={{ alignItems: 'center' }}>
                  <UploadFile
                    styles={styles}
                    handleUpload={handleImageIne}
                    uriType={images.ine}
                    titulo='Selecciona tu INE'
                  />
                </View>
              </ProgressStep>
              <ProgressStep
                label='Comprobante'
                previousBtnText='Anterior'
                nextBtnText='Siguiente'
                onNext={() => handleImage('domicilio')}
                errors={error.domicilio}
              >
                <View style={{ alignItems: 'center' }}>
                  <UploadFile
                    styles={styles}
                    handleUpload={handleImageDomicilio}
                    uriType={images.domicilio}
                    titulo='Selecciona Comprobante Dom'
                  />
                </View>
              </ProgressStep>
              <ProgressStep
                label='Servicios'
                previousBtnText='Anterior'
                nextBtnText='Siguiente'
                onSubmit={() => handleRegister()}
                errors={error.servicios}
              >
                <View style={styles.servicios}>
                  <Chip
                    style={{ marginBottom: 10 }}
                    onPress={() => (
                      setSCarpintero(!sCarpintero),
                      handleServicios('carpintero')
                    )}
                    showSelectedOverlay={true}
                    selected={sCarpintero}
                  >
                    Carpintero
                  </Chip>
                  <Chip
                    style={{ marginBottom: 10 }}
                    onPress={() => (
                      setSCerrajeria(!sCerrajeria),
                      handleServicios('cerrajeria')
                    )}
                    showSelectedOverlay={true}
                    selected={sCerrajeria}
                  >
                    Cerrajeria
                  </Chip>
                  <Chip
                    style={{ marginBottom: 10 }}
                    onPress={() => (
                      setSPlomeria(!sPlomeria), handleServicios('plomeria')
                    )}
                    showSelectedOverlay={true}
                    selected={sPlomeria}
                  >
                    Plomeria
                  </Chip>
                  <Chip
                    style={{ marginBottom: 10 }}
                    onPress={() => (
                      setSElectricista(!sElectricista),
                      handleServicios('electricista')
                    )}
                    showSelectedOverlay={true}
                    selected={sElectricista}
                  >
                    Electricista
                  </Chip>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RegisterPrestador

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  top: {
    height: '20%',
    width: '100%',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    paddingTop: 50,
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    height: '85%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  noAccount: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: 'blue',
  },
  titulo: {
    fontSize: 35,
    marginBottom: 15,
    color: COLORS.turques,
  },
  formulario: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  boton: {
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    color: 'white',
  },
  botonUpload: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    color: 'white',
    marginTop: 15,
  },
  botonesImagen: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  servicios: {
    width: '100%',
  },
})
