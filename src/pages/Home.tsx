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
import './Home.css'

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
  const handleGetProvider = async (primaryWallet:any) => {
    const provider = await primaryWallet?.connector.getProvider()
    emitter.emit('setAddress', {
      info:{
        icon:primaryWallet?.connector.icon,
        name:primaryWallet?.connector.name,
        rdns:primaryWallet?.connector.id,
        uuid:primaryWallet?.connector.uid
      },
      provider:provider
    })

  }

  useEffect(() => {
    handleGetProvider(primaryWallet)
  }, [address, isConnected, primaryWallet])

  useEffect(() => {
    if (!isConnected) {
      emitter.emit('disconnect')
    }
  }, [isConnected])
  return (
    <div>
      {/* {contextHolder} */}
      <button onClick={() => setOpen(true)} className="home-button">
        Connect
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
