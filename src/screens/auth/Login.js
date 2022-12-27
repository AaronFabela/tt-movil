import React, { useContext, useState } from 'react'
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import routes from '../../constants/routes'
import { COLORS } from '../../constants'
import authService from '../../services/auth.service.'
import { set } from 'react-native-reanimated'
import ToastManager, { Toast } from 'toastify-react-native'

const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null)
  const [password, setPassword] = useState(null)
  const { setUserInfo } = useContext(AuthContext)

  const validate = () => {
    if (usuario != null && password != null) {
      handleLogin()
    } else {
      Toast.error('Ingresa un usuario y contraseña', 'top')
    }
  }

  const handleLogin = async (e) => {
    try {
      const response = await authService.login(usuario, password)
      console.log(response)
      if (response != undefined) {
        setUserInfo(response)
        navigation.navigate(routes.HOME_TAB)
      } else {
        // console.log(response)
        Toast.error(error.response.data.message, 'top')
        setUsuario(null)
        setPassword(null)
      }
    } catch (error) {
      console.log(error.response.data)
      Toast.error(error.response.data.message, 'top')
      setUsuario(null)
      setPassword(null)
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
          <Text style={styles.titulo}>Iniciar Sesion</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresar Usuario'
            value={usuario}
            onChangeText={(text) => setUsuario(text)}
          />

          <TextInput
            style={styles.input}
            placeholder='Ingresar Contraseña'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity onPress={validate} style={styles.boton}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Iniciar Sesion
            </Text>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text>¿No tienes una cuenta?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.REGISTER)}
            >
              <Text style={styles.link}> Registrar</Text>
            </TouchableOpacity>
          </View>
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
    height: '35%',
    width: '100%',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    paddingTop: 50,
    height: '65%',
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
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    color: 'white',
  },
})

export default Login
