import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { COLORS, ROUTES } from '../constants'
import { Home, Map, Chats, Settings } from '../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import SettingsNavigator from './SettingsNavigator'
import CustomTabBarButton from '../components/CustomTabBarButton'
import CustomTabBar from '../components/CustomTabBar'
import { useNavigation } from '@react-navigation/native'
import HeaderRightDireccion from '../components/HeaderRightDireccion'

const Tab = createBottomTabNavigator()

function BottomTabNavigator() {
  const navigation = useNavigation()

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({ color, size, focused }) => {
          var iconName

          switch (route.name) {
            case ROUTES.HOME_TAB:
              iconName = focused ? 'home' : 'ios-home-outline'
              break
            case ROUTES.SETTINGS_NAVIGATOR:
              iconName = focused ? 'settings' : 'settings-outline'
              break
            case ROUTES.MAP:
              iconName = focused ? 'wallet' : 'wallet-outline'
              break
            case ROUTES.CHATS:
              iconName = focused
                ? 'md-notifications-sharp'
                : 'md-notifications-outline'
              break
          }

          return <Icon name={iconName} size={22} color={color} />
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
        options={{
          headerShown: true,
          headerTitle: 'Hola Aaron',
          headerRight: () => <HeaderRightDireccion />,
          headerTintColor: 'white',
          // headerBackground: 'red',
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: 100,
            // borderBottomLeftRadius: 50,
            elevation: 25,
            shadowColor: '#000',
          },
          tabBarButton: (props) => (
            <CustomTabBarButton route='home' {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MAP}
        component={Map}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CHATS}
        component={Chats}
        options={{
          headerShown: true,
          headerTitle: 'Chats Aaron',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: 100,
            elevation: 25,
            shadowColor: '#000',
          },
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          title: 'Settings',
          headerShown: true,
          tabBarButton: (props) => (
            <CustomTabBarButton route='settings' {...props} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                  size={30}
                  color={COLORS.dark}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  },
})
