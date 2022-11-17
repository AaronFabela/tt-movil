import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/Register'
import { AuthContext } from '../context/AuthContext'
import Perfil from '../screens/Perfil'
import Map from '../screens/Map'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userInfo.login ? (
          <Stack.Screen name='Home' component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        <Stack.Screen
          name='Perfil'
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Mapa'
          component={Map}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
