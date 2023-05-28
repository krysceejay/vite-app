import { getData, postData, uploadFile } from "../utils/api";
import { IAddKyc, IKyc } from "./types/kyc-types";

export function addKycFile(input: IAddKyc): Promise<IKyc> {
  return uploadFile('/kyc', input)
}

export function getUserKyc(): Promise<IKyc[]> {
  return getData('/kyc')
}