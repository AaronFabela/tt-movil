import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import routes from '../utils/routes'
import colors from '../utils/colors'
import Home from '../screens/Home'
import BottomTabNavigator from './BottomTabNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={routes.HOME_DRAWER} component={BottomTabNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

// const styles = StyleSheet.create({})
