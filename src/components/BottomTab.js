import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'

const Tab = createBottomTabNavigator()

export const BottomRab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home Scrren' component={HomeScreen} />
    </Tab.Navigator>
  )
}
