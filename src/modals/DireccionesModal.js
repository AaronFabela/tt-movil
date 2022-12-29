import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Icon } from '@rneui/themed'
import { COLORS } from '../constants'
import routes from '../constants/routes'
import ItemDireccion from './components/ItemDireccion'

const DireccionesModal = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext)
  const { direccionActual, direcciones } = userInfo

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titulo}>
          <Text style={{ fontSize: 25 }}>Lista de Direcciones</Text>
          <Icon
            name='close-circle-outline'
            type='ionicon'
            size={35}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.direcciones}>
          <View style={styles.listaDir}>
            {direcciones?.length > 0 ? (
              direcciones?.map((direccion) => (
                <>
                  <ItemDireccion
                    key={direccion._id}
                    nombre={direccion.nombre}
                    direccion={direccion.direccion}
                  />
                </>
              ))
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                  No cuentas con ninguna direccion
                </Text>
                <Image
                  source={require('../assets/no-gps.png')}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.agregarDir}
            onPress={() => navigation.navigate(routes.MAPMODAL)}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>
              Agregar Nueva Direccion
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* </View> */}

      {/* </Modal> */}
    </>
  )
}

export default DireccionesModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 25,
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
    alignItems: 'center',
    borderBottomColor: COLORS.primary,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 15,
    marginBottom: 15,
  },
  direcciones: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaDir: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 9,
    paddingBottom: 15,
  },
  agregarDir: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: 50,
    borderRadius: 15,
    color: 'white',
    backgroundColor: COLORS.primary,
  },
})
