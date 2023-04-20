import Input from 'components/Input'
import React, { FormEvent, useState } from 'react'
import styles from './LandingContact.module.css'
import emailjs from '@emailjs/browser'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const LandingContactSection = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

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

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateEmail(email)) {
      emailjs
        .sendForm(
          'service_04o5qrp',
          'template_ok9vhzl',
          event.currentTarget,
          'B9pJh_dQcD20zVcn7',
        )
        .then(
          result => {
            setMessage('')
            console.log(result.text)
            alert('email 전송 완료')
          },
          error => {
            console.log(error.text)
            alert('email 전송 실패 : 관리자에게 문의하세요!')
          },
        )
    } else {
      alert('올바르지 않은 email 형식 입니다.')
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contents} data-aos='flip-up'>
          <div className={styles.text}>
            <h3>
              날카로운 안목을 가진 여러분들의 <br />
              제안사항을 팀에게 전달해 주세요!
            </h3>
          </div>
          <form onSubmit={sendEmail}>
            <div className={`${styles.inputTop} ${styles.mobileForm}`}>
              <Input
                name='username'
                label='이름'
                type='text'
                value={username}
                placeholder='이름을 입력해주세요'
                onChange={ev => setUsername(ev.target.value)}
              ></Input>
              <Input
                name='email'
                label='이메일'
                type='text'
                value={email}
                placeholder='ex) selectool@selectool.com'
                onChange={ev => setEmail(ev.target.value)}
              ></Input>
            </div>
            <div className={styles.inputBottom}>
              <Input
                name='message'
                label='제안사항'
                type='textarea'
                value={message}
                placeholder='피드백, 응원, 소통 무엇이든 좋아요! 서비스의 발전에 많은 도움이 됩니다:)'
                onChangeForTextArea={ev => setMessage(ev.target.value)}
              ></Input>
              <button
                disabled={!username || !email || !message}
                className={styles.button}
                type='submit'
              >
                <div
                  className={
                    !username || !email || !message
                      ? styles.buttonTextDisabled
                      : styles.buttonText
                  }
                >
                  보내기
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LandingContactSection
