import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import Modal from 'components/Modal'
import React from 'react'
import {
  changeRegisterModalStatus,
  registerModalState,
  searchValue,
} from 'reducers/commonReducer'
import styles from './RegisterModal.module.css'

type ModalProps = {
  isSelf?: boolean
}

const RegisterModal = ({ isSelf = false }: ModalProps) => {
  const modalStatus = useAppSelector(registerModalState)
  const dispatch = useAppDispatch()
  const closeModal = () => dispatch(changeRegisterModalStatus())
  const searchContent = useAppSelector(searchValue)

  return (
    <Modal isModal={modalStatus} setIsModal={closeModal}>
      <form className={styles.modalLayout}>
        <div className={styles.textSection}>
          <div className={styles.mainText}>
            &#39;{searchContent}&#39;{' '}
            <span className={styles.registerText}>등록</span> 요청을 하시겠어요?
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
            clickEvent={() => alert('서비스 준비중입니다.')}
          ></Button>
        </div>
      </form>
    </Modal>
  )
}

export default RegisterModal
