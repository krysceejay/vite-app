import {FC} from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    // const [loading, setLoading] = useState(false)
    // const [isAuthenticated, setAuth] = useState(true)

    const loading = false
    const isAuthenticated = true

    if (loading) return <div>spinner component</div>
    if (!isAuthenticated) return <Navigate to="/login" />
  
    return <div className="pb-40"><Outlet /></div>
}

export default PrivateRoute