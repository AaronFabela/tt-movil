import React, { useContext, useEffect, useState } from 'react'
import routes from '../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import DireccionesModal from '../modals/DireccionesModal'
import PrestadorOrdenesServicio from '../screens/Prestador/OrdenesServicio/PrestadorOrdenesServicio'
import PrestadorModalOrdenServicioActiva from '../screens/Prestador/OrdenesServicio/modals/PrestadorModalOrdenServicioActiva'
import { TouchableOpacity, Text } from 'react-native'
import PrestadorModalOrdenServicioHistorial from '../screens/Prestador/OrdenesServicio/modals/PrestadorModalOrdenServicioHistorial'
import HeaderRightHistorialOS from '../screens/Prestador/OrdenesServicio/modals/components/HeaderRightHistorialOS'
import PrestadorModalOrdenServicioHistorialItem from '../screens/Prestador/OrdenesServicio/modals/PrestadorModalOrdenServicioHistorialItem'

const Stack = createNativeStackNavigator()

const PrestadorOrdenesNavigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PRESTADOR_ORDENESSERVICIOACTIVAS}
        component={PrestadorOrdenesServicio}
        options={({ navigation }) => ({
          title: 'Ordenes Servicio Terminadas',
          headerShown: true,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
        })}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={routes.PRESTADOR_ORDENESERVICIO_ACTIVA_MODAL}
          component={PrestadorModalOrdenServicioActiva}
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
          name={routes.PRESTADOR_ORDENESERVICIO_HISTORIAL_MODAL}
          component={PrestadorModalOrdenServicioHistorial}
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
          name={routes.PRESTADOR_ORDENESERVICIO_HISTORIAL_ITEM_MODAL}
          component={PrestadorModalOrdenServicioHistorialItem}
          options={{
            title: 'Ordenes Servicio Terminada',
            headerStyle: {
              backgroundColor: COLORS.primary,
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

export default PrestadorOrdenesNavigation
