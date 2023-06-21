export interface Rate {
  [key: string]: string | number
}

export interface ICurrency {
  guid: string
  currency_code: string
  rates: Rate
  created_at: Date
  updated_at: Date
}

