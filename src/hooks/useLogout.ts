import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { signOut } from "../api/users"
import useAuth from "./useAuth"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

const useLogout = () => {
	const { setAuth } = useAuth()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setAuth(null)
      navigate('/', {replace: true})
      toast.success('Logout successful')
      queryClient.setQueryData(['current-user'], null)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message)
      } else {
        console.log('unexpected', err)
      }
    }
  })
}

export default useLogout