import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import routes from '../constants/routes'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/home/Home'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import { AuthContext } from '../context/AuthContext'
import Perfil from '../screens/Perfil'
import Map from '../screens/home/Map'
import FirstDirection from '../screens/auth/FirstDirection'
import RegisterEmpleador from '../screens/auth/RegisterEmpleador/RegisterEmpleador'
import TabNavigator from './TabNavigation'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userInfo.login ? (
          <Stack.Screen
            name={routes.HOME_TAB}
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        ) : (
          <>
            <Stack.Screen
              name={routes.LOGIN}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routes.REGISTER}
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routes.REGISTER_EMPLEADOR}
              component={RegisterEmpleador}
              options={{ headerShown: false }}
            />
          </>
        )}
        <Stack.Screen
          name={routes.PERFIL}
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.MAP}
          component={Map}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.FirstDirection}
          component={FirstDirection}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
