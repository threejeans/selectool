import React, { useEffect } from 'react'
import { Sidebar } from '../CommonComponent'
import styles from './MyPageMain.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectContent,
  setSelectContent,
  setUserInfo,
} from 'reducers/settingReducer'
import {
  GuideScrapContent,
  SelfScrapContent,
  SettingComponent,
  WithScrapContent,
} from '../ContentComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { getCookie } from 'util/cookie'
import apiAxios from 'app/apiAxios'
import {
  loginModalOpen,
  selectAccessToken,
  setAccessToken,
} from 'features/auth/authSlice'
import { getUserInfoAPI } from 'api/setting'

const MyPageMain = () => {
  const content = useAppSelector(selectContent)
  const navigate = useNavigate()
  const isLogon = useAppSelector(selectAccessToken)

  const { status } = useParams()
  const dispatch = useAppDispatch()

  if (status === 'setting') {
    dispatch(setSelectContent('설정'))
  }

  const getUserInfo = async () => {
    const refreshToken = getCookie('refresh-token')

    async function RefreshLogin() {
      await apiAxios
        .get(process.env.REACT_APP_API + '/api/member/refresh', {
          params: { refreshToken: refreshToken },
        })
        .then(async res => {
          const accessToken = res.data.accessToken
          dispatch(setAccessToken(accessToken))

          const response = await dispatch(getUserInfoAPI()).unwrap()

          if (response.statusCode === 404) {
            navigate('/error')
          } else {
            dispatch(setUserInfo(response.data))
          }
        })
        .catch(err => {
          dispatch(loginModalOpen())
          navigate('/', { replace: true })
        })
    }

    if (status === 'setting' && !isLogon) {
      RefreshLogin()
    } else {
      const response = await dispatch(getUserInfoAPI()).unwrap()

      if (response.statusCode === 404) {
        navigate('/error')
      } else {
        dispatch(setUserInfo(response.data))
      }
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar />
      {(() => {
        switch (content) {
          case '혼자써요':
            return <SelfScrapContent />
          case '함께써요':
            return <WithScrapContent />
          case '가이드':
            return <GuideScrapContent />
          default:
            return <SettingComponent />
        }
      })()}
    </div>
  )
}

export default MyPageMain
