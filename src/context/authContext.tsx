import React, { createContext, useState } from 'react'
import { IUser } from '../api/types/user-types'
import useLocalStorage from '../hooks/useLocalStorage'

export interface IAuthContext {
  authUser: IUser | null
  persist: boolean
  setAuth: React.Dispatch<React.SetStateAction<IUser | null>>
  setPersist: React.Dispatch<React.SetStateAction<boolean>>
}

type AuthContextProps = {
  children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContext)

export const AuthContextProvider = ({ children }: AuthContextProps) => {

  const [authUser, setAuth] = useState<IUser | null>(null)
  const [persist, setPersist] = useState<boolean>(() => {
    const getPersist: string | null = JSON.parse(localStorage.getItem("persist") || 'null')
    if(!getPersist) return false
    return true
  })

  return (
    <AuthContext.Provider value={{ authUser, persist, setAuth, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext