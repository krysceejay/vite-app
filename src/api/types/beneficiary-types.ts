export interface IBeneficiary {
  guid: string
  full_name: string
  send_number: string
  delivery_method: string
  service: string
  country_guid: string
  user_guid: string
  country_name: string
  country_currency: string
  created_at: Date
  updated_at: Date
}

export interface IAddBeneficiary {
  full_name: string
  service: string
  send_number: string
  delivery_method: string
  country_name: string
  country_currency: string
}