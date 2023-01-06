import React from 'react'
import routes from '../../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chats from '../../screens/home/Chats'
import ChatID from '../../screens/home/ChatID'
import { COLORS } from '../../constants'

const Stack = createNativeStackNavigator()

const PrestadorChatNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PRESTADOR_CHATS}
        component={Chats}
        options={{
          headerShown: true,
          headerTintColor: 'white',
          title: 'Chats',
          // headerRight: () => <HeaderRightDireccion navigation={navigation} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
        }}
      />
      <Stack.Screen
        name={routes.PRESTADOR_CHATS_ID}
        component={ChatID}
        options={({ route }) => ({ title: route.params?.title })}
      />
    </Stack.Navigator>
  )
}

export default PrestadorChatNavigation
