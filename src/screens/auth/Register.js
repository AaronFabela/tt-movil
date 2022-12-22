import React, { useContext, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import routes from '../../utils/routes'
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

  const { isLoading, login } = useContext(AuthContext)
  const roles = ['------', 'empleador', 'prestador']

  // useEffect(() => {
  //   getCurrentLocation().then((response) => {
  //     console.log(response)
  //     setUbicacion(response.coords)
  //   })
  // }, [])
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
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
          <Text style={styles.titulo}>Registar Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder='Correo Electronico'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Nuevo Usuario'
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
          <SelectDropdown
            data={roles}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem) => {
              setRol(selectedItem)
            }}
            defaultButtonText={'Seleccion un Rol'}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            // renderDropdownIcon={(isOpened) => {
            //   return (
            //     <FontAwesome
            //       name={isOpened ? 'chevron-up' : 'chevron-down'}
            //       color={'#444'}
            //       size={18}
            //     />
            //   )
            // }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <TouchableOpacity onPress={validate} style={styles.boton}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Registrar
            </Text>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text>Ya tengo cuenta</Text>
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <Text style={styles.link}> Iniciar Sesion</Text>
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
