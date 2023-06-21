import { getData } from "../utils/api";
import { ICountry, IPayoutFeesTransferInput, IPayoutFeesTransferOutput } from "./types/country-types";

export function getAllCountries(): Promise<ICountry[]> {
  return getData('/countries')
}

export function getCountryByCurrency(currency: string): Promise<ICountry> {
  return getData(`/countries/country/${currency}`)
}

export function getPayoutFeesAndTotal({ sent_amount, sent_currency, payout_currency }: IPayoutFeesTransferInput): Promise<IPayoutFeesTransferOutput> {
  if(sent_amount <= 0){
    return Promise.resolve({
      payout_amount: 0,
      fees: 0,
      total_payment: 0
    })
  }
  return getData(`/countries/transfer-details?sent_amount=${sent_amount}&sent_currency=${sent_currency}&payout_currency=${payout_currency}`)
}