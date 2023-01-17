import { View, TextInput } from 'react-native'
import React from 'react'

const DatosGenerales = ({
  email,
  setEmail,
  usuario,
  setUsuario,
  password,
  telefono,
  setTelefono,
  setPassword,
  styles,
}) => {
  return (
    <View style={styles.formulario}>
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
        placeholder='Telefono'
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
      />

      <TextInput
        style={styles.input}
        placeholder='Ingresar Contraseña'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
    </View>
  )
}

export default DatosGenerales
