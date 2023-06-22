export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface PaginationResult<T> {
  page: number
  pages: number
  limit: number
  total?: number
  data: T[]
}

export interface PaginationOptions {
  page?: number
  limit?: number
  query?: string
}
