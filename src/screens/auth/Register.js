import React, { useContext, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  Image,
} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import routes from '../../constants/routes'
import { COLORS } from '../../constants'
import { useEffect } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import authService from '../../services/auth.service.'
import ToastManager, { Toast } from 'toastify-react-native'

const Register = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [rol, setRol] = useState(null)

  // useEffect(() => {
  //   getCurrentLocation().then((response) => {
  //     console.log(response)
  //     setUbicacion(response.coords)
  //   })
  // }, [])
  useEffect(() => {
    // navigation.setOptions({ headerShown: false })
  }, [])

  const validate = () => {
    console.log(rol)
    if (
      usuario != null &&
      password != null &&
      email != null &&
      (rol != null || rol != '------')
    ) {
      handleLogin()
    } else {
      Toast.error('Ingresa todos los campos correctamente', 'top')
    }
  }

  const handleLogin = async (e) => {
    try {
      const response = await authService.signup(usuario, email, password, rol)
      if (response.code === 400) {
        const key = response.key.toUpperCase()
        Toast.error(`${response.data.message}`, 'top')
        setUsuario(null)
        setEmail(null)
        setPassword(null)
        setRol(null)
      } else {
        Alert.alert('Registro exitoso')
        navigation.navigate(routes.FirstDirection)
      }
    } catch (error) {
      Toast.error(`${error.response.data.message}`, 'top')
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
        <View style={styles.wrapper}>
          <Text style={styles.titulo}>Selecciona el Tipo de Usuario</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.REGISTER_EMPLEADOR)}
          >
            <Image
              source={require('../../assets/user.png')}
              style={{ width: 200, height: 200 }}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/repair.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>
    </View>
  )
}

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
    width: '80%',
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
  boton: {
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    color: 'white',
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 15 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
})

export default Register
