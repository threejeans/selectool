import apiAxios from 'app/apiAxios'
import { useAppDispatch } from 'app/hooks'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { getCookie, setCookie } from 'util/cookie'
import { setAccessToken } from './authSlice'

import styles from 'styles/pages/auth/Auth.module.css'

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  const { type } = useParams()
  // const [cookies, setCookie] = useCookies() // 커스텀 쿠키 셋
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const JWT_EXPIRY_TIME = 24 * 3600 * 1000 // 만료 시간 (24시간 밀리 초로 표현)

  async function RefreshLogin() {
    const token = getCookie('refresh-token')

    const response = await apiAxios.get<AxiosResponse>(
      process.env.REACT_APP_API + '/api/member/refresh',
      {
        params: { refreshToken: token },
      },
    )
    console.log(response)

    const accessToken = response.headers['access-token']
    const refreshToken = response.headers['refresh-token']

    dispatch(setAccessToken(accessToken))

    if (refreshToken !== undefined) {
      setCookie('refresh-token', refreshToken)
    }
  }

  useEffect(() => {
    async function SimpleLogin() {
      const query = `/api/member/login/${type}?code=${code}`
      const response = await apiAxios.get<AxiosResponse>(
        process.env.REACT_APP_API + query,
      )
      const accessToken = response.headers['access-token']
      const refreshToken = response.headers['refresh-token']
      dispatch(setAccessToken(accessToken))
      if (refreshToken !== undefined) {
        setCookie('refresh-token', refreshToken, { sameSite: 'strict' })
        // accessToken 만료하기 1분 전에 로그인 연장
        setTimeout(RefreshLogin, JWT_EXPIRY_TIME - 60000)
      }
    }
    SimpleLogin()
    navigate('/', { replace: true })
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.loader} />
    </div>
  )
}

export default Auth
