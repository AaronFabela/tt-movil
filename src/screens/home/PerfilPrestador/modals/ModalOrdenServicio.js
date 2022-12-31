import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ModalOrdenServicio = ({ route, navigation }) => {
  const { ordenServicio } = route.params

  return (
    <View style={styles.container}>
      <Text>ModalOrdenServicio</Text>
    </View>
  )
}

export default ModalOrdenServicio

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
