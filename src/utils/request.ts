import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

interface ResponseData<T> {
  code: number
  data: T
  message: string
}

const service: AxiosInstance = axios.create({
  baseURL: '/apis',
  timeout: 60000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Token'] = ''
    config.headers['x-app'] = `0xbot studio`
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    return res
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export function get<T = any>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return service.get(url, { params, ...config })
}

export function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
  return service.post(url, data, { ...config })
}

export default service
