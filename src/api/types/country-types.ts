import { ICurrency } from "./currency-types";

export interface ChargeFees {
  start_range: number;
  end_range: number;
  percent_fixed: number;
  is_cap: boolean;
}

export interface ICountry {
  guid: string
  country_name: string
  currency: ICurrency
  dial_code: string
  charge_fees: ChargeFees[]
  send_payment_method: string[]
  receive_payment_method: string[]
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