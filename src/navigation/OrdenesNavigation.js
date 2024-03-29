import React, { useContext, useEffect, useState } from 'react'
import routes from '../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import DireccionesModal from '../modals/DireccionesModal'
import OrdenesServicio from '../screens/home/OrdenesServicio/OrdenesServicio'
import ModalOrdenServicioActiva from '../screens/home/OrdenesServicio/modals/ModalOrdenServicioActiva'
import { TouchableOpacity, Text } from 'react-native'
import ModalOrdenServicioHistorial from '../screens/home/OrdenesServicio/modals/ModalOrdenServicioHistorial'
import HeaderRightHistorialOS from '../screens/home/OrdenesServicio/modals/components/HeaderRightHistorialOS'
import ModalOrdenServicioHistorialItem from '../screens/home/OrdenesServicio/modals/ModalOrdenServicioHistorialItem'
import ModalCancelarServicio from '../screens/home/OrdenesServicio/modals/ModalCancelarServicio'
import ModalReporte from '../screens/home/OrdenesServicio/modals/ModalReporte'

const Stack = createNativeStackNavigator()

const OrdenesNavigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.ORDENESSERVICIOACTIVAS}
        component={OrdenesServicio}
        options={({ navigation }) => ({
          title: 'Ordenes Servicio',
          headerShown: true,
          headerTintColor: 'white',
          headerRight: () => <HeaderRightHistorialOS navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
        })}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={routes.ORDENESERVICIO_ACTIVA_MODAL}
          component={ModalOrdenServicioActiva}
          options={{
            title: 'Orden Activa',
            headerStyle: {
              backgroundColor: COLORS.primary,
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.ORDENESERVICIO_HISTORIAL_MODAL}
          component={ModalOrdenServicioHistorial}
          options={{
            title: 'Historial Ordenes Servicio',
            headerStyle: {
              backgroundColor: COLORS.primary,
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.ORDENESERVICIO_HISTORIAL_ITEM_MODAL}
          component={ModalOrdenServicioHistorialItem}
          options={{
            title: 'Orden de Servicio Terminada',
            headerStyle: {
              backgroundColor: COLORS.primary,
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.ORDENESERVICIO_CANCELAR}
          component={ModalCancelarServicio}
          options={{
            title: 'Cancelar',
            headerStyle: {
              backgroundColor: 'red',
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.ORDENESERVICIO_REPORTE}
          component={ModalReporte}
          options={{
            title: 'Reporte',
            headerStyle: {
              backgroundColor: 'red',
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default OrdenesNavigation
