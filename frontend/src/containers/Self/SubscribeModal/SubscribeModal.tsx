import Modal from 'components/Modal'
import React, { useEffect, useState } from 'react'
import styles from './SubscribeModal.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  changeSubscribeModalStatus,
  selfSpecificInfo,
  setSelfSpecificInfo,
  subscribeModalState,
} from 'reducers/selfReducer'
import {
  AiFillCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineWarning,
} from 'react-icons/ai'
import Button from 'components/Button'
import { setUserInfo, userInfo } from 'reducers/settingReducer'
import {
  editUserInfoAPI,
  getUserInfoAPI,
  userEmailAuthorizeAPI,
} from 'api/setting'
import { selfSubscribeToolAPI } from 'api/authSelf'

type modalProps = {
  toolId?: string
}

const SubscribeModal = ({ toolId }: modalProps) => {
  const dispatch = useAppDispatch()
  const modalState = useAppSelector(subscribeModalState)
  const info = useAppSelector(userInfo)
  const specificInfo = useAppSelector(selfSpecificInfo)

  const [isBasic, setIsBasic] = useState(true)
  const [step, setStep] = useState(0)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const [isTimeOut, setIsTimeOut] = useState(false)
  const [isNoAuthorize, setIsNoAuthorize] = useState(false)

  const validTimeTest = () => {
    const now = new Date()
    const verifyingTime = localStorage.getItem('verifyingTime')
      ? localStorage.getItem('verifyingTime')
      : ''

    if (
      info.subscribeEmail === localStorage.getItem('verifyingEmail') &&
      verifyingTime &&
      new Date(verifyingTime) <= now
    ) {
      setIsTimeOut(true)
      return false
    } else {
      return true
    }
  }

  const closeModal = () => {
    dispatch(changeSubscribeModalStatus())
    setIsBasic(true)
    const timeOut = validTimeTest()
    if (step !== 2 || (step == 2 && !timeOut)) {
      setStep(0)
    }
  }

  // email 유효성 검사
  const validateEmail = (email: string) => {
    const removeRegex = /\s/g
    const updateEmail = email.replace(removeRegex, '')
    const regex =
      // eslint-disable-next-line no-useless-escape
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    return regex.test(updateEmail)
  }

  const stepZeroEvent = async () => {
    if (isBasic) {
      const response = await dispatch(
        userEmailAuthorizeAPI(info.email),
      ).unwrap()

      if (response === 200 || response === 201) {
        const newInfo = { ...info }
        newInfo.subscribeEmail = subscribeEmail
        dispatch(setUserInfo(newInfo))
        const now = new Date()
        const outTime = new Date(
          now.setMinutes(now.getMinutes() + 10),
        ).toString()
        localStorage.setItem('verifyingEmail', subscribeEmail)
        localStorage.setItem('verifyingTime', outTime)
        setStep(2)
      } else {
        console.log(response)
      }
    } else {
      setStep(1)
    }
  }

  const stepOneEvent = async () => {
    const response = await dispatch(
      userEmailAuthorizeAPI(subscribeEmail),
    ).unwrap()

    if (response === 200 || response === 201) {
      const newInfo = { ...info }
      newInfo.subscribeEmail = subscribeEmail
      dispatch(setUserInfo(newInfo))
      const now = new Date()
      const outTime = new Date(now.setMinutes(now.getMinutes() + 10)).toString()
      localStorage.setItem('verifyingEmail', subscribeEmail)
      localStorage.setItem('verifyingTime', outTime)
      setStep(2)
    } else {
      console.log(response)
    }
  }

  const stepTwoEvent = async () => {
    const response = await dispatch(getUserInfoAPI()).unwrap()

    if (response.statusCode === 404) {
      console.log(response.statusCode)
    } else {
      dispatch(setUserInfo(response.data))
      if (response.data.emailVerified) {
        const id = toolId ? parseInt(toolId) : 0
        const subscribeResponse = await dispatch(
          selfSubscribeToolAPI(id),
        ).unwrap()

        if (
          subscribeResponse.statusCode === 200 ||
          subscribeResponse.statusCode === 201
        ) {
          const newInfo = { ...specificInfo }
          newInfo.isSubscribed = !newInfo.isSubscribed
          if (!info.subscribeActive) {
            alarmEvent()
          }
          dispatch(setSelfSpecificInfo(newInfo))
          setStep(3)
        } else {
          console.log('error', subscribeResponse.statusCode)
        }
      } else {
        const timeOut = validTimeTest()
        if (!timeOut) {
          setIsTimeOut(true)
        } else {
          setIsNoAuthorize(false)
        }
      }
    }
  }

  const alarmEvent = async () => {
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

  return (
    <Modal isModal={modalState} setIsModal={closeModal}>
      <div className={styles.modalLayout}>
        {step === 0 ? (
          <>
            <div>
              <div className={styles.mainText}>
                <span className={styles.registerText}>툴 구독</span>이
                처음이신가요?
              </div>
              <div className={styles.subText}>
                구독하기 한번으로 관심있는 툴의 유용한 가이드를 매주 월요일마다
                받아보실 수 있어요.<br></br>
                저희 셀렉툴이 꼼꼼히 선별하여 똑똑하게 추천해드릴게요!
              </div>
            </div>
            <div className={styles.selectBoxContainer}>
              <div
                className={`${styles.selectBox} ${
                  isBasic ? styles.selectedBox : ''
                }`}
                onClick={() => setIsBasic(true)}
              >
                <AiFillCheckCircle
                  className={`${styles.checkicon} ${
                    isBasic ? styles.selectedicon : ''
                  }`}
                ></AiFillCheckCircle>
                <div
                  className={`${styles.selectText} ${
                    isBasic ? styles.selectedText : ''
                  }`}
                >
                  가입 이메일
                </div>
              </div>
              <div
                className={`${styles.selectBox} ${
                  !isBasic ? styles.selectedBox : ''
                }`}
                onClick={() => setIsBasic(false)}
              >
                <AiFillCheckCircle
                  className={`${styles.checkicon} ${
                    !isBasic ? styles.selectedicon : ''
                  }`}
                ></AiFillCheckCircle>
                <div
                  className={`${styles.selectText} ${
                    !isBasic ? styles.selectedText : ''
                  }`}
                >
                  새로운 이메일
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                color={'neutral'}
                size={'md'}
                text={'취소'}
                clickEvent={closeModal}
              ></Button>
              <Button
                color={'primary'}
                size={'md'}
                text={'확인'}
                clickEvent={stepZeroEvent}
              ></Button>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <div>
              <div className={styles.mainText}>
                새로운 이메일 주소를 입력해주세요.
              </div>
              <div className={styles.subText}>
                구독하기 한번으로 관심있는 툴의 유용한 가이드를 매주 월요일마다
                받아보실 수 있어요.
                <br></br>
                저희 셀렉툴이 꼼꼼히 선별하여 똑똑하게 추천해드릴게요!
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                className={`${styles.input} ${
                  !isEmailValid ? styles.inputNotValid : ''
                }`}
                value={subscribeEmail}
                onChange={ev => {
                  setSubscribeEmail(ev.target.value)
                  setIsEmailValid(validateEmail(ev.target.value))
                }}
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
                  &nbsp;이메일 형식이 올바르지 않습니다. 다시 확인해주세요.
                </div>
              ) : (
                ''
              )}
              <AiOutlineCloseCircle
                className={styles.resetIcon}
                onClick={() => setSubscribeEmail('')}
              ></AiOutlineCloseCircle>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                color={'neutral'}
                size={'md'}
                text={'취소'}
                clickEvent={closeModal}
              ></Button>
              <Button
                color={'primary'}
                size={'md'}
                text={'확인'}
                clickEvent={stepOneEvent}
              ></Button>
            </div>
          </>
        ) : step === 2 ? (
          <>
            <div>
              <div className={styles.mainText}>
                {isTimeOut
                  ? '인증 시간이 만료되었어요.'
                  : isNoAuthorize
                  ? '인증이 완료되지 않았어요'
                  : '인증 메일을 발송해드렸어요.'}
              </div>
              <div className={styles.subText}>
                툴 뉴스레터 구독 서비스 이용을 위해 가입하신 이메일로 인증을
                요청드렸어요.
                <br></br>
                10분 이내로 메일 확인 후 이메일 인증을 완료하시면, 서비스를
                이용하실 수 있어요.
              </div>
            </div>
            <div className={styles.email}>
              {isBasic ? info.email : subscribeEmail}
            </div>
            <div className={styles.buttonContainer}>
              <Button
                color={'neutral'}
                size={'md'}
                text={'취소'}
                clickEvent={closeModal}
              ></Button>
              {isTimeOut ? (
                <Button
                  color={'primary'}
                  size={'md'}
                  text={'재인증'}
                  clickEvent={stepTwoEvent}
                ></Button>
              ) : (
                <Button
                  color={'primary'}
                  size={'md'}
                  text={'인증 완료'}
                  clickEvent={stepTwoEvent}
                ></Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.checkMark} ${styles.animation}`}>
              <span className={styles.cover1}></span>
              <span className={styles.cover2}></span>
              <span className={styles.check}>&#x02713;</span>
            </div>
            <div>
              <div className={styles.mainText}>
                툴 구독이 성공적으로 완료되었어요👏🏻👏🏻
              </div>
              <div className={styles.subText}>
                이제 관심있는 툴에 대해 매주 새로운 소식을 접해볼 수 있어요.
                <br></br>
                뉴스레터 수신 이메일 주소 변경은 ‘마이페이지’에서 언제든지
                가능해요.
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default SubscribeModal
