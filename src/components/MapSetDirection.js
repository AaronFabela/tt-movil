import React, { useContext, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import { Marker } from 'react-native-maps'

const MapSetDirection = ({ navigation, region, setPin }) => {
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
        width: '100%',
      }}
    >
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapSetDirection
