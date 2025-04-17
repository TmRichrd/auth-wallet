import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routes, { RouterType } from './routers' // Import your route configuration
import React from 'react'
import { ParticleConnectkit } from './components/connectkit'
import { ParticleAuthkit } from "./components/AuthKit";
function App() {
  // 由于路由组件是懒加载的，渲染页面可能会有延迟，使用Suspense 可优化交互
  const RouteEleMent = (route: RouterType): React.ReactNode => {
    if (!route.component) {
      return null
    }
    return (
      <Suspense>
        <route.component />
      </Suspense>
    )
  }
  // 通过每个路由对象渲染Route
  const RouteItem = (route: RouterType) => {
    return (
      <Route key={route.name} element={RouteEleMent(route)} path={route.path}>
        {RouteList(route.children ?? [])}
      </Route>
    )
  }
  // 根据配置的routeconfig 生成Route
  const RouteList = (list: RouterType[]) => {
    return list.map((item) => RouteItem(item))
  }

  return (
    <div className="App">
      <BrowserRouter
        basename={'/'}
      >
        <ParticleConnectkit>
          <Routes>
            {/* 重定向 */}
            {/* <Route path="/" element={<Navigate to="/home" />} /> */}
            {RouteList(routes)}
          </Routes>
        </ParticleConnectkit>
      </BrowserRouter>
    </div>
  )
}

export default App
