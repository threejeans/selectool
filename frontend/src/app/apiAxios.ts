import baseAxios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  ACCESS_TOKEN,
  getAccessToken,
  REFRESH_TOKEN,
  saveAccessToken,
  saveRefreshToken,
} from './jwToken'

type CustomResponseFormat<T = any> = {
  response: T
  ACCESS_TOKEN?: string
  REFRESH_TOKEN?: string
}
interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>
  }
  getUri(config?: AxiosRequestConfig): string
  request<T>(config: AxiosRequestConfig): Promise<T>
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

export const baseURL = `${process.env.REACT_APP_API}/api`

const apiAxios: CustomInstance = baseAxios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiAxios.interceptors.request.use(request => {
  if (getAccessToken())
    apiAxios.defaults.headers.common['Authorization'] = getAccessToken()
  // if (process.env.NODE_ENV !== 'production') console.log(request)
  return request
})

apiAxios.interceptors.response.use(response => {
  if (response.headers[ACCESS_TOKEN] !== undefined)
    saveAccessToken(response.headers[ACCESS_TOKEN])
  if (response.headers[REFRESH_TOKEN] !== undefined)
    saveRefreshToken(response.headers[REFRESH_TOKEN])
  return response.data.response
})

export default apiAxios
