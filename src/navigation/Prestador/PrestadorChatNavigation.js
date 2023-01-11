import React from 'react'
import routes from '../../constants/routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chats from '../../screens/home/Chats'
import ChatID from '../../screens/home/ChatID'
import { COLORS } from '../../constants'
import Prestador_ChatID from '../../screens/home/Prestador_ChatID'
import Prestador_Chats from '../../screens/home/Prestador_Chats'

const Stack = createNativeStackNavigator()

const PrestadorChatNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PRESTADOR_CHATS}
        component={Prestador_Chats}
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
        component={Prestador_ChatID}
        options={({ route }) => ({ title: route.params?.title })}
      />
    </Stack.Navigator>
  )
}

export default PrestadorChatNavigation
