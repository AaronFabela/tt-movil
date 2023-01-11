import axios from 'axios'
import { API_URL } from '../api'

const getUsuarioById = async (userID) => {
  return axios.get(API_URL + `usuario/getUsuario/${userID}`, {
    headers: { 'Content-Type': 'application/json' },
  })
}

const buscarAmigos = async (idEmpleador, contactos) => {
  const response = await axios.post(
    API_URL + 'usuario/buscarAmigos',
    { idEmpleador, contactos },
    {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    }
  )
  return response.data
}

const usuarioService = {
  getUsuarioById,
  buscarAmigos,
}

export default usuarioService
