import { getData, getDataNoCred, postData, uploadFile } from "../utils/api";
import { IAddKyc, IKyc, ISmileUpload } from "./types/kyc-types";

export function addKycFile(input: IAddKyc): Promise<IKyc> {
  return uploadFile('/kyc', input)
}

export function getUserKyc(): Promise<IKyc[]> {
  return getData('/kyc')
}

export function checkUserKycVerified(): Promise<boolean> {
  return getData('/kyc/check/verified')
}

export function getSmileService() {
  return getDataNoCred('https://api.smileidentity.com/v1/services')
}

export function uploadSmileId(input: ISmileUpload): Promise<IKyc> {
  return postData('/kyc/smile', input)
}