import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Icon } from '@rneui/themed'
import { COLORS } from '../constants'

const HomeModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType={'slide'}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.titulo}>
              <Text style={{ fontSize: 25 }}>Añadir nueva direccion</Text>
              <Icon
                name='close-circle-outline'
                type='ionicon'
                size={35}
                color={COLORS.primary}
                onPress={() => setIsModalOpen(!setIsModalOpen)}
              />
            </View>

            <Text>Lista de direcciones</Text>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default HomeModal

const styles = StyleSheet.create({
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
