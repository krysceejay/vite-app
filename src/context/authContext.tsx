import { createContext, useEffect, useState } from 'react'
import { currentUser, signIn, signOut } from '../api/users'
import { ILogin, IUser } from '../api/types/user-types'

export interface IAuthContext {
  login: (input: ILogin) => Promise<void>
  logout: () => Promise<void>
  authUser: IUser | null
  isLoading: boolean
}

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthContextProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState<IUser | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const getCurrentUser = async (controller: AbortController) => {
    try {
      const user = await currentUser(controller)
      setLoading(false)
      setAuthUser(user)
    } catch (err) {
      setLoading(false)
      setAuthUser(null)
    }
  }

  const login = async (input: ILogin) => {
    await signIn(input)
    const currUser = await currentUser()
    setLoading(false)
    setAuthUser(currUser)
  }

  const logout = async () => {
    await signOut()
    setLoading(false)
    setAuthUser(null)
  }

  useEffect(() => {
    const controller = new AbortController()
    getCurrentUser(controller)
    return () => controller.abort()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, authUser, isLoading }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthContext