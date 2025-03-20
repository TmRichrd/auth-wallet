export interface loginProps {
  msg: string
  address: string
  timestamp: number
  sign: string
  refer?: string
  chain: string
  invite_code?: string
}
export interface userInfoProps {
  token: string
  user_id: string
  invite_code: string
  invite_link: string
  parent_user_id: string
  name?: string
  avatar: string
  is_agent: boolean,
  bio?: string
  phone?:string
  email?:string
}