import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants'
import chatService from '../../services/chat.service'
import { AuthContext } from '../../context/AuthContext'
import Conversacion from '../../components/Chat/Conversacion'
import { ActivityIndicator } from 'react-native-paper'

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([])
  const { userInfo } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log(userInfo.id)
    chatService.getChatsByUser(userInfo.id).then(
      (response) => {
        setChats(response.data)
        setIsLoading(false)
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
        backgroundColor: 'white',
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      ) : chats.length > 0 ? (
        <View style={styles.chat}>
          {chats?.map((chat) => (
            <Conversacion
              key={chat._id}
              chat={chat}
              userId={userInfo.id}
              navigation={navigation}
            />
          ))}
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Text style={{ fontSize: 25 }}>No cuentas con conversaciones</Text>
        </View>
      )}
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  chat: {
    width: '100%',
  },
})
