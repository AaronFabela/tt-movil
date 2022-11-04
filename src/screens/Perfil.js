import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const Perfil = () => {
  return (
    <View style={styles.container}>
      {/* <Spinner */}
      <View style={styles.wrapper}>
        <Text>SOy tu perfil!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  noAccount: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: 'blue',
  },
})

export default Perfil
