import { getCookie, setCookie } from 'util/cookie'

export const ACCESS_TOKEN = 'access-token'
export const REFRESH_TOKEN = 'refresh-token'

export const getAccessToken = () => {
  return getCookie(ACCESS_TOKEN)
}

export const getRefreshToken = () => {
  return getCookie(REFRESH_TOKEN)
}

export const saveAccessToken = (accessToken: string) => {
  console.log('saved access token from jwtoken.ts')
  setCookie(ACCESS_TOKEN, accessToken, {
    path: '/',
    secure: true,
    sameSite: 'none',
  })
} // 메모리 저장으로 변경할 수 있음

export const saveRefreshToken = (refreshToken: string) => {
  console.log('saved refresh token from jwtoken.ts')
  setCookie(REFRESH_TOKEN, refreshToken, {
    path: '/',
    secure: true,
    sameSite: 'none',
  })
}
