import React, { useContext, useEffect, useState } from 'react'
import routes from '../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import Perfil from '../screens/home/Perfil'
import ModalEditarPerfil from '../modals/ModalEditarPerfil'

const Stack = createNativeStackNavigator()

const PerfilNavigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PERFIL}
        component={Perfil}
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
        />*/}
        <Stack.Screen
          name={routes.PERFIL_EDITAR}
          component={ModalEditarPerfil}
          options={{
            title: 'Editar Perfil',
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

export default PerfilNavigation
