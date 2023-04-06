import React, { useEffect, useState } from 'react'
import {
  CommonLayout,
  SettingLayout,
  WarningModal,
} from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  editUserInfoAPI,
  getUserInfoAPI,
  userEmailAuthorizeAPI,
} from 'api/setting'
import styles from './SettingComponent.module.css'
import {
  changeWithDrawModalStatus,
  setUserInfo,
  userInfo,
} from 'reducers/settingReducer'
import { useNavigate } from 'react-router-dom'
import Button from 'components/Button'
import {
  loginModalOpen,
  selectAccessToken,
  setAccessToken,
} from 'features/auth/authSlice'

import GoogleLogo from 'assets/google_logo.svg'
import NaverLogo from 'assets/naver_logo.svg'
import KakaoLogo from 'assets/kakao_logo.svg'
import EmailIcon from 'assets/email_icon.svg'

import { RiPencilFill } from 'react-icons/ri'
import { AiFillSound, AiOutlineWarning } from 'react-icons/ai'
import { getCookie, setCookie } from 'util/cookie'
import apiAxios from 'app/apiAxios'

const SettingComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const info = useAppSelector(userInfo)
  const isLogon = useAppSelector(selectAccessToken)

  const [editable, setEditable] = useState(false)
  const [subscribeEmail, setSubscribeEmail] = useState(
    info.subscribeEmail ? info.subscribeEmail : '',
  )
  const [validatingEmail, setValidatingEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isSendValidTest, setIsSendValidTest] = useState(false)
  const [alarmWarning, setAlarmWarning] = useState(false)

  const getUserInfo = async () => {
    const token = getCookie('refresh-token')

    async function RefreshLogin() {
      await apiAxios
        .get(process.env.REACT_APP_API + '/api/member/refresh', {
          params: { refreshToken: token },
        })
        .then(async res => {
          const accessToken = res.data.accessToken
          const refreshToken = res.data.refreshToken
          dispatch(setAccessToken(accessToken))

          if (refreshToken !== undefined) {
            setCookie('refresh-token', refreshToken)
          }

          const response = await dispatch(getUserInfoAPI()).unwrap()

          if (response.statusCode === 404) {
            navigate('/error')
          } else {
            dispatch(setUserInfo(response.data))

            if (info.subscribeEmail && !info.emailVerified) {
              setEditable(true)
              setIsSendValidTest(true)
              setValidatingEmail(info.subscribeEmail)
            } else {
              false
            }
          }
        })
        .catch(err => {
          dispatch(loginModalOpen())
          navigate('/')
        })
    }

    if (!isLogon) {
      RefreshLogin()
    } else {
      const response = await dispatch(getUserInfoAPI()).unwrap()

      if (response.statusCode === 404) {
        navigate('/error')
      } else {
        dispatch(setUserInfo(response.data))

        if (info.subscribeEmail && !info.emailVerified) {
          setEditable(true)
          setIsSendValidTest(true)
          setValidatingEmail(info.subscribeEmail)
        } else {
          false
        }
      }
    }
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

      // TODO : 이메일 인증 보내기
      const response = await dispatch(
        userEmailAuthorizeAPI(subscribeEmail),
      ).unwrap()

      if (response === 200 || response === 201) {
        setIsSendValidTest(true)
      } else {
        console.log(response)
      }
    }
  }

  if (isSendValidTest && subscribeEmail !== validatingEmail) {
    setValidatingEmail('')
    setIsSendValidTest(false)
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
      console.log(response)
      const newUserInfo = { ...info }
      newUserInfo.subscribeActive = false
      dispatch(setUserInfo(newUserInfo))
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    getUserInfo()
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
                            &nbsp;이메일 형식이 올바르지 않습니다. 다시
                            확인해주세요.
                          </div>
                        ) : (
                          ''
                        )}
                        {isSendValidTest ? (
                          <div className={styles.warningText}>
                            <AiFillSound></AiFillSound>
                            &nbsp;이메일로 인증을 요청드렸으니, 인증을
                            완료해주세요!
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      {isSendValidTest ? (
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
                      onClick={info.subscribeActive ? noAlarmEvent : alarmEvent}
                    >
                      수신거부
                    </div>
                    <div
                      className={
                        info.subscribeActive
                          ? styles.alarmSelected
                          : styles.alarm
                      }
                      onClick={info.subscribeActive ? noAlarmEvent : alarmEvent}
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
              clickEvent={() => dispatch(changeWithDrawModalStatus())}
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
    </>
  )
}

export default SettingComponent
