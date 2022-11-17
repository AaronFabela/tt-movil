import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/auth/LoginScreen'
import routes from '../utils/routes'
import Register from '../screens/auth/Register'
import BottomTabNavigator from './BottomTabNavigator'
import colors from '../utils/colors'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.TURQUESA },
        headerTintColor: 'white',
        // headerShown: false,
      }}
    >
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER} component={Register} />
      <Stack.Screen
        name={routes.HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
