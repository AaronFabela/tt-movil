import * as Location from 'expo-location'
import { Alert } from 'react-native'

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied')
    return
  }

  const location = await Location.getCurrentPositionAsync({})
  // setLocation(location)

  // const position = await Location.getCurrentPositionAsync({})
  // const location = {
  //   latitude: position.coords.latitude,
  //   altitude: position.coords.altitude,
  //   latitudeDelta: 0.001,
  //   longitudDelta: 0.001,
  // }

  // response.status = true
  // response.location = location
  return location
}
