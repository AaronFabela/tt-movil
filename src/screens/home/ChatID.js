import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, { useContext, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import chatService from '../../services/chat.service'
import { useEffect } from 'react'
import Mensaje from '../../components/Chat/Mensaje'
import { io } from 'socket.io-client'
import socket from '../../utils/socket'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../../constants'

const ChatID = ({ route }) => {
  const { currentChat, userInfo } = useContext(AuthContext)
  const [mensajesActuales, setMensajesActuales] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  // const socket = useRef()

  useEffect(() => {
    chatService.getMensajesByChat(currentChat._id).then(
      (response) => {
        setMensajesActuales(response.data)
        console.log(userInfo.id)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  useEffect(() => {
    // socket.current = io(SOCKET)
    // setSocket(io.connect('http://192.168.137.254:4001'))
    // const socket = io('http://192.168.146.215:4001', {
    //   transports: ['websockets'],
    // })
    // socket.connect()
    // console.log(socket)
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        emisor: data.senderId,
        mensaje: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.miembros.includes(arrivalMessage.emisor) &&
      setMensajesActuales((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.emit('addUser', userInfo.id)
    socket.on('getUsers', (users) => {})
  }, [userInfo.id])

  const handleSubmit = async (e) => {
    // e.preventDefault()

    try {
      const response = await chatService.nuevoMensaje(
        currentChat._id,
        userInfo.id,
        nuevoMensaje
      )
      // console.log(response)
      const receiverId = currentChat.miembros.find(
        (miembro) => miembro !== userInfo.id
      )
      console.log(receiverId)
      socket.emit('sendMessage', {
        senderId: userInfo.id,
        receiverId: receiverId,
        text: nuevoMensaje,
      })
      setMensajesActuales([...mensajesActuales, response])
      setNuevoMensaje('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ScrollView style={styles.chat}>
        {mensajesActuales.map((mensaje) => (
          <Mensaje
            mensaje={mensaje.mensaje}
            propio={mensaje.emisor === userInfo.id}
          />
        ))}
      </ScrollView>
      <View style={styles.mensajeBox}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          onChangeText={(text) => setNuevoMensaje(text)}
          value={nuevoMensaje}
        />
        <TouchableOpacity style={styles.enviar} onPress={() => handleSubmit()}>
          <Text>
            <Feather name='send' color={COLORS.primary} size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ChatID

const styles = StyleSheet.create({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
    marginBottom: 20,
  },
  mensajeBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  input: {
    borderColor: 'dark',
    borderWidth: 1,
    width: '80%',
    borderRadius: 15,
  },
  enviar: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '15%',
  },
})
