'use client'
import { Bounce, ToastContainer, toast } from 'react-toastify'
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

const Home = (props: any) => {
  const { address, isConnected } = useAccount()
  const { label, refcode, invite_code, state } = useCommonStore()
  const [primaryWallet] = useWallets()
  const { disconnect } = useDisconnect()
  const { setOpen } = useModal()
  const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
    return btoa(String.fromCharCode(...uint8Array))
  }
  emitter.on('logout', () => {
    disconnect()
  })
  emitter.on('open', () => {
    setOpen(true)
  })
  const errorMsg = (msg: any) => {
    toast(msg)
  }
  useEffect(() => {
    console.log(primaryWallet, 'primaryWallet')
    console.log(address, 'address')
    const signUserMessage = async () => {
      if (isConnected && address && state?.token === '') {
        emitter.emit('setAddress', address)
        try {
          const timestamp = Date.now()
          const msg = `Welcome: ${address}\nTimestamp: ${timestamp}`
          const walletClient = primaryWallet?.getWalletClient()
          if (walletClient) {
            try {
              const chain =
                primaryWallet?.connector.chainType == 'solana'
                  ? 'sol'
                  : primaryWallet?.connector.chainType
              let signature = ''
              if (chain == 'sol') {
                const encodedMessage = new TextEncoder().encode(msg)
                const data = await window.solana?.signMessage(
                  encodedMessage,
                  'utf8'
                )
                const signatureBase64 = uint8ArrayToBase64(data.signature)
                signature = signatureBase64
                console.log(signature, 'signature')
              } else {
                signature = await walletClient.signMessage({
                  message: msg,
                  account: address,
                })
              }
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
              const res = await login(params)
              if (res.code == 0) {
                emitter.emit('login', res.data)
                useCommonStore.setState({ state: res.data })
              } else {
                errorMsg(res.message)
              }
            } catch (error) {
              console.log(error, '1')
            }
          }
        } catch (error) {
          console.log(error)
          disconnect()
          emitter.emit('disconnect')
          errorMsg(error)
        }
      }
    }
    signUserMessage()
  }, [address, isConnected, primaryWallet])

  useEffect(() => {
    if (!isConnected) {
      emitter.emit('disconnect')
    }
  }, [isConnected])
  return (
    <div>
      {/* {contextHolder} */}
      <button onClick={() => setOpen(true)} className="login-btn">
        {label || ''}
      </button>
      {/* <ConnectButton label={label} /> */}
      {/* <div onClick={signUserMessage}>签名</div> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  )
}

export default Home
