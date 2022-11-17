import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import routes from '../utils/routes'
import Home from '../screens/Home'
import Perfil from '../screens/Perfil'
import Map from '../screens/Map'
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '../utils/colors'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.MARINO,
        tabBarIcon: ({ color, size, focused }) => {
          var iconName
          switch (route.name) {
            case routes.HOME_TAB:
              iconName = focused ? 'ios-home-sharp' : 'ios-home-outline'
              break
            case routes.PERFIL:
              iconName = focused ? 'settings' : 'settings-outline'
              break
            case routes.MAP:
              iconName = focused ? 'wallet' : 'wallet-outline'
              break
          }

          return <Icon name={iconName} size={22} color={color} />
        },
      })}
    >
      <Tab.Screen name={routes.HOME_TAB} component={Home} />
      <Tab.Screen name={routes.PERFIL} component={Perfil} />
      <Tab.Screen name={routes.MAP} component={Map} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})
