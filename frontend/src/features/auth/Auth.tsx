import apiAxios from 'app/apiAxios'
import { useAppDispatch } from 'app/hooks'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { setCookie } from 'util/cookie'
import { setAccessToken } from './authSlice'

import styles from 'styles/pages/auth/Auth.module.css'

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  const { type } = useParams()
  // const [cookies, setCookie] = useCookies() // 커스텀 쿠키 셋
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function SimpleLogin() {
      const query = `/api/member/login/${type}?code=${code}`
      const response = await apiAxios.get<AxiosResponse>(
        process.env.REACT_APP_API + query,
      )
      console.log(response.headers)
      const accessToken = response.headers['access-token']
      const refreshToken = response.headers['refresh-token']
      dispatch(setAccessToken(accessToken))
      if (refreshToken !== undefined) setCookie('refresh-token', refreshToken)
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
