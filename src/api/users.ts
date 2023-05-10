import { getData, postData } from "../utils/api"
import { ICreateUser, ILogin, ILoginResponse, ILogoutResponse, IUser } from "./types/user-types"

export function createUser(input: ICreateUser): Promise<IUser> {
  return postData('/users', input)
}

export function signIn(input: ILogin): Promise<ILoginResponse> {
  return postData('/auth/login', input)
}

export function currentUser(controller?: AbortController): Promise<IUser> {
  return getData('/auth/profile', controller)
}

export function signOut(): Promise<ILogoutResponse> {
  return postData('/auth/logout', {})
}