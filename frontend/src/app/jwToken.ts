import { useCookies } from 'react-cookie'

export const ACCESS_TOKEN = 'access-token'
export const REFRESH_TOKEN = 'refresh-token'

export const getAccessToken = () => {
  const value = document.cookie.match(
    '(^|;) ?' + ACCESS_TOKEN + '=([^;]*)(;|$)',
  )
  return value ? value[2] : null
  //   const [cookie] = useCookies([ACCESS_TOKEN])
  //   return cookie[ACCESS_TOKEN]
}

export const getRefreshToken = () => {
  const value = document.cookie.match(
    '(^|;) ?' + REFRESH_TOKEN + '=([^;]*)(;|$)',
  )
  return value ? value[2] : null
  //   const [cookie] = useCookies([REFRESH_TOKEN])
  //   return cookie[REFRESH_TOKEN]
}

export const saveAccessToken = (accessToken: string) => {
  const [, setCookie] = useCookies([ACCESS_TOKEN])
  setCookie(ACCESS_TOKEN, accessToken)
}

export const saveRefreshToken = (refreshToken: string) => {
  const [, setCookie] = useCookies([REFRESH_TOKEN])
  setCookie(REFRESH_TOKEN, refreshToken)
}

export const deleteToken = () => {
  const [, , removeToken] = useCookies()
  removeToken(ACCESS_TOKEN)
  removeToken(REFRESH_TOKEN)
}
