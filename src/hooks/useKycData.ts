import { useQuery } from '@tanstack/react-query'
import { getUserKyc } from '../api/kyc'

const useKycData = () => {
  return useQuery({
    queryKey: ['kyc'],
    queryFn: () => getUserKyc(),
  })
}

export default useKycData