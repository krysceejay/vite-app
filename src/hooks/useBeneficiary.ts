import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {isAxiosError} from 'axios'
import { toast } from 'react-toastify'
import { addBeneficiary, getUserBeneficiaries, getUserBeneficiariesByCountry } from '../api/beneficiaries'
import { PaginationOptions } from '../api/types/shared-api-types'

export const useBeneficiaryData = ({page, limit, query}: PaginationOptions) => {
  return useQuery({
    queryKey: ['beneficiaries', { page, limit, query }],
    queryFn: () => getUserBeneficiaries({ page, limit, query }),
    keepPreviousData: true,
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

export const useCountryBeneficiaryData = (country: string, {page, limit, query}: PaginationOptions) => {
  return useQuery({
    queryKey: ['beneficiaries', country, { page, limit, query }],
    queryFn: () => getUserBeneficiariesByCountry(country, { page, limit, query }),
    keepPreviousData: true,
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

// export const useNewBeneficiary = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: addBeneficiary,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['beneficiaries'])
//     },
//     onError: (err) => {
//       if (isAxiosError(err)) {
//         const resErrors = err.response?.data.message
//         resErrors.forEach((er: { field: string, error: string }) => {
//           toast.error( er.error.replace(/_/g, ' '))
//         })
//       } else {
//         console.log('unexpected', err)
//       }
//     }
//   })
// }