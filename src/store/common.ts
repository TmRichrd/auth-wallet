import { create } from 'zustand'
import { userInfoProps } from '../api/types'

interface CounterState {
  label: string
  refcode: string
  invite_code: string
  setLabel: (data: string) => void
  setRefcode: (data: string) => void
  setInviteCode: (data: string) => void
  state:userInfoProps
  setState: (data: userInfoProps) => void
}

const useCommonStore = create<CounterState>((set) => ({
  label: '',
  refcode: '',
  invite_code: '',
  state:{
    token: '',
    user_id: '',
    invite_code: '',
    invite_link: '',
    parent_user_id: '',
    avatar: '',
    name: undefined,
    is_agent: false,
    bio: '',
    phone: '',
    email: '',
  },
  setLabel: (data: string) => set(() => ({ label: data })),
  setRefcode: (data: string) => set(() => ({ refcode: data })),
  setInviteCode: (data: string) => set(() => ({ invite_code: data })),
  setState: (data: userInfoProps) => set(() => ({ state: data })),
}))

export default useCommonStore
