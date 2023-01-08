import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import routes from '../../../../../constants/routes'
import { COLORS } from '../../../../../constants'

const HeaderRightHistorialOS = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.boton}
        onPress={() =>
          navigation.navigate(routes.ORDENESERVICIO_HISTORIAL_MODAL)
        }
      >
        <Text style={{ color: COLORS.primary }}>Historial</Text>
      </TouchableOpacity>
    </>
  )
}

export default HeaderRightHistorialOS

const styles = StyleSheet.create({
  boton: {
    height: 25,
    width: 70,
    borderRadius: 5,
    backgroundColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
