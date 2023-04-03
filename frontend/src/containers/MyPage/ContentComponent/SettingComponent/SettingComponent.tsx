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
import { AiFillSound, AiOutlineWarning } from 'react-icons/ai'

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
  const [editable, setEditable] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSendValidTest, setIsSendValidTest] = useState(false)
  const [validatingEmail, setValidatingEmail] = useState('')

  // email 유효성 검사
  const validateEmail = (email: string) => {
    // 공백 제거
    const removeRegex = /\s/g
    const updateEmail = email.replace(removeRegex, '')

    // 유효성 검사
    const regex =
      // eslint-disable-next-line no-useless-escape
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    return regex.test(updateEmail)
  }

  const certificationEvent = () => {
    const isValidateEmail = validateEmail(subscribeEmail)
    if (!isValidateEmail) {
      setIsEmailValid(false)
    } else {
      setIsEmailValid(true)
      setValidatingEmail(subscribeEmail)
      // TODO : 이메일 인증 보내기
      setIsSendValidTest(true)
    }
  }

  if (isSendValidTest && subscribeEmail !== validatingEmail) {
    setValidatingEmail('')
    setIsSendValidTest(false)
  }

  const certificationCompleteEvent = () => {
    // TODO : 인증 완료 되었는지 확인
    alert('서비스 준비중입니다.')
  }

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
              <div
                className={`${styles.emailContainer} ${
                  !isEmailValid || isSendValidTest
                    ? styles.emailContainerExpand
                    : ''
                }`}
              >
                {!editable ? (
                  <>
                    <img src={EmailIcon} className={styles.icon}></img>
                    <div className={styles.email}>
                      {info.subscribeEmail
                        ? info.subscribeEmail
                        : '등록된 이메일이 없습니다'}
                    </div>
                    <RiPencilFill
                      className={styles.editIcon}
                      onClick={() => {
                        setEditable(true)
                      }}
                    ></RiPencilFill>
                  </>
                ) : (
                  <>
                    <div className={styles.inputContainer}>
                      <input
                        className={`${styles.input} ${
                          !isEmailValid || isSendValidTest
                            ? styles.inputNotValid
                            : ''
                        } ${isSendValidTest ? styles.inputSendValid : ''}`}
                        value={subscribeEmail}
                        onChange={ev => setSubscribeEmail(ev.target.value)}
                      ></input>
                      <span className={styles.highlight}></span>
                      <span
                        className={`${styles.bar} ${
                          isEmailValid ? '' : styles.barNotValid
                        }`}
                      ></span>
                      {!isEmailValid ? (
                        <div className={styles.warningText}>
                          <AiOutlineWarning></AiOutlineWarning>
                          이메일 형식이 올바르지 않습니다. 다시 확인해주세요.
                        </div>
                      ) : (
                        ''
                      )}
                      {isSendValidTest ? (
                        <div className={styles.warningText}>
                          <AiFillSound></AiFillSound>
                          이메일 인증 완료 후 인증 완료 버튼을 눌러주세요!
                        </div>
                      ) : (
                        ''
                      )}
                    </div>

                    <button
                      className={
                        isSendValidTest ? styles.buttonExpand : styles.button
                      }
                      onClick={
                        isSendValidTest
                          ? certificationCompleteEvent
                          : certificationEvent
                      }
                    >
                      {isSendValidTest ? '인증 완료' : '인증'}
                    </button>
                  </>
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
