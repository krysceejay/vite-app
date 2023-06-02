import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { createTransfer, getUserTransfer, getUserTransfers } from '../api/transfers'
import { PaginationOptions } from '../api/types/shared-api-types'

export const useTransferData = ({page, limit}: PaginationOptions) => {
  return useQuery({
    queryKey: ['transfers', { page, limit }],
    queryFn: () => getUserTransfers({ page, limit }),
    keepPreviousData: true,
  })
}

export const useTransferDetails = (id?: string) => {
  return useQuery({
    queryKey: ['transfers', id],
    queryFn: () => getUserTransfer(id),
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message)
      } else {
        console.log('unexpected', err)
      }
    }
  })
}

export const useNewTransfer = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: createTransfer,
    onSuccess: (data) => {
      toast.success('Transfer added successfully')
      navigate(`/transfers/${data.guid}`)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        const resErrors = err.response?.data.message
        resErrors.forEach((er: { field: string, error: string }) => {
          toast.error( er.error.replace(/_/g, ' '))
        })
      } else {
        console.log('unexpected', err)
      }
    }
  })
}
