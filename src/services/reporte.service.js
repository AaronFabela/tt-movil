import axios from 'axios'
import { API_URL } from '../api'

const crearReporte = async (solicitud) => {
  console.log('ya envie', solicitud)
  const response = await axios.post(
    API_URL + 'reporte/crearReporte',
    solicitud,
    {
      headers: {
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  console.log('ya regrese')
  return response.data
}

const reporteService = {
  crearReporte,
}

export default reporteService
