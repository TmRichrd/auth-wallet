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
    path: '/agent-list',
    name: 'AgentList',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/launch',
    name: 'Launch',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/token/:id',
    name: 'Token',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/my-agents',
    name: 'MyAgents',
    component: lazy(() => import('./pages/Home')),

  },
]
export default routes
