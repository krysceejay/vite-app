import { useQuery } from '@tanstack/react-query'
import { getAllCountries } from '../api/countries'

const useCountryData = () => {
  return useQuery({
    queryKey: ['country'],
    queryFn: () => getAllCountries(),
  })
}

export default useCountryData