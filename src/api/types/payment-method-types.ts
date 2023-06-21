export enum MethodName {
  BANK_TRANSFER = "Bank Transfer",
  MOBILE_MONEY = "Mobile Money",
}
export interface IPaymentMethod {
  guid: string
  name: MethodName
  created_at: Date
  updated_at: Date
}