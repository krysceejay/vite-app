import { MethodName } from "./payment-method-types"

export enum TransferStatus {
  PAID_OUT = "paid out",
  PAYMENT_PENDING = "payment pending",
  PAYMENT_RECEIVED = "payment received",
  PAYOUT_INPROGRESS = "payout in progress",
}

export interface ITransfer {
  guid: string
  transfer_id: string
  sent_amount: number
  payout_amount: number
  sent_currency: string
  payout_currency: string
  fees: number
  total_payment: number
  status: TransferStatus
  user_guid: string
  payment_method: MethodName
  delivery_method: MethodName
  transfer_purpose: string
  beneficiary_name: string
  beneficiary_send_number: string
  beneficiary_service: string
  beneficiary_country: string
  rate: number
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
  transfer_purpose?: string
  beneficiary_name: string
  beneficiary_send_number: string
  beneficiary_service: string
  beneficiary_country: string
  delivery_method: string
  payment_method: string
  payout_country_name: string
}
export interface IUpdateTransfer {
  transfer_purpose: string
}