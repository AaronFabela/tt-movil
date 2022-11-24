import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import { AuthContext } from '../../context/AuthContext'
import { getCurrentLocation } from '../../utils/helpers'
import HomeModal from '../../modals/HomeModal'

const Home = () => {
  const { userInfo, ubicacion, setUbicacion } = useContext(AuthContext)

  useEffect(() => {
    getCurrentLocation().then((response) => {
      console.log(response)
      setUbicacion(response.coords)
    })
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}
    >
      <Text>
        Home! {userInfo?.id} {ubicacion?.latitude}
      </Text>
      <HomeModal />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
