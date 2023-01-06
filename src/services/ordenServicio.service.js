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

const getOrdenesServicioByActivas = async (id) => {
  return axios.get(API_URL + 'ordenesServicio/obtenerOrdenesActivas/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const getOrdenesServicioByTerminadas = async (id) => {
  return axios.get(API_URL + 'ordenesServicio/obtenerOrdenesTerminadas/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const terminarOrdenServicio = async (id) => {
  console.log(id)
  return axios.put(API_URL + 'ordenesServicio/terminarOrdenServicio/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
    },
  })
}

const cancelarOrdenServicio = async (id) => {
  console.log(id)
  return axios.put(API_URL + 'ordenesServicio/cancelarOrdenServicio/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
    },
  })
}

const getServicios = async () => {
  console.log(id)
  return axios.get(API_URL + 'servicio/', {
    headers: {
      'Access-Control-Allow-Origin': true,
    },
  })
}

const ordenServicioService = {
  crearOrdenServicio,
  getOrdenServicioByPrestador,
  getOrdenServicioByEmpleador,
  getOrdenesServicioByActivas,
  getOrdenesServicioByTerminadas,
  terminarOrdenServicio,
  getServicios,
  cancelarOrdenServicio,
}

export default ordenServicioService
