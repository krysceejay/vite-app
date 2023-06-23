import { getData, postData } from "../utils/api";
import { IAddBeneficiary, IBeneficiary } from "./types/beneficiary-types";
import { PaginationOptions, PaginationResult } from "./types/shared-api-types";

export function getUserBeneficiaries({ page = 1, limit = 10, query = '' }: PaginationOptions): Promise<PaginationResult<IBeneficiary>> {
  return getData(`/beneficiaries?query=${query}&page=${page}&limit=${limit}`)
}

export function getUserBeneficiariesByCountry(country: string, { page = 1, limit = 10, query = '' }: PaginationOptions): Promise<PaginationResult<IBeneficiary>> {
  return getData(`/beneficiaries/country/${country}?query=${query}&page=${page}&limit=${limit}`)
}

export function addBeneficiary(input: IAddBeneficiary): Promise<IBeneficiary> {
  return postData('/beneficiaries', input)
}