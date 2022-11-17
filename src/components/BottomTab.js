import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home'

const Tab = createBottomTabNavigator()

export const BottomRab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home Scrren' component={Home} />
    </Tab.Navigator>
  )
}
