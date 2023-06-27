import { useQuery } from '@tanstack/react-query'
import { checkUserKycVerified, getUserKyc } from '../api/kyc'

export const useKycData = () => {
  return useQuery({
    queryKey: ['kyc'],
    queryFn: () => getUserKyc(),
  })
}

export const useCheckKycData = () => {
  return useQuery({
    queryKey: ['kyc-verified'],
    queryFn: () => checkUserKycVerified(),
  })
}