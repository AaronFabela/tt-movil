import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { COLORS, ROUTES } from '../../constants'
import { AuthContext } from '../../context/AuthContext'
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
  const handleSetChat = (chat) => {
    setCurrentChat(chat)
    console.log('gol', chat)
    navigation.navigate(ROUTES.CHAT_ID, { title: receptor.usuario })
  }
  return (
    <TouchableOpacity
      style={styles.conversacion}
      onPress={() => handleSetChat(chat)}
    >
      <View style={styles.sameLine}>
        <Image
          source={{ uri: receptor?.perfil?.secure_url }}
          style={{ height: 50, width: 50, borderRadius: 100 }}
        />
        <View>
          <Text>{receptor?.usuario}</Text>
        </View>
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
    paddingLeft: 15,
    borderBottomColor: COLORS.turques,
    borderBottomWidth: 1,
  },
  sameLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
})
