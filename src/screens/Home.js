import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { getCurrentLocation } from '../utils/helpers'
import routes from '../utils/routes'

const Home = ({ navigation }) => {
  const { userInfo, ubicacion, setUbicacion } = useContext(AuthContext)

  useEffect(() => {
    getCurrentLocation().then((response) => {
      console.log(response)
      setUbicacion(response.coords)
    })
  }, [])
  return (
    <View style={styles.container}>
      {/* <Spinner */}
      <View style={styles.wrapper}>
        <Text>Hola , {userInfo.usuario}!</Text>
        <Text>Latitud, {ubicacion?.latitude}!</Text>
        <Text>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.MAP)}>
          <Text style={styles.link}>Ir al mapa</Text>
        </TouchableOpacity>
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

export default Home
