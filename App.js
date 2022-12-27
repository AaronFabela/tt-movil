import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { AuthProvider } from './src/context/AuthContext'
import Navigation from './src/navigation/Navigation'

export default function App() {
  return (
    <AuthProvider>
      <Navigation></Navigation>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
