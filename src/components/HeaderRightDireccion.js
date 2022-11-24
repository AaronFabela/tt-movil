import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Icon } from '@rneui/themed'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HeaderRightDireccion = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AuthContext)
  return (
    <>
      <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
        <View style={styles.right}>
          <Text style={{ color: 'white', fontSize: 15 }}>
            <Icon
              name='location'
              type='ionicon'
              size={15}
              color={COLORS.white}
            />
            A Mendez 13
          </Text>
          <Icon
            name='caret-down-circle'
            type='ionicon'
            size={15}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
    </>
  )
}

export default HeaderRightDireccion

const styles = StyleSheet.create({
  right: {
    width: 125,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginRight: 10,
  },
})
