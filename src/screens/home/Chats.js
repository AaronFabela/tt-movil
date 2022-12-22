import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants'
import chatService from '../../services/chat.service'
import { AuthContext } from '../../context/AuthContext'
import Conversacion from '../../components/Chat/Conversacion'

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([])
  const { userInfo } = useContext(AuthContext)

  useEffect(() => {
    console.log(userInfo.id)
    chatService.getChatsByUser(userInfo.id).then(
      (response) => {
        setChats(response.data)
        console.log(chats)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [userInfo.id])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}
    >
      <View style={styles.chat}>
        {chats?.map((chat) => (
          <Conversacion
            chat={chat}
            userId={userInfo.id}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  chat: {
    width: '100%',
  },
})
