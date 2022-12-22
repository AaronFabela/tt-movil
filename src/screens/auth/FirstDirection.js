import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { AuthContext } from '../../context/AuthContext'
import { COLORS } from '../../constants'
import { getCurrentLocation } from '../../utils/helpers'
import MapSetDirection from '../../components/MapSetDirection'

export default function FirstDirection() {
  const { userInfo, ubicacion, setUbicacion } = useContext(AuthContext)
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(() => {
    getCurrentLocation().then((response) => {
      console.log(response)
      setUbicacion(response.coords)
      setRegion({
        ...region,
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      })
    })
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
