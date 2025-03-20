import { LazyExoticComponent, ComponentType, lazy } from 'react'

export interface RouterType {
  path: string
  name: string
  component?: LazyExoticComponent<ComponentType<any>>
  children?: RouterType[]
}

const routes: RouterType[] = [
  {
    path: '/',
    name: 'Home',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/blogdetail',
    name: 'BlogDetail',
    component: lazy(() => import('./pages/Home')),

  },
]
export default routes
