'use client'

import {
  ConnectButton,
  useAccount,
  useWallets,
  useDisconnect,
  useModal,
} from '@particle-network/connectkit'
import useCommonStore from '../store/common'
import { useEffect } from 'react'
import { loginProps, userInfoProps } from '../api/types'
import { login } from '../api'
import emitter from '../utils/eventBus'

const Detail = (props: any) => {
  const { address, isConnected, chainId } = useAccount()
  const { label, refcode, invite_code, state } = useCommonStore()
  const [primaryWallet] = useWallets()
  const { disconnect } = useDisconnect()
  const { setOpen } = useModal()
  emitter.on('logout', () => {
    disconnect()
  })
  emitter.on('open', () => {
    setOpen(true)
  })
  useEffect(() => {
    console.log(state,'state')
    const signUserMessage = async () => {
      console.log(isConnected && address && state?.token ==='','isConnected && address && state?.token ===')
      if (isConnected && address && state?.token ==='') {
        emitter.emit('setAddress', address)
        try {
          const timestamp = Date.now()
          const msg = `Welcome: ${address}\nTimestamp: ${timestamp}`
          console.log(primaryWallet.connector)
          const walletClient = primaryWallet?.getWalletClient()
          console.log(walletClient, 'walletClient')
          const signature = await walletClient.signMessage({
            message: msg,
            account: address,
          })
          const chain =
            primaryWallet?.connector.chainType == 'solana'
              ? 'sol'
              : primaryWallet?.connector.chainType
          console.log('签名成功:', signature)
          // 构建登录请求参数
          let params: loginProps = {
            msg: msg,
            sign: signature,
            timestamp: timestamp,
            address: address || '',
            refer: refcode || '',
            chain,
            invite_code: invite_code || '',
          }
          // const res = await login(params)
          const res: {
            code: number
            data: userInfoProps
          } = {
            code: 0,
            data: {
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMUpQNzY3WUYwRThXUkJLQzhBQ1cxRjQxUyIsImxvYyI6Img1IiwiZXhwIjoxNzQxODUxODA0fQ.zontrwTSB0j2f807vqtUtFAit3Ah9D9PTM0G_b5wsI0',
              user_id: '01JP767YF0E8WRBKC8ACW1F41S',
              invite_code: '6174708',
              invite_link: 'https://news.dorylus.chat/6174708',
              parent_user_id: '',
              avatar:
                'https://thirdwx.qlogo.cn/mmopen/vi_32/Z85K2bFgtGuKqGKzYZQXu4ZwFIIbPY2c04tmhwe9f1wFlUEavwW9DsMCl5cQofnA5LP0icqKtIcicmg1wf2GaDR9guwztpc3ib0AjnUeZ9YqFg/132',
              is_agent: false,
              name: '古垣丶',
              // exp: 1741851804,
            },
          }
          emitter.emit('login', res.data)
          useCommonStore.setState({ state: res.data })
        } catch (error) {
          console.error('签名失败:', error)
        }
      }
    }
    signUserMessage()
  }, [address, isConnected, primaryWallet])

  return (
    <div onClick={() => setOpen(true)}>
      <button className="login-btn">{label || ''}</button>
      {/* <ConnectButton label={label} /> */}
      {/* <div onClick={signUserMessage}>签名</div> */}
    </div>
  )
}

export default Detail
