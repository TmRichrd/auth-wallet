import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@unocss/reset/tailwind-compat.css'
import { Buffer } from 'buffer';
import microApp from '@micro-zoe/micro-app'

window.Buffer = Buffer;
microApp.start()

function render() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return root
}

render()
