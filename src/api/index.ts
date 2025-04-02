import { post } from "../utils/request"
import { loginProps } from "./types"

export const login = (data: loginProps) => {
  return post('/auth/login_with_sign', data)
}
export const login_csdn = (data: loginProps) => {
  return post('/auth/login_with_csdn_sign', data)
}