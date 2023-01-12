import React from 'react'
import routes from '../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chats from '../screens/home/Chats'
import ChatID from '../screens/home/ChatID'
import { COLORS } from '../constants'

const Stack = createNativeStackNavigator()

const ChatNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.CHATS}
        component={Chats}
        options={{
          title: 'Chats',
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
          headerTintColor: 'white',
          headerBackTitle: '',
        }}
      />
      <Stack.Screen
        name={routes.CHAT_ID}
        component={ChatID}
        options={({ route }) => ({
          title: route.params?.title,
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
          headerTintColor: 'white',
        })}
      />
    </Stack.Navigator>
  )
}

export default ChatNavigation
