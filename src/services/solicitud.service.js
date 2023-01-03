import axios from 'axios'
import { API_URL } from '../api'

const solicitudEmpleador = async (solicitud) => {
  const response = await axios.post(
    API_URL + 'solicitudes/solicitudEmpleador',
    solicitud,
    {
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

const solicitudPrestador = async (solicitud) => {
  console.log('ya envie')
  const response = await axios.post(
    API_URL + 'solicitudes/solicitudPrestador',
    solicitud,
    {
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  console.log('ya regrese')
  return response.data
}

const solicitudService = {
  solicitudEmpleador,
  solicitudPrestador,
}

export default solicitudService
