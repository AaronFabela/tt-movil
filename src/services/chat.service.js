import axios from 'axios'
import { API_URL } from '../api'

const getChatsByUser = async (userId) => {
  return axios.get(API_URL + 'chat/' + userId, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const getMensajesByChat = async (chatId) => {
  return axios.get(API_URL + 'mensaje/' + chatId, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const nuevoMensaje = async (chatId, emisor, mensaje) => {
  return axios
    .post(
      API_URL + 'mensaje/',
      {
        chatId,
        emisor,
        mensaje,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((response) => {
      return response.data
    })
}

const nuevoChat = async (emisor, receptor) => {
  return axios
    .post(
      API_URL + 'chat/',
      {
        emisor,
        receptor,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((response) => {
      return response.data
    })
}

const deleteChat = async (id) => {
  return axios
    .delete(API_URL + 'chat/' + id, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      return response.data
    })
}

const chatService = {
  getChatsByUser,
  getMensajesByChat,
  nuevoMensaje,
  nuevoChat,
  deleteChat,
}

export default chatService
