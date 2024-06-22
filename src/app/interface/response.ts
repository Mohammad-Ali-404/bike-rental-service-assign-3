export type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  token?: string
  data: T
}
