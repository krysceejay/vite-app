import { ITransfer } from "./transfer-types"

export interface IPayment {
    guid: string
    transfer_guid: string
    payment_gateway: string
    payment_method: string
    payment_gateway_ref: string
    payment_gateway_status: string
    total_payment: number
    currency: string
    bank_name: string
    bank_account_number: string
    account_name: string
    m_money_carrier: string
    m_money_phone: string
    web_hook_event: string
    merchant_currency: string
    merchant_amount: string
    payment_time: Date
    transfer: ITransfer
    created_at: Date
    updated_at: Date
  }