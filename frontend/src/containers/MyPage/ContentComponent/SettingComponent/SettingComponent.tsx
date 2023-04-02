import React, { useEffect, useRef, useState } from 'react'
import { CommonLayout, SettingLayout } from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getUserInfoAPI } from 'api/setting'
import styles from './SettingComponent.module.css'
import { setUserInfo, userInfo } from 'reducers/settingReducer'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import { setAccessToken } from 'features/auth/authSlice'

import GoogleLogo from 'assets/google_logo.svg'
import NaverLogo from 'assets/naver_logo.svg'
import KakaoLogo from 'assets/kakao_logo.svg'
import EmailIcon from 'assets/email_icon.svg'

import { RiPencilFill } from 'react-icons/ri'

const SettingComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const info = useAppSelector(userInfo)

  const getUserInfo = async () => {
    const response = await dispatch(getUserInfoAPI()).unwrap()

    if (response.statusCode === 404) {
      navigate('/error')
    } else {
      dispatch(setUserInfo(response.data))
    }
  }

  const [alarmSelected, setAlarmSelected] = useState(info.subscribeActive)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <CommonLayout type='setting'>
      <div className={styles.layout}>
        <SettingLayout title={'계정 설정'}>
          <div className={styles.contentLayout}>
            <div className={styles.contentContainer}>
              <div className={styles.key}>로그인 계정</div>
              <div className={styles.emailContainer}>
                <img
                  src={
                    info.type === 'GOOGLE'
                      ? GoogleLogo
                      : info.type === 'NAVER'
                      ? NaverLogo
                      : KakaoLogo
                  }
                  className={styles.icon}
                ></img>
                <div className={styles.email}>{info.email}</div>
              </div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.key}>뉴스레터 수신 이메일 </div>
              <div className={styles.emailContainer}>
                <img src={EmailIcon} className={styles.icon}></img>
                <div className={styles.email}>
                  {info.subscribeEmail
                    ? info.subscribeEmail
                    : '등록된 이메일이 없습니다'}
                </div>
                {disabled ? (
                  <RiPencilFill
                    className={styles.editIcon}
                    onClick={() => {
                      alert('서비스 준비중입니다.')
                    }}
                  ></RiPencilFill>
                ) : (
                  <button className={styles.button}>인증</button>
                )}
              </div>
            </div>
            <div className={styles.contentContainer}>
              <div className={styles.key}>뉴스레터 알림</div>
              <div className={styles.alarmContainer}>
                <div
                  className={
                    !alarmSelected ? styles.alarmSelected : styles.alarm
                  }
                  onClick={() => {
                    setAlarmSelected(!alarmSelected)
                  }}
                >
                  수신거부
                </div>
                <div
                  className={
                    alarmSelected ? styles.alarmSelected : styles.alarm
                  }
                  onClick={() => {
                    setAlarmSelected(!alarmSelected)
                  }}
                >
                  이메일
                </div>
              </div>
            </div>
          </div>
        </SettingLayout>
        {/* <SettingLayout title={'화면 설정'}>
          <div></div>
        </SettingLayout> */}
        <div className={styles.buttonContainer}>
          <Button
            color={'white'}
            size={'mdShort'}
            text={'회원 탈퇴'}
            clickEvent={() => alert('서비스 준비중입니다.')}
          ></Button>
          <Button
            color={'white'}
            size={'mdShort'}
            text={'로그아웃'}
            clickEvent={() => {
              dispatch(setAccessToken(undefined))
              navigate('/')
            }}
          ></Button>
        </div>
      </div>
    </CommonLayout>
  )
}

export default SettingComponent
