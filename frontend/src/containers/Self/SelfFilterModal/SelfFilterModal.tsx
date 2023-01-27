import { useAppDispatch, useAppSelector } from 'app/hooks'
import Modal from 'components/Modal'
import React from 'react'
import { changeFilterModalStatus, filterModalState } from 'reducers/selfReducer'
import styles from './SelfFilterModal.module.css'

const SelfFilterModal = () => {
  const modalStatus = useAppSelector(filterModalState)
  const dispatch = useAppDispatch()
  const closemodal = () => dispatch(changeFilterModalStatus())

  return (
    <Modal isModal={modalStatus} setIsModal={closemodal}>
      <div className={styles.contentsContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            보고 싶은 협업툴의 카테고리를 세세하게 설정해보세요.
          </div>
          <div className={styles.description}>
            2개 이상의 항목을 선택해주시면 더욱 정확하고 만족스러운 필터링
            결과를 얻을 수 있어요 :&#41;
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelfFilterModal
