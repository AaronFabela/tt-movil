import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, ForgotPassword, Register } from '../screens'
import { COLORS, ROUTES } from '../constants'
import DrawerNavigator from './DrawerNavigator'
import ChatID from '../screens/home/ChatID'

const Stack = createStackNavigator()
// Navigator, Screen, Group

function AuthNavigator() {
  console.log(Stack)
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({ route }) => ({
          headerTintColor: COLORS.white,
          // headerBackTitle: 'Back',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          title: route.params.userId,
        })}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen
        name={ROUTES.HOME}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CHAT_ID}
        component={ChatID}
        options={{
          headerShown: true,
          headerTitle: 'Chat ',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: 100,
            elevation: 25,
            shadowColor: '#000',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator
