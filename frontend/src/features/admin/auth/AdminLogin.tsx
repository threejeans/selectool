import { useAppDispatch, useAppSelector } from 'app/hooks'
import Spinner from 'components/Spinner'
import { useEffect, useRef, useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import styles from 'styles/admin/pages/auth/AdminLogin.module.css'
import { loginAdmin, selectAuthStatus, setTmpEmail } from './adminAuthSlice'

const BLANK_MSG = '이메일을 입력해주세요.'
const WRONG_MSG = '잘못된 이메일 양식입니다.'
const REJECT_MSG =
  '등록된 이메일이 아닙니다. 3번 이상 오류 시 3일 동안 로그인이 제한됩니다. 다시 시도해주세요.'

const AdminLogin = () => {
  const authStatus = useAppSelector(selectAuthStatus)
  const [isLoading, setIsLoading] = useState(authStatus === 'loading')
  const emailRef = useRef<HTMLInputElement | null>(null)
  const [msg, setMsg] = useState('')
  const [cnt, setCnt] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSummit = () => {
    if (emailRef.current) {
      const email = emailRef.current.value
      // 미입력 예외
      if (email.length === 0) {
        setIsWrong(true)
        setMsg(BLANK_MSG)
        emailRef.current.focus()
        return
      }
      if (isLoading) return
      // 입력 내용 유효성 검사
      if (!isEmail(email)) {
        setIsWrong(true)
        setMsg(WRONG_MSG)
        emailRef.current.focus()
      } else {
        dispatch(loginAdmin({ email }))
          .then(e => {
            if (e.meta.requestStatus === 'rejected') {
              if (cnt < 2) {
                setCnt(cnt + 1)
                setIsWrong(true)
                setMsg(REJECT_MSG + ' ⏳ ' + (cnt + 1))
              } else {
                setCnt(0)
                navigate('/')
              }
            } else if (e.meta.requestStatus === 'fulfilled') {
              dispatch(setTmpEmail(email))
              navigate('/admin/login/auth')
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }

  const isEmail = (email: string) => {
    const regex =
      // eslint-disable-next-line no-useless-escape
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    return email !== '' && email !== 'undefined' && regex.test(email)
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus()
    }
  })

  useEffect(() => {
    setIsLoading(authStatus === 'loading')
  }, [authStatus])

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Selectool Admin Connect</h2>
        <div className={styles.inputBox}>
          <input
            ref={emailRef}
            className={styles.input}
            type='email'
            onKeyUp={e => {
              setIsWrong(false)
              if (e.key === 'Enter') handleSummit()
            }}
          />
          {isLoading ? (
            <p className={styles.loginBtn}>
              <Spinner />
            </p>
          ) : (
            <BsArrowRightCircle
              className={styles.loginBtn}
              onClick={handleSummit}
            />
          )}
          {isWrong && <h5 className={styles.wrongMsg}>{msg}</h5>}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
