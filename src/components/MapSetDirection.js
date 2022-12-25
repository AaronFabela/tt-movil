import React, { useContext, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import { Marker } from 'react-native-maps'

const MapSetDirection = ({ navigation }) => {
  const { userInfo, ubicacion } = useContext(AuthContext)
  const { latitude, longitude } = ubicacion
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [pin, setPin] = useState({
    latitude,
    longitude,
  })

  // useEffect(() => {
  //   console.log('hol2', ubicacion)
  //   // setPin({latitude}]
  // }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}
    >
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          title='HOla, soy un Marker'
          // pinColor='#FFFFFF'
          description='Si, confirmo'
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log('DragStart:', e.nativeEvent.coordinate)
          }}
          // onDragEnd={(e) => {
          //   console.log('DragEnd:', e.nativeEvent.coordinate)
          //   setPin({
          //     latitude: e.nativeEvent.coordinate.latitude,
          //     longitude: e.nativeEvent.coordinate.longitude,
          //   })
          // }}
        />
      </MapView>
    </View>
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

export default MapSetDirection
