import { Fragment } from 'react'
import { ICountry } from '../../api/types/country-types'
import { Rate } from '../../api/types/currency-types'

type CountryCurrencyListProp = {
  countries: ICountry[] | undefined
  rates: Rate
}

// const CountryCurrencyListOptions = ({countries}: CountryCurrencyListProp) => {
//   const results: ReactElement[] = []
//   Object.entries(rates).forEach(([key, value], ind) => {
//     results.push(
//       <option key={ind} value={key} data-rate={value}> {key} </option>
//     )
//   })
//   return <Fragment>{results}</Fragment>
  
// }
const CountryCurrencyListOptions = ({countries, rates}: CountryCurrencyListProp) => {
  return (
    <Fragment>
      {countries && 
        countries.map(country => (
          <option 
          title={`${country.currency.currency_code} - ${country.country_name}`} 
          key={country.guid} 
          value={country.country_name} 
          data-currency={country.currency.currency_code} 
          data-rate={rates[country.currency.currency_code]}
          >
            {country.currency.currency_code}
          </option>
        ))
      }
    </Fragment>
  )
  
}

export default CountryCurrencyListOptions