import React, { useContext, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Marker } from 'react-native-maps'

const MapOrdenServicio = ({ navigation, region }) => {
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(region.latitude),
          longitude: parseFloat(region.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(region.latitude),
            longitude: parseFloat(region.longitude),
          }}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 200,
  },
})

export default MapOrdenServicio
