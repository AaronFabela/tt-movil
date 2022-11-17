import React, { useContext, useState } from 'react'
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import routes from '../../utils/routes'

const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null)
  const [password, setPassword] = useState(null)
  const { isLoading, login } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      {/* <Spinner */}
      <View style={styles.wrapper}>
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

        <Button
          title='Iniciar Sesión'
          // onPress={() => {login(usuario, password)}}
          onPress={() => navigation.navigate(routes.HOME)}
        />

        <View style={styles.noAccount}>
          <Text>¿No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.REGISTER)}
          >
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
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
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
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
})

export default LoginScreen
