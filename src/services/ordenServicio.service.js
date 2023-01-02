import axios from 'axios'
import { API_URL } from '../api'

const crearOrdenServicio = (
  servicio,
  prestador,
  empleador,
  descripcion,
  notas,
  direccion,
  fecha,
  hora
) => {
  return axios.post(
    API_URL + 'ordenesServicio/crearOrdenServicio',
    {
      servicio,
      prestador,
      empleador,
      descripcion,
      notas,
      direccion,
      fecha,
      hora,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

const getOrdenServicioByPrestador = async (id) => {
  return axios.get(API_URL + 'ordenesServicio/obtenerOrdenPrestador/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const getOrdenServicioByEmpleador = async (id) => {
  return axios.get(API_URL + 'ordenesServicio/obtenerOrdenEmpleador/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const ordenServicioService = {
  crearOrdenServicio,
  getOrdenServicioByPrestador,
  getOrdenServicioByEmpleador,
}

export default ordenServicioService
