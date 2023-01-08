import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [ubicacion, setUbicacion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        setUserInfo,
        ubicacion,
        setUbicacion,
        isModalOpen,
        setIsModalOpen,
        setCurrentChat,
        currentChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
