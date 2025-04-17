'use client'
import { Bounce, ToastContainer } from 'react-toastify'
import {
  useAccount,
  useWallets,
  useDisconnect,
  useModal,
} from '@particle-network/connectkit'
import { useEffect, useState } from 'react'
import emitter from '../utils/eventBus'
import './Home.css'

const Home = (props: any) => {
  const [type, setType] = useState(0)
  const [ethconnectAddress, setEthconnectAddress] = useState('')
  const { address, isConnected } = useAccount()
  const [primaryWallet] = useWallets()
  const { disconnect } = useDisconnect()
  const { setOpen, isOpen } = useModal()

  emitter.on('logout', () => {
    disconnect()
  })
  emitter.on('open', () => {
    setOpen(true)
  })
  const handleGetProvider = async (primaryWallet: any) => {
    const provider = await primaryWallet?.connector.getProvider()
    window.microApp.dispatch({
      info: {
        icon: primaryWallet?.connector.icon,
        name: primaryWallet?.connector.name,
        rdns: primaryWallet?.connector.id,
        uuid: primaryWallet?.connector.uid,
      },
      provider: provider,
    })
    setEthconnectAddress(primaryWallet?.accounts[0])
  }

  useEffect(() => {
    handleGetProvider(primaryWallet)
  }, [address, isConnected, primaryWallet])
  useEffect(() => {
    window.microApp?.addDataListener((data) => {
      if (data.ethereum) {
        console.log('收到 MetaMask 对象:', data.ethereum)
        window.ethereum = data.ethereum
      }
    }, true)
  }, [])
  useEffect(() => {
    const handler = (data: any) => {
      if (data.type) {
        setType(data.type);
        setOpen(true);
      }
    };

    window.microApp?.addGlobalDataListener(handler, true);

    return () => {
      window.microApp?.removeGlobalDataListener(handler);
    };
  }, []);

  // 监听弹窗关闭
  useEffect(() => {
    if (!isOpen) { // 假设 useModal 也提供了 isOpen 状态
      setType(0); // 重置 type
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isConnected) {
      console.log(222);
      
      window.microApp.dispatch({ disconnect: true })
    }
  }, [isConnected])
  return (
    <div>
      <button onClick={() => setOpen(true)} className="home-button">
        {ethconnectAddress ? ethconnectAddress : 'Connect'}
      </button>
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
