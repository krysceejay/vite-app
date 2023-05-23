import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPaymentMethods } from '../api/payment-method'

const usePaymentMethodData = () => {
  return useQuery({
    queryKey: ['payment-method'],
    queryFn: () => getPaymentMethods(),
  })
}

export default usePaymentMethodData