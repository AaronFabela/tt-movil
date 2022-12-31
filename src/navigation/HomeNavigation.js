import React, { useContext, useEffect, useState } from 'react'
import routes from '../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/home/Home'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context/AuthContext'
import HeaderRightDireccion from '../components/HeaderRightDireccion'
import { COLORS } from '../constants'
import DireccionesModal from '../modals/DireccionesModal'
import MapModal from '../modals/MapModal'
import PerfilPrestador from '../screens/home/PerfilPrestador/PerfilPrestador'
import ModalOrdenServicio from '../screens/home/PerfilPrestador/modals/ModalOrdenServicio'

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.HOME}
        component={Home}
        options={({ navigation }) => ({
          title: `Hola, ${userInfo?.usuario}`,
          headerShown: true,
          headerTintColor: 'white',
          headerRight: () => <HeaderRightDireccion navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
        })}
      />
      <Stack.Screen
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
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name={routes.DIRECCIONESMODAL}
          component={DireccionesModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.MAPMODAL}
          component={MapModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.ORDENSERVICIOMODAL}
          component={ModalOrdenServicio}
          options={{
            title: 'Orden de Servicio',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default HomeNavigation
