import React, { Fragment, ReactElement } from 'react'

type CurrencyRateListProp = {
  rates: object
}

const CurrencyRateListOptions = ({rates}: CurrencyRateListProp) => {
  const results: ReactElement[] = []
  Object.entries(rates).forEach(([key, value], ind) => {
    results.push(
      <option key={ind} value={key} data-rate={value}> {key} </option>
    )
  })
  return <Fragment>{results}</Fragment>
  
}

export default CurrencyRateListOptions