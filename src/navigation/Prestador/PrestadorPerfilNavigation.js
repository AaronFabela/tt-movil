import React, { useContext, useEffect, useState } from 'react'
import routes from '../../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../../context/AuthContext'
import { COLORS } from '../../constants'
import PrestadorHome from '../../screens/Prestador/home/PrestadorHome'
import PrestadorMapModal from '../../screens/Prestador/home/modals/PrestadorMapModal'
import PerfilPrestador from '../../screens/Prestador/Perfil/PerfilPrestador'

const Stack = createNativeStackNavigator()

const PrestadorPerfilNavigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PRESTADOR_PERFIL}
        component={PerfilPrestador}
        options={{
          title: `Perfil`,
          headerShown: true,
          headerTintColor: 'white',
          // headerRight: () => <HeaderRightDireccion navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
        }}
      />
      {/* <Stack.Screen
        name={routes.PERFILPRESTADORHOME}
        component={PerfilPrestador}
        options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
          headerTintColor: 'white',
          headerBackTitle: '',
        }}
      /> */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        {/* <Stack.Screen
          name={routes.DIRECCIONESMODAL}
          component={DireccionesModal}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name={routes.PRESTADOR_MAPMODAL}
          component={PrestadorMapModal}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name={routes.ORDENSERVICIOMODAL}
          component={ModalOrdenServicio}
          options={{
            title: 'Orden de Servicio',
            headerStyle: {
              backgroundColor: COLORS.primary,
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name={routes.CREARORDENSERVICIOMODAL}
          component={ModalCrearOrdenServicio}
          options={{
            title: 'Crear Orden Servicio',
            headerStyle: {
              backgroundColor: COLORS.primary,
              shadowColor: '#000',
            },
            headerTintColor: 'white',
            headerBackTitle: '',
          }}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default PrestadorPerfilNavigation
