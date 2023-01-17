import axios from 'axios'
import { API_URL } from '../api'

const crearOrdenServicio = (orden) => {
  return axios.post(API_URL + 'ordenesServicio/crearOrdenServicio', orden, {
    headers: { 'Content-Type': 'application/json' },
  })
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

const getOrdenesServicioByCanceladas = async (id) => {
  return axios.get(API_URL + 'ordenesServicio/obtenerOrdenesCanceladas/' + id, {
    headers: {
      'Access-Control-Allow-Origin': true,
      'Content-Type': 'application/json',
    },
  })
}

const getOrdenesServicioByDate = async (id) => {
  return axios.get(API_URL + 'ordenesServicio/obtenerOrdenByDate/' + id, {
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

const cancelarOrdenServicio = async (id, motivos) => {
  console.log(id, motivos)
  return axios.put(
    API_URL + 'ordenesServicio/cancelarOrdenServicio/' + id,
    { motivos },
    {
      headers: {
        'Access-Control-Allow-Origin': true,
      },
    }
  )
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
  getOrdenesServicioByCanceladas,
  getOrdenesServicioByDate,
}

export default ordenServicioService
