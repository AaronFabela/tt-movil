import axios from 'axios'
import { API_URL } from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getUsuarioById = async (id) => {
  return axios.get(API_URL + 'usuario/getUsuario/' + id, {
    headers: { 'Content-Type': 'application/json' },
  })
}

const login = async (usuario, password) => {
  console.log('Hice un login')
  return axios
    .post(
      API_URL + 'auth/login',
      {
        usuario,
        password,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((res) => {
      let userInfo = res.data
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      return userInfo
    })
  // .catch((e) => {
  //   console.log('2asdsa')
  //   console.log(e)
  // })
}

const signup = async (usuario, email, password, rol) => {
  // const { usuario, email, password, rol } = user
  const response = await axios.post(API_URL + 'auth/signup/', {
    usuario,
    email,
    password,
    rol: [rol],
  })
  console.log(response.data)

  return response.data
}

const authService = {
  // getCurrentUser,
  login,
  signup,
  getUsuarioById,
}

export default authService
