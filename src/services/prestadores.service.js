import axios from 'axios'
import { API_URL } from '../api'

const getPrestadores = async () => {
  return axios.get(API_URL + 'usuario/prestadores/', {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const getPrestadorId = async (id) => {
  return axios.get(API_URL + 'usuario/prestadores/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const getPrestadoresByActivos = async () => {
  return axios.get(API_URL + 'usuario/getPrestadoresActivos/', {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const prestadoresService = {
  getPrestadores,
  getPrestadorId,
  getPrestadoresByActivos,
}

export default prestadoresService
