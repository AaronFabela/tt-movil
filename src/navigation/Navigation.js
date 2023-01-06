import React, { useContext } from 'react'
import routes from '../constants/routes'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { COLORS } from '../constants'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import { AuthContext } from '../context/AuthContext'
import FirstDirection from '../screens/auth/FirstDirection'
import RegisterEmpleador from '../screens/auth/RegisterEmpleador/RegisterEmpleador'
import TabNavigator from './TabNavigation'
import RegisterPrestador from '../screens/auth/RegisterPrestador/RegisterPrestador'
import PrestadorTabNavigator from './Prestador/PrestadorTabNavigation'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { userInfo } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userInfo.login ? (
          (() => {
            switch (userInfo.rol) {
              case 'empleador':
                return (
                  <Stack.Screen
                    name={routes.HOME_TAB}
                    options={{ headerShown: false }}
                    component={TabNavigator}
                  />
                )
              case 'prestador':
                return (
                  <Stack.Screen
                    name={routes.PRESTADOR_HOMETAB}
                    options={{ headerShown: false }}
                    component={PrestadorTabNavigator}
                  />
                )
              case 'won':
                return <Won handleClick={handleClick} />
              case 'lost':
                return <Lost handleClick={handleClick} />
              default:
                return null
            }
          })()
        ) : (
          <>
            <Stack.Screen
              name={routes.LOGIN}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routes.REGISTER}
              component={Register}
              options={{
                title: 'Registro',
                headerTintColor: 'white',
                headerShown: true,
                headerBackVisible: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                  // borderBottomLeftRadius: 50,
                },
              }}
            />
            <Stack.Screen
              name={routes.REGISTER_EMPLEADOR}
              component={RegisterEmpleador}
              options={{
                title: '',
                headerTintColor: 'white',
                headerShown: true,
                headerBackVisible: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                  // borderBottomLeftRadius: 50,
                },
              }}
            />
            <Stack.Screen
              name={routes.REGISTER_PRESTADOR}
              component={RegisterPrestador}
              options={{
                title: '',
                headerTintColor: 'white',
                headerShown: true,
                headerBackVisible: true,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                  // borderBottomLeftRadius: 50,
                },
              }}
            />
          </>
        )}
        {/* <Stack.Screen
          name={routes.MAPMODAL}
          component={MapModal}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name={routes.FirstDirection}
          component={FirstDirection}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
