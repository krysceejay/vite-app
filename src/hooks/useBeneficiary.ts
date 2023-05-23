import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {isAxiosError} from 'axios'
import { toast } from 'react-toastify'
import { addBeneficiary, getUserBeneficiaries, getUserBeneficiariesByCurrency } from '../api/beneficiaries'
import { PaginationOptions } from '../api/types/shared-api-types'

export const useBeneficiaryData = ({page, limit}: PaginationOptions) => {
  return useQuery({
    queryKey: ['beneficiaries', { page, limit }],
    queryFn: () => getUserBeneficiaries({ page, limit }),
    keepPreviousData: true,
  })
}

export const useCountryBeneficiaryData = (currency: string, {page, limit}: PaginationOptions) => {
  return useQuery({
    queryKey: ['beneficiaries', currency, { page, limit }],
    queryFn: () => getUserBeneficiariesByCurrency(currency, { page, limit }),
    keepPreviousData: true,
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