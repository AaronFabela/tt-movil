import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { COLORS, ROUTES } from '../../constants'
import { AuthContext } from '../../context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler'
import authService from '../../services/auth.service.'

const Conversacion = ({ chat, userId, navigation }) => {
  const { setCurrentChat } = useContext(AuthContext)
  const [receptor, setReceptor] = useState(null)

  useEffect(() => {
    const receptorId = chat.miembros.find((m) => m !== userId)

    authService.getUsuarioById(receptorId).then(
      (response) => {
        setReceptor(response.data)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [userId])
  const handleSetChat = (chat, e) => {
    setCurrentChat(chat)
    console.log(chat)
    navigation.navigate(ROUTES.CHAT_ID)
  }
  return (
    <TouchableOpacity
      style={styles.conversacion}
      onPress={(e) => handleSetChat(chat, e)}
    >
      <View>
        <Text>{receptor?.usuario}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Conversacion

const styles = StyleSheet.create({
  conversacion: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 30,
    borderBottomColor: COLORS.turques,
    borderBottomWidth: 1,
  },
})