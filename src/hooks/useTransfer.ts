import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { createTransfer, getUserTransfer, getUserTransfers, updateTransfer } from '../api/transfers'
import { PaginationOptions } from '../api/types/shared-api-types'
import { IUpdateTransfer } from '../api/types/transfer-types'

export const useTransferData = ({page, limit, query}: PaginationOptions) => {
  return useQuery({
    queryKey: ['transfers', { page, limit, query }],
    queryFn: () => getUserTransfers({ page, limit, query }),
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

export const useNewTransfer = (goTo: (int: number) => void) => {
  return useMutation({
    mutationFn: createTransfer,
    onSuccess: () => {
      goTo(2)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        const resErrors = err.response?.data.message
        if (Array.isArray(resErrors)) {
          resErrors.forEach((er: { field: string, error: string }) => {
            toast.error(er.error.replace(/_/g, ' '))
          })
        }else {
          toast.error(resErrors)
        }
      } else {
        console.log('unexpected', err)
      }
    }
  })
}

export const useConfirmTransfer = (guid?: string) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input: IUpdateTransfer) => updateTransfer(input, guid),
    onSuccess: (data) => {
      toast.success('Transfer added successfully')
      navigate(`/transfers/${data.guid}`)
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        const resErrors = err.response?.data.message
        if (Array.isArray(resErrors)) {
          resErrors.forEach((er: { field: string, error: string }) => {
            toast.error(er.error.replace(/_/g, ' '))
          })
        }else {
          toast.error(resErrors)
        }
      } else {
        console.log('unexpected', err)
      }
    }
  })
}
