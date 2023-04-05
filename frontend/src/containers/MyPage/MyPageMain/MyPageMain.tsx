import React, { useEffect } from 'react'
import { Sidebar } from '../CommonComponent'
import styles from './MyPageMain.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContent, setSelectContent } from 'reducers/settingReducer'
import {
  GuideScrapContent,
  SelfScrapContent,
  SettingComponent,
  WithScrapContent,
} from '../ContentComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'

const MyPageMain = () => {
  const content = useAppSelector(selectContent)
  const isLogon = useAppSelector(selectAccessToken)
  const navigate = useNavigate()

  const { status } = useParams()
  const dispatch = useAppDispatch()

  if (status === 'setting') {
    dispatch(setSelectContent('설정'))
    if (!isLogon) {
      dispatch(loginModalOpen())
      navigate('/')
    }
  }

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
