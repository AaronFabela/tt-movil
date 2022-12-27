import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Icon } from '@rneui/themed'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import { useState } from 'react'
import HomeModal from '../modals/HomeModal'

const HeaderRightDireccion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
        <View style={styles.right}>
          <Icon name='location' type='ionicon' size={15} color={COLORS.white} />
          <Text style={{ color: 'white', fontSize: 15 }}>A Mendez 13</Text>
          <Icon
            name='caret-down-circle'
            type='ionicon'
            size={15}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
      <HomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default HeaderRightDireccion

const styles = StyleSheet.create({
  right: {
    width: 150,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    shadowColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.primary,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 15,
    marginBottom: 15,
  },
})
