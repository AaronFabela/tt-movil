import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from '../../constants'
import { AuthContext } from '../../context/AuthContext'
import { getCurrentLocation } from '../../utils/helpers'
import { ActivityIndicator } from 'react-native-paper'

const Home = ({ navigation }) => {
  const { userInfo, ubicacion, setUbicacion } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={50} animating={true} color={COLORS.white} />
      ) : (
        <></>
        // <Text>
        //   Home! {userInfo?.usuario} {userInfo?.direccionActual?.nombre}
        // </Text>
      )}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
