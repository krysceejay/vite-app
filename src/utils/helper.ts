import React from "react"

const objKeys = ['guid', 'country_name', 'dial_code']
export const transformData = <T extends { guid: string }>(data: T[]) => {
  return data.map(
    obj => Object.fromEntries(Object.entries(obj).map(
      ([key, value]) => [key, value]
    )
    ))
}

type NumberFormatOptions = {
  currency: string
  style: 'currency' | 'decimal' | 'unit'
}

export const numberFormat = (value: number, options?: NumberFormatOptions) =>
  new Intl.NumberFormat('en', { ...options }).format(value)

export const currencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
  let { value } = e.target
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1.$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ',')
  e.target.value = value

  return e
}

export const removeCommaFromNumber = (num: string) => {
  return num.replace(/,/g, '')
}

// var a='1,125'
// a=a.replace(/\,/g,'')
// a=Number(a)

export const stringToHslColor = (str: string = 'vargent') => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 50%, 80%)`;
}

export const roundToTwoDP = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}
