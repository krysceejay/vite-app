export interface ChargeFees {
  start_range: number;
  end_range: number;
  percent_fixed: number;
  is_cap: boolean;
}

export interface ICountry {
  guid: string
  country_name: string
  currency: string
  dial_code: string
  rates: object
  charge_fees: ChargeFees[]
  created_at: Date
  updated_at: Date
}

export interface IPayoutFeesTransferInput {
  sent_amount: number
  sent_currency: string
  payout_currency: string
}

export interface IPayoutFeesTransferOutput {
  payout_amount: number
  fees: number
  total_payment: number
}