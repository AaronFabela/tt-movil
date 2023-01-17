import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import ToastManager, { Toast } from 'toastify-react-native'
import solicitudService from '../services/solicitud.service'
import { Alert } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const ModalEditarPerfil = () => {
  const { userInfo } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState(userInfo.email)
  const [usuario, setUsuario] = useState(userInfo.usuario)
  const [telefono, setTelefono] = useState(
    userInfo.telefono === undefined ? '' : userInfo.telefono
  )

  const handleForm = () => {
    console.log('entre')
    setIsLoading(true)
    if (
      usuario.trim().length !== 0 &&
      email.trim().length !== 0 &&
      telefono.trim().length !== 0
    ) {
      console.log('adios')
      handleEnviar()
    } else {
      setIsLoading(false)

      console.log('Hola')
      Toast.error('Ingresa todos los campos correctamente', 'top')
    }
  }

  const handleEnviar = async () => {
    try {
      await solicitudService.editarUsuario(
        userInfo.id,
        usuario,
        telefono,
        email
      )
      setIsLoading(false)
      Alert.alert('Datos actualizados correctamente')
    } catch (error) {
      console.log(error)
      setIsLoading(false)

      Toast.error('Verifica la informacion', 'top')
    }
  }
  // const handleEnviar =async () =>{
  //  if(email.trim().le)
  // }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
      <ToastManager />

      {isLoading ? (
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      ) : (
        <>
          <TextInput
            style={[styles.input, styles.margen]}
            placeholder='Usuario'
            value={usuario}
            onChangeText={(text) => setUsuario(text)}
          />
          <TextInput
            style={[styles.input]}
            placeholder='Telefono'
            value={telefono}
            onChangeText={(text) => setTelefono(text)}
          />
          <TextInput
            style={[styles.input]}
            placeholder='Correo Electronico'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleForm()}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              Editar Información
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default ModalEditarPerfil

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  margen: {
    marginTop: 15,
  },
  btn: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
})
