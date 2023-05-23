export interface ITransfer {
  guid: string
  transfer_id: string
  sent_amount: number
  payout_amount: number
  sent_currency: string
  payout_currency: string
  fees: number
  total_payment: number
  status: string
  user_guid: string
  payment_method: string
  delivery_method: string
  transfer_purpose: string
  beneficiary_name: string
  beneficiary_send_number: string
  beneficiary_service: string
  beneficiary_country: string
  created_at: Date
  updated_at: Date
}

export interface ITransferSumSent {
  sum: number | null
}

export interface ICreatTransfer {
  sent_amount: number
  sent_currency: string
  payout_currency: string
  transfer_purpose: string
  beneficiary_name: string
  beneficiary_send_number: string
  beneficiary_service: string
  beneficiary_country: string
  delivery_method: string
  payment_method: string
}