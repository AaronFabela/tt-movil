import axios from 'axios'
import { API_URL } from '../api'

const getUsuarioById = async (userID) => {
  return axios.get(API_URL + `usuario/getUsuario/${userID}`, {
    headers: { 'Content-Type': 'application/json' },
  })
}

const usuarioService = {
  getUsuarioById,
}

export default usuarioService
