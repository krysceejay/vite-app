import { getData, postData } from "../utils/api";
import { IAddBeneficiary, IBeneficiary } from "./types/beneficiary-types";
import { PaginationOptions, PaginationResult } from "./types/shared-api-types";

export function getUserBeneficiaries({ page = 1, limit = 10 }: PaginationOptions): Promise<PaginationResult<IBeneficiary>> {
  return getData(`/beneficiaries?page=${page}&limit=${limit}`)
}

export function getUserBeneficiariesByCurrency(currency: string, { page = 1, limit = 10 }: PaginationOptions): Promise<PaginationResult<IBeneficiary>> {
  return getData(`/beneficiaries/currency/${currency}?page=${page}&limit=${limit}`)
}

export function addBeneficiary(input: IAddBeneficiary): Promise<IBeneficiary> {
  return postData('/beneficiaries', input)
}