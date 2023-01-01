import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import routes from '../constants/routes'
import { COLORS } from '../constants'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ChatNavigation from './ChatNavigation'
import { AuthContext } from '../context/AuthContext'
import HomeNavigation from './HomeNavigation'
import OrdenesNavigation from './OrdenesNavigation'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: COLORS.primary },
        tabBarActiveTintColor: COLORS.white,
      }}
    >
      <Tab.Screen
        name={routes.HOMENAV}
        component={HomeNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ORDENESSERVICIO_NAVIGATION}
        component={OrdenesNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='note-text-outline'
              color={color}
              size={size}
            />
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
