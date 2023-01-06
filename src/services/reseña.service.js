import axios from 'axios'
import { API_URL } from '../api'

const crearResena = async (solicitud) => {
  console.log('ya envie', solicitud)
  const response = await axios.post(API_URL + 'resena/crearResena', solicitud, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'multipart/form-data',
    },
  })
  console.log('ya regrese')
  return response.data
}

const resenaService = {
  crearResena,
}

export default resenaService
