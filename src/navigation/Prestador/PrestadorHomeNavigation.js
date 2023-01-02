import React, { useContext, useEffect, useState } from 'react'
import routes from '../../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../../context/AuthContext'
import { COLORS } from '../../constants'
import PrestadorHome from '../../screens/Prestador/home/PrestadorHome'

const Stack = createNativeStackNavigator()

const PrestadorHomeNavigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PRESTADOR_HOME}
        component={PrestadorHome}
        options={({ navigation }) => ({
          title: `Hola, ${userInfo?.usuario}`,
          headerShown: true,
          headerTintColor: 'white',
          // headerRight: () => <HeaderRightDireccion navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
        })}
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
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
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
        />
      </Stack.Group> */}
    </Stack.Navigator>
  )
}

export default PrestadorHomeNavigation
