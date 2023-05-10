export interface ICreateUser {
  first_name: string
  last_name: string
  email: string
  password: string
  location: string
  phone_number: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IUser {
  guid: string
  first_name: string
  last_name: string
  email: string
  password: string
  location: string
  phone_number: string
  created_at: Date
  updated_at: Date
  role: string
  profile_image: string
  is_email_verified: boolean
  status: string
  verify_code: string
}

export interface ILoginResponse {
  msg: string
}

export interface ILogoutResponse {
  msg: string
}