export type TNewTransfer = {
  sentAmount: string
  sentCurrency: string
  payoutCurrency: string
  paymentMethod: string
  rate: string
  beneficiaryName: string
  beneficiarySendNumber: string
  beneficiaryService: string
  beneficiaryCountry: string
  deliveryMethod: string
  transferPurpose: string
  isModalOpen: boolean
}

export type IPageState = {
  page: number
  limit: number
}

export type TSelectBeneficiary = {
  name: string
  sendNumber: string
  service: string
  deliveryMethod: string
  countryName: string
}

export type TAddBeneficiaryInput = {
  bfullName: string
  bsendNumber: string
  service: string
  bdeliveryMethod: string
  countryName: string
  countryCurrency: string
}

export type TPaymentMethod = {
  key: string
  value: string
  opt: string
}

export type TCountry = {
  key: string
  value: string
  opt: string
}