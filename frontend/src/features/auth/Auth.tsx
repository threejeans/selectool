import apiAxios from 'app/apiAxios'
import { useAppDispatch } from 'app/hooks'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { setAccessToken } from './authSlice'

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  const { type } = useParams()
  const [cookies, setCookie] = useCookies()
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
      setCookie('refresh-token', refreshToken)
    }
    SimpleLogin()
    navigate('/', { replace: true })
  }, [])

  return <div>인증중</div>
}

export default Auth
