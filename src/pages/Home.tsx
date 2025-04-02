'use client'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import {
  ConnectButton,
  useAccount,
  useWallets,
  useDisconnect,
  useModal,
  SolanaChain,
} from '@particle-network/connectkit'
import useCommonStore from '../store/common'
import { useEffect } from 'react'
import { loginProps, userInfoProps } from '../api/types'
import { login,login_csdn } from '../api'
import emitter from '../utils/eventBus'
import User from "../assets/user.svg"

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
  function mockEvmSignature(message: string): string {
    const fixedPart = "4e1cb74e5b127d4f3a72e4b5a3a8e1d2f3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2";
    const recoveryId = Math.random() > 0.5 ? "1b" : "1c";
    return `0x${fixedPart.slice(0, 128)}${recoveryId}`;
  }
  function mockSolanaSignature(message: string): string {
    const randomBytes = Array.from({length: 64}, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');
    return `simulated_${randomBytes.slice(0, 32)}...${randomBytes.slice(-8)}`;
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
                signature = mockSolanaSignature(msg)
                // const encodedMessage = new TextEncoder().encode(msg)
                // const solanaWallet = primaryWallet.getWalletClient<SolanaChain>();
                // const data = await solanaWallet?.signMessage(encodedMessage)
                // signature= uint8ArrayToBase64(data.signature)
              } else {
                signature = mockEvmSignature(msg)
                // signature = await walletClient.signMessage({
                //   message: msg,
                //   account: address,
                // })
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
              const res = await login_csdn(params)
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
      <button onClick={() => setOpen(true)} className="wh-10 rounded bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center cursor-pointer">
        {/* {label || ''} */}
        <img src={User} className='wh-6'/>
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
