import { getData, postData } from "../utils/api"
import { PaginationOptions, PaginationResult } from "./types/shared-api-types"
import { ICreatTransfer, ITransfer, ITransferSumSent } from "./types/transfer-types"

export function getUserTransfers({ page = 1, limit = 10 }: PaginationOptions): Promise<PaginationResult<ITransfer>> {
  return getData(`/transfers?page=${page}&limit=${limit}`)
}

export function getUserTransfersSumSent(): Promise<number> {
  return getData('/transfers/sent-amount')
}

export function getUserTransfer(guid?: string): Promise<ITransfer> {
  return getData(`/transfers/${guid}`)
}

export function createTransfer(input: ICreatTransfer): Promise<ITransfer> {
  return postData('/transfers', input)
}