import React, { useEffect, useState } from 'react'
import {
  CommonLayout,
  SettingLayout,
  WarningModal,
} from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { editUserInfoAPI, userEmailAuthorizeAPI } from 'api/setting'
import styles from './SettingComponent.module.css'
import {
  changeWithDrawModalStatus,
  setUserInfo,
  userInfo,
} from 'reducers/settingReducer'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import { setAccessToken } from 'features/auth/authSlice'

import GoogleLogo from 'assets/google_logo.svg'
import NaverLogo from 'assets/naver_logo.svg'
import KakaoLogo from 'assets/kakao_logo.svg'
import EmailIcon from 'assets/email_icon.svg'

import { RiPencilFill } from 'react-icons/ri'
import { AiFillSound, AiOutlineWarning } from 'react-icons/ai'
import { removeCookie } from 'util/cookie'

const SettingComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const info = useAppSelector(userInfo)

  const [editable, setEditable] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState(
    info.subscribeEmail ? info.subscribeEmail : '',
  )
  const [validatingEmail, setValidatingEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSendValidTest, setIsSendValidTest] = useState(false)
  const [alarmWarning, setAlarmWarning] = useState(false)
  const [isValidTime, setIsValidTime] = useState(true)

  if (subscribeEmail !== validatingEmail && isSendValidTest) {
    setValidatingEmail('')
    setIsSendValidTest(false)
  }

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

  const certificationEvent = async () => {
    const isValidateEmail = validateEmail(subscribeEmail)
    if (!isValidateEmail) {
      setIsEmailValid(false)
    } else {
      setIsEmailValid(true)
      setValidatingEmail(subscribeEmail)

      const response = await dispatch(
        userEmailAuthorizeAPI(subscribeEmail),
      ).unwrap()

      if (response === 200 || response === 201) {
        setIsSendValidTest(true)
        const newInfo = { ...info }
        newInfo.emailVerified = false
        dispatch(setUserInfo(newInfo))
        const now = new Date()
        const outTime = new Date(
          now.setMinutes(now.getMinutes() + 10),
        ).toString()
        localStorage.setItem('verifyingEmail', subscribeEmail)
        localStorage.setItem('verifyingTime', outTime)
      } else {
        console.log(response)
      }
    }
  }

  // 뉴스레터 알림 여부 - 수신허용
  const alarmEvent = async () => {
    if (!info.subscribeEmail || !info.emailVerified) {
      setAlarmWarning(true)
    } else {
      const response = await dispatch(
        editUserInfoAPI({ subscribeActive: true }),
      ).unwrap()

      if (response === 200 || response === 201) {
        console.log(response)
        const newUserInfo = { ...info }
        newUserInfo.subscribeActive = true
        dispatch(setUserInfo(newUserInfo))
      } else {
        console.log(response)
      }
    }
  }

  // 뉴스레터 알림 여부 - 수신거부
  const noAlarmEvent = async () => {
    const response = await dispatch(
      editUserInfoAPI({ subscribeActive: false }),
    ).unwrap()

    if (response === 200 || response === 201) {
      const newUserInfo = { ...info }
      newUserInfo.subscribeActive = false
      dispatch(setUserInfo(newUserInfo))
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    if (info.subscribeEmail && !info.emailVerified) {
      setEditable(true)
      setIsSendValidTest(true)
      setValidatingEmail(info.subscribeEmail)

      const now = new Date()
      const verifyingTime = localStorage.getItem('verifyingTime')
        ? localStorage.getItem('verifyingTime')
        : ''

      if (
        info.subscribeEmail === localStorage.getItem('verifyingEmail') &&
        verifyingTime &&
        new Date(verifyingTime) <= now
      ) {
        setIsValidTime(false)
      }

      if (!verifyingTime) {
        setIsValidTime(false)
      }
    }
  }, [])

  return (
    <>
      <WarningModal />
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
              {info.subscribeEmail ? (
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
                            } ${
                              isSendValidTest && isValidTime
                                ? styles.inputSendValid
                                : ''
                            }`}
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
                              &nbsp;이메일 형식이 올바르지 않습니다. 다시
                              확인해주세요.
                            </div>
                          ) : (
                            ''
                          )}
                          {isSendValidTest ? (
                            <div className={styles.warningText}>
                              <AiFillSound></AiFillSound>&nbsp;
                              {isValidTime
                                ? '10분 내로 메일 인증을 완료해주세요!'
                                : '인증 시간이 만료되었으니, 재인증을 진행해주세요!'}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        {isSendValidTest && isValidTime ? (
                          <span className={styles.buttonExpand}>인증 필요</span>
                        ) : (
                          <button
                            className={styles.button}
                            onClick={certificationEvent}
                          >
                            인증
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
              {info.subscribeEmail && info.emailVerified ? (
                <div className={styles.contentContainer}>
                  <div className={styles.key}>뉴스레터 알림</div>
                  <div className={styles.alarmRightContainer}>
                    <div className={styles.alarmContainer}>
                      <div
                        className={
                          !info.subscribeActive
                            ? styles.alarmSelected
                            : styles.alarm
                        }
                        onClick={
                          info.subscribeActive ? noAlarmEvent : alarmEvent
                        }
                      >
                        수신거부
                      </div>
                      <div
                        className={
                          info.subscribeActive
                            ? styles.alarmSelected
                            : styles.alarm
                        }
                        onClick={
                          info.subscribeActive ? noAlarmEvent : alarmEvent
                        }
                      >
                        이메일
                      </div>
                    </div>
                    {alarmWarning ? (
                      <span className={styles.alarmWarningText}>
                        <AiOutlineWarning></AiOutlineWarning>
                        &nbsp;뉴스레터 수신 이메일 설정 및 인증 후 가능합니다.
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
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
              clickEvent={() => {
                dispatch(changeWithDrawModalStatus())
              }}
            ></Button>
            <Button
              color={'white'}
              size={'mdShort'}
              text={'로그아웃'}
              clickEvent={() => {
                removeCookie('refresh-token')
                dispatch(setAccessToken(undefined))
                navigate('/')
              }}
            ></Button>
          </div>
        </div>
      </CommonLayout>
    </>
  )
}

export default SettingComponent
