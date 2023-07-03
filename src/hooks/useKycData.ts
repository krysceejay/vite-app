import { useQuery } from '@tanstack/react-query'
import { checkUserKycVerified, getSmileService, getUserKyc } from '../api/kyc'

export const useKycData = () => {
  return useQuery({
    queryKey: ['kyc'],
    queryFn: () => getUserKyc(),
  })
}

export const useKycSmileService = () => {
  return useQuery({
    queryKey: ['kyc-smile-service'],
    queryFn: () => getSmileService(),
  })
}

export const useCheckKycData = () => {
  return useQuery({
    queryKey: ['kyc-verified'],
    queryFn: () => checkUserKycVerified(),
  })
}