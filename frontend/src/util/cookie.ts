import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: any) => {
  console.log('cookies.ts', cookies)
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}
