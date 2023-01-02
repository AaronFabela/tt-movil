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
          <View style={styles.tipoUsuario}>
            <View style={styles.usuario}>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.REGISTER_EMPLEADOR)}
                style={styles.usuario}
              >
                <Image
                  source={require('../../assets/user.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  Empleador
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.usuario}>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.REGISTER_PRESTADOR)}
                style={styles.usuario}
              >
                <Image
                  source={require('../../assets/repair.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                  Prestador
                </Text>
              </TouchableOpacity>
            </View>
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
  tipoUsuario: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  usuario: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Register
