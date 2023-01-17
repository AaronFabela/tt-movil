import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import routes from '../../constants/routes'
import { COLORS } from '../../constants'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PrestadorHomeNavigation from './PrestadorHomeNavigation'
import PrestadorChatNavigation from './PrestadorChatNavigation'
import PrestadorPerfilNavigation from './PrestadorPerfilNavigation'
import PrestadorOrdenesNavigation from '../PrestadorOrdenesNavigation'
import Calendario from '../../screens/Prestador/Calendario/Calendario'

const Tab = createBottomTabNavigator()

const PrestadorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: COLORS.white },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.turques,
      }}
    >
      <Tab.Screen
        name={routes.PRESTADOR_HOMENAV}
        component={PrestadorHomeNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.PRESTADOR_ORDENESTERMINADAS}
        component={PrestadorOrdenesNavigation}
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
        name={routes.PRESTADOR_CHAT_NAVIGATION}
        component={PrestadorChatNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name='message-circle' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.PRESTADOR_CALENDARIO}
        component={Calendario}
        options={{
          title: 'Calendario',
          headerStyle: {
            backgroundColor: COLORS.primary,
            shadowColor: '#000',
          },
          headerTintColor: 'white',
          headerBackTitle: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name='calendar' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.PRESTADOR_PERFIL_NAVIGATION}
        component={PrestadorPerfilNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name='settings' color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
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
      */}
    </Tab.Navigator>
  )
}

export default PrestadorTabNavigator
