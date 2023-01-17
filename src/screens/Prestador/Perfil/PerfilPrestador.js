import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { COLORS } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import authService from '../../../services/auth.service.'

const PerfilPrestador = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext)

  const handleLogout = async () => {
    await authService.logout()
    setUserInfo({
      ...userInfo,
      login: false,
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.foto}>
          <Image
            style={{ width: 150, height: 150, borderRadius: 100 }}
            source={{
              uri: userInfo.perfil.secure_url
                ? userInfo.perfil.secure_url
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            }}
          ></Image>
        </View>
        <View style={styles.contenido}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Datos Personales
          </Text>
          <View style={styles.linea}>
            <Text style={styles.titulo}>Usuario: </Text>
            <Text style={styles.texto}>{userInfo.usuario}</Text>
          </View>
          <View style={styles.linea}>
            <Text style={styles.titulo}>Email: </Text>
            <Text style={styles.texto}>{userInfo.email}</Text>
          </View>
          <Text style={styles.titulo}>Direccion </Text>
          <View style={styles.linea}>
            <Text style={styles.titulo}>Ubicacion: </Text>
            <Text style={styles.texto}>
              {userInfo?.direccionActual?.direccion}
            </Text>
          </View>
          <View style={styles.linea}>
            <Text style={styles.titulo}>Alias: </Text>
            <Text style={styles.texto}>
              {userInfo?.direccionActual?.nombre}
            </Text>
          </View>
          <View style={styles.linea}>
            <Text style={styles.titulo}>Referencias: </Text>
            <Text style={styles.texto}>
              {userInfo?.direccionActual?.referencias}
            </Text>
          </View>
        </View>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>Servicios</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {userInfo.servicios.map((servicio) => (
              <View style={styles.chip}>
                <Text>{servicio.nombre}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.cerrar} onPress={() => handleLogout()}>
          <Text style={{ color: 'white' }}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PerfilPrestador

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  info: {
    width: '100%',
    marginTop: 15,
    flex: 1,
    justifyContent: 'flex-start',
  },
  foto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenido: {
    marginTop: 15,
    backgroundColor: '#f6f6f6',
    // backgroundColor: 'red',
    padding: 5,
    marginBottom: 5,
  },
  linea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 18,
  },
  chip: {
    backgroundColor: 'rgba(6, 40, 61,0.3)',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginRight: 8,
    color: COLORS.primary,
    marginBottom: 5,
  },
  cerrar: {
    marginTop: 30,
    width: '100%',
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})
