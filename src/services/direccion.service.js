import axios from 'axios'
import { API_URL } from '../api'

const crearDireccion = async (
  userID,
  nombre,
  direccion,
  referencias,
  latitude,
  longitude
) => {
  console.log('entre')
  return axios.post(
    API_URL + 'direccion/crearDireccion',
    { userID, nombre, direccion, referencias, latitude, longitude },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

const setDireccionActual = async (userID, direccion) => {
  const response = await axios.post(
    API_URL + 'direccion/setDireccionActual',
    { userID, direccion },
    {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    }
  )
  return response.data
}

const direccionService = {
  crearDireccion,
  setDireccionActual,
}

export default direccionService
