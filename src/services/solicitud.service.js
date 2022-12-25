import axios from 'axios'
import { API_URL } from '../api'

const crearSolicitud = async (solicitud) => {
  const response = await axios.post(
    API_URL + 'solicitudes/crearSolicitud',
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

const solicitudService = {
  crearSolicitud,
}

export default solicitudService
