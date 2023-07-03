import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { currentUser } from '../../api/users'

const Persist = () => {
  const {authUser, persist, setAuth} = useAuth()
  const [isLoading, setLoading] = useState(true)

	useEffect(() => {
    let isMounted = true
    !authUser ? getCurrentUser(isMounted) : setLoading(false)

    return () => {
      isMounted = false
    }
  }, [])

  const getCurrentUser = async (isMounted: boolean) => {
    try {
      const user = await currentUser()
      setAuth(user)
    } catch (err) {
      setAuth(null)
    }finally {
      isMounted && setLoading(false)
    }
  }
  
  return (
    !persist ? <Outlet /> : 
    isLoading ? <div>Loading...</div> : 
    <Outlet />
  )
}

export default Persist