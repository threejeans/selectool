import apiAxios from 'app/apiAxios'
import { useAppDispatch } from 'app/hooks'
import axios, { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
const Auth = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  const { type } = useParams()
  const [cookies, setCookie] = useCookies()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function SimpleLogin() {
      const query = `/api/member/login/${type}?code=${code}`
      await apiAxios
        .get<AxiosResponse>(process.env.REACT_APP_API + query)
        .then(response => {
          console.log(response)
          const accessToken = response.headers['access-token']
          const refreshToken = response.headers['refresh-token']
          setCookie('access-token', accessToken)
          setCookie('refresh-token', refreshToken)
        })
        .catch(e => console.error(e))
    }
    SimpleLogin()
    navigate('/', { replace: true })
  }, [])

  return <div>인증중</div>
}

export default Auth
