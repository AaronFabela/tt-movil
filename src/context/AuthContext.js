import axios from 'axios'
import React, { createContext, useState } from 'react'
import { API_URL } from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const login = (usuario, password) => {
    console.log(usuario, password)
    setIsLoading(true)
    axios
      .post(API_URL + 'auth/login', {
        usuario,
        password,
      })
      .then((res) => {
        let userInfo = res.data
        setUserInfo(userInfo)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <AuthContext.Provider value={{ isLoading, userInfo, login }}>
      {children}
    </AuthContext.Provider>
  )
}
