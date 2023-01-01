import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemOrdenServicio from './components/ItemOrdenServicio'

const OrdenesServicio = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ItemOrdenServicio navigation={navigation} />
        <ItemOrdenServicio navigation={navigation} />
        <ItemOrdenServicio navigation={navigation} />
        <ItemOrdenServicio navigation={navigation} />
      </View>
    </ScrollView>
  )
}

export default OrdenesServicio

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 15,
    width: '100%',
    flex: 1,
  },
})
