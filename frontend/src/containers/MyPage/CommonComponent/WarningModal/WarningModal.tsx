import { useAppDispatch, useAppSelector } from 'app/hooks'
import Modal from 'components/Modal'
import React, { useState } from 'react'
import {
  changeWithDrawModalStatus,
  withdrawModalState,
} from 'reducers/settingReducer'
import styles from './WarningModal.module.css'
import Button from 'components/Button'
import { BsExclamationLg } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const WarningModal = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)

  const modalStatus = useAppSelector(withdrawModalState)

  const closeModal = () => {
    if (step === 2) {
      navigate('/')
    }

    setStep(0)

    dispatch(changeWithDrawModalStatus())
  }

  return (
    <Modal isModal={modalStatus} setIsModal={closeModal}>
      {step === 0 ? (
        <div className={styles.modalLayout}>
          <div className={styles.warningSection}>
            <BsExclamationLg className={styles.exclamation}></BsExclamationLg>
          </div>
          <div className={styles.textSection}>
            <div className={styles.mainText}>
              정말 셀렉툴 회원 탈퇴를 하시겠어요?
            </div>
            <div className={styles.subText}>
              *탈퇴 시 뉴스레터 구독은 중지돼요.
            </div>
          </div>
          <div className={styles.buttonSection}>
            <Button
              color={'warning'}
              size={'md'}
              text={'실수에요'}
              clickEvent={closeModal}
            ></Button>
            <Button
              color={'neutral'}
              size={'md'}
              text={'네, 할게요'}
              clickEvent={() => setStep(1)}
            ></Button>
          </div>
        </div>
      ) : step == 1 ? (
        <div className={styles.modalLayout2}>
          <div className={styles.textSection2}>
            <div className={styles.mainText}>
              마지막으로 한번 더 확인해주세요.
            </div>

            <div className={styles.subText2}>
              탈퇴 시 활동 기록을 포함한 모든 정보가 삭제돼요.
              <br /> 지워진 정보들은 추후 복구가 불가해요.
            </div>
          </div>

          <div className={styles.buttonSection}>
            <Button
              color={'warning'}
              size={'md'}
              text={'취소할게요'}
              clickEvent={closeModal}
            ></Button>
            <Button
              color={'neutral'}
              size={'md'}
              text={'확인'}
              clickEvent={() => {
                // TODO: 탈퇴 로직 연결
                alert('서비스 준비중입니다.')
                // setStep(2)
              }}
            ></Button>
          </div>
        </div>
      ) : (
        <div className={styles.modalLayout2}>
          <div className={styles.textSection2}>
            <div className={styles.mainText}>
              회원 탈퇴가 성공적으로 완료되었어요.
            </div>

            <div className={styles.subText2}>
              아쉽지만 다음에 만나요👋🏻
              <br /> 더욱 발전된 모습으로 기다릴게요.
            </div>
          </div>

          <div className={styles.buttonSection}>
            <Button
              color={'neutral'}
              size={'md'}
              text={'홈으로'}
              clickEvent={() => {
                setStep(0)
                navigate('/')
              }}
            ></Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default WarningModal
