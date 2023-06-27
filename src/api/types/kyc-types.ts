import { IUser } from "./user-types"

export interface IAddKyc {
  document_name: string
  title: string
  file: File | null
}

export interface IKyc {
  guid: string
  document_name: string
  title: string
  file: string
  status: string
  user_guid: string
  created_at: Date
  updated_at: Date
  user: IUser
}

export interface PartnerParams {
  libraryVersion: string,
  permissionGranted: boolean, // expected to be `true`
}
export interface Images {
  file?: string
  image_type_id: number, // as recommended here: https://docs.smileidentity.com/products/core-libraries#images-required
  image: string // base64 encoded string of image
}
export interface ISmileUpload {
  partner_params: PartnerParams
  images: Images[]
  country: string
  title: string
}
// export interface IExtraIdInput {
//   country: string
//   title: string
// }