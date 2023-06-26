import React, { createContext, useEffect, useState } from 'react'
import { currentUser, signIn, signOut } from '../api/users'
import { ILogin, IUser } from '../api/types/user-types'
import { useQuery } from '@tanstack/react-query'

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

  // const { isLoading, data: authUser } = useQuery({
  //   queryKey: ['current-user'],
  //   queryFn: () => currentUser(),
  //   // refetchOnWindowFocus: false,
  //   retry: false,
  // })

  return (
    <AuthContext.Provider value={{ authUser, persist, setAuth, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext