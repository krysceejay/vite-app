import React, { createContext, useEffect, useState } from 'react'
import { currentUser, signIn, signOut } from '../api/users'
import { ILogin, IUser } from '../api/types/user-types'
import { useQuery } from '@tanstack/react-query'

export interface IAuthContext {
  authUser?: IUser | null
  isLoading: boolean
}

type AuthContextProps = {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProps) => {
 
  // const [authInfo, setAuthInfo] = useState<AuthState>({
  //   authUser: null,
  //   isLoading: true
  // })
  // const { authUser, isLoading } = authInfo

  // const getCurrentUser = async (controller: AbortController, isMounted: boolean) => {
  //   try {
  //     const user = await currentUser(controller)
  //     isMounted && setAuthInfo({ ...authInfo, authUser: user, isLoading: false })
  //   } catch (err) {
  //     setAuthInfo({ ...authInfo, authUser: null, isLoading: false })
  //   }
  // }

  // const login = async (input: ILogin) => {
  //   await signIn(input)
  //   const currUser = await currentUser()
  //   setAuthInfo({ ...authInfo, authUser: currUser, isLoading: false })
  // }

  // const logout = async () => {
  //   await signOut()
  //   setAuthInfo({ ...authInfo, authUser: null, isLoading: false })
  // }

  // useEffect(() => {
  //   let isMounted: boolean = true
  //   const controller = new AbortController()
    
  //   getCurrentUser(controller, isMounted)

  //   return () => {
  //     isMounted = false
  //     controller.abort()
  //   }
  // }, [])

  const { isLoading, data: authUser } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => currentUser(),
    // refetchOnWindowFocus: false,
    retry: false,
  })

  return (
    <AuthContext.Provider value={{ authUser, isLoading }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthContext