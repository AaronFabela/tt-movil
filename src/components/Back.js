import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import routes from '../constants/routes'

const Back = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
        <Text>Back</Text>
      </TouchableOpacity>
    </>
  )
}

export default Back
