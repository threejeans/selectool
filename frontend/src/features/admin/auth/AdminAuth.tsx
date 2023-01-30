import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { authAdmin, selectTmpEmail } from './adminAuthSlice'

import { useAppDispatch } from 'app/hooks'
import { useNavigate } from 'react-router-dom'
import styles from 'styles/admin/pages/auth/AdminAuth.module.css'

const AdminAuth = () => {
  const tmpEmail = useSelector(selectTmpEmail)
  const authRef = useRef<HTMLInputElement[] | null[]>([])
  const [inputIndex, setInputIndex] = useState(0)
  const regex = /^[A-Za-z0-9+]*$/
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!tmpEmail) {
      navigate('/admin')
    }
  }, [])

  const handleAuthInput = (e: any) => {
    e.preventDefault()
    if (e.key === 'Backspace') {
      e.target.value = ''
      if (inputIndex > 0) setInputIndex(inputIndex - 1)
      else if (inputIndex === 0) authRef.current[inputIndex]?.focus()
    } else if (e.key.length < 2 && regex.test(e.key)) {
      e.target.value = e.key
      if (inputIndex < 5) setInputIndex(inputIndex + 1)
      else {
        authRef.current[5]?.focus()
        let tmpAuth = ''
        authRef.current.map((item, _) => {
          tmpAuth += item?.value
        })
        dispatch(authAdmin({ email: tmpEmail, auth: tmpAuth })).then(e => {
          if (e.meta.requestStatus === 'fulfilled') navigate('/admin/contents')
          else setInputIndex(5)
        })
      }
    }
  }

  useEffect(() => {
    if (authRef.current) {
      authRef.current[inputIndex]?.focus()
    }
  }, [inputIndex])

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h2 className={styles.title}>Selectool Admin Connect</h2>
        <div className={styles.inputBox}>
          {[...Array(parseInt('6'))].map((_, index) => {
            return (
              <input
                key={index}
                ref={e => (authRef.current[index] = e)}
                className={styles.input}
                type='text'
                onKeyDown={handleAuthInput}
              />
            )
          })}
          {/* {isWrong && <h5 className={styles.wrongMsg}>{msg}</h5>} */}
        </div>
      </div>
    </div>
  )
}

export default AdminAuth
