// import './public-path';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@unocss/reset/tailwind-compat.css'
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from 'vite-plugin-qiankun/dist/helper'
import useCommonStore from './store/common.ts'
import emitter from './utils/eventBus.ts'
import { userInfoProps } from './api/types.ts'
import { Buffer } from 'buffer';
window.Buffer = Buffer;
let root: ReactDOM.Root | null = null

function render(props: QiankunProps) {
  const { container } = props
  const root = ReactDOM.createRoot(
    (container
      ? container.querySelector('#root')
      : document.getElementById('root')) as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return root
}

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      useCommonStore.setState({ label: props.sharedData.label })
      props.onGlobalStateChange?.((state:any) => {
        useCommonStore.setState({label:state.sharedData.label})
        useCommonStore.setState({refcode:state.sharedData.refcode})
        useCommonStore.setState({invite_code:state.sharedData.invite_code})
        useCommonStore.setState({state:state.state})
        if(state.isLoggedIn){
          emitter.emit('logout')
        }
        if(state.open){
          emitter.emit('open')
        }
      }, true)
      emitter.on('login', (data:userInfoProps) => {
        props.sendMessage(data)
      });
      emitter.on('disconnect', () => {
        props.disconnect()
      });
      emitter.on('setAddress', (data:string) => {
        props.sendAddress(data)
      });
      root = render(props)
    },
    bootstrap() {
      console.log('bootstrap')
    },
    unmount(props) {
      root?.unmount()
    },
    update(props) {},
  })
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  root = render({})
} else {
  initQianKun()
}
