import { useQuery } from '@tanstack/react-query'
import { getAllCountries, getCountryByCurrency } from '../api/countries'

export const useCountryData = () => {
  return useQuery({
    queryKey: ['country'],
    queryFn: () => getAllCountries(),
  })
}

export const usePayoutCountryData = (currency: string) => {
  return useQuery({
    queryKey: ['country', currency],
    queryFn: () => getCountryByCurrency(currency),
  })
}