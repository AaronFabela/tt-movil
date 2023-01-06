import axios from 'axios'
import { API_URL } from '../api'

const getServicios = async () => {
  return axios.get(API_URL + 'servicio/', {
    headers: {
      'Access-Control-Allow-Origin': true,
    },
  })
}

const servicioService = {
  getServicios,
}

export default servicioService
