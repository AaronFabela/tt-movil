import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import routes from '../constants/routes'
import Map from '../screens/home/Map'
import Chats from '../screens/home/Chats'
import Home from '../screens/home/Home'
import { COLORS } from '../constants'
import HeaderRightDireccion from '../components/HeaderRightDireccion'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import ChatNavigation from './ChatNavigation'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: COLORS.primary },
        tabBarActiveTintColor: COLORS.white,
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={Home}
        options={{
          headerShown: true,
          headerRightContainerStyle: {},
          headerRight: () => <HeaderRightDireccion />,
          headerTintColor: 'white',
          // headerRightContainerStyle: {
          //   width: '25%',
          // },
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: 100,
            // borderBottomLeftRadius: 50,
            elevation: 25,
            shadowColor: '#000',
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.MAP}
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='map' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.CHAT_NAVIGATION}
        component={ChatNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name='message-circle' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
