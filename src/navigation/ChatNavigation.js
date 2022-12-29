import React from 'react'
import routes from '../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chats from '../screens/home/Chats'
import ChatID from '../screens/home/ChatID'

const Stack = createNativeStackNavigator()

const ChatNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.CHATS} component={Chats} />
      <Stack.Screen
        name={routes.CHAT_ID}
        component={ChatID}
        options={({ route }) => ({ title: route.params?.title })}
      />
    </Stack.Navigator>
  )
}

export default ChatNavigation
