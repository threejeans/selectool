import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import Modal from 'components/Modal'
import React, { useState } from 'react'
import {
  changeRegisterModalStatus,
  registerModalState,
  searchValue,
} from 'reducers/commonReducer'
import styles from './RegisterModal.module.css'
import { registerAuthRequestAPI, registerRequestAPI } from 'api/setting'
import { selectAccessToken } from 'features/auth/authSlice'

type ModalProps = {
  isSelf?: boolean
}

const RegisterModal = ({ isSelf = false }: ModalProps) => {
  const modalStatus = useAppSelector(registerModalState)
  const dispatch = useAppDispatch()
  const closeModal = () => {
    dispatch(changeRegisterModalStatus())
    setIsCompleted(false)
  }
  const searchContent = useAppSelector(searchValue)
  const [isCompleted, setIsCompleted] = useState(false)

  const isLogon = useAppSelector(selectAccessToken) !== undefined

  const registerEvent = async () => {
    const response = isLogon
      ? await dispatch(
          registerAuthRequestAPI({
            content: searchContent,
            type: isSelf ? '툴' : '기업',
          }),
        ).unwrap()
      : await registerRequestAPI({
          content: searchContent,
          type: isSelf ? '툴' : '기업',
        })

    if (response === 200 || response === 201) {
      console.log(response)
      setIsCompleted(true)
    } else {
      console.log(response)
    }
  }

  return (
    <Modal isModal={modalStatus} setIsModal={closeModal}>
      {isCompleted ? (
        <div className={styles.modalLayoutForCheck}>
          <div className={`${styles.checkMark} ${styles.animation}`}>
            <span className={styles.cover1}></span>
            <span className={styles.cover2}></span>
            <span className={styles.check}>&#x02713;</span>
          </div>
          <div className={styles.textSection}>
            <div className={styles.mainText}>
              &#39;{searchContent}&#39;{' '}
              <span className={styles.registerText}>등록</span> 요청이
              완료되었습니다
            </div>
            <div className={styles.subText}>
              관심있는 기업이 더 있으시다면 등록해주세요 ;&#41;
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.modalLayout}>
          <div className={styles.textSection}>
            <div className={styles.mainText}>
              &#39;{searchContent}&#39;{' '}
              <span className={styles.registerText}>등록</span> 요청을
              하시겠어요?
            </div>
            <div className={styles.subText}>
              검토 후 새로운 {isSelf ? '툴로' : '기업으로'} 등록될 예정이에요!
            </div>
          </div>
          <div className={styles.buttonSection}>
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
              clickEvent={registerEvent}
            ></Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default RegisterModal
