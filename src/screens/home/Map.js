import React, { useContext, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import { COLORS } from '../../constants'
import MapSetDirection from '../../components/MapSetDirection'

const Map = ({ navigation }) => {
  const { userInfo, ubicacion } = useContext(AuthContext)
  const { latitude, longitude } = ubicacion
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(() => {
    console.log('hol', ubicacion)
  }, [])
  return (
    <>
      {ubicacion?.latitude != null ? (
        <MapSetDirection />
      ) : (
        <Text>Cargando</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default Map
