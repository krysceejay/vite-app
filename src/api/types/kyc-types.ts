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