import axios from 'axios'
import { API_URL } from '../api'

const solicitudEmpleador = async (solicitud) => {
  console.log('doblevez', solicitud)

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

const crearContactos = async (contactos) => {
  const response = await axios.post(
    API_URL + 'index/contactos',
    { contactos },
    {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    }
  )
  return response.data
}

const solicitudPrestador = async (solicitud) => {
  const response = await axios.post(
    API_URL + 'solicitudes/solicitudPrestador',
    solicitud,
    {
      transformRequest: () => solicitud,
    }
  )
  return response.data
}

const solicitudService = {
  solicitudEmpleador,
  solicitudPrestador,
  crearContactos,
}

export default solicitudService
