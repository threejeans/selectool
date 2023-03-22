import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import Chip from 'components/Chip'
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
      <div className={styles.modalLayout}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            보고 싶은 협업툴의 카테고리를 세세하게 설정해보세요.
          </div>
          <div className={styles.description}>
            2개 이상의 항목을 선택해주시면 더욱 정확하고 만족스러운 필터링
            결과를 얻을 수 있어요 :&#41;
          </div>
        </div>
        <div className={styles.contentsContainer}>
          <FilterContent
            title='💵 가격 범위'
            filterTypes={[
              '전체',
              '5천원 이하',
              '5천원 ~ 1만원',
              '1만원 ~ 5만원',
              '5만원 이상',
            ]}
          />
          <FilterContent
            title='🗃 정렬'
            filterTypes={['가나다순', '북마크 많은 순', '무료 플랜']}
          />
          <FilterContent
            title='🌐 국가'
            filterTypes={['전체', '국내', '해외']}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button color={'outlined'} size={'md'} text={'초기화'} clickEvent={() => {alert('서비스 준비중입니다.')}}></Button>
          <Button color={'primary'} size={'md'} text={'다 골랐어요!'} clickEvent={() => {alert('서비스 준비중입니다.')}}></Button>
        </div>
      </div>
    </Modal>
  )
}

type ContentProps = {
  title: string
  filterTypes: Array<string>
}

const FilterContent = ({ title, filterTypes }: ContentProps) => {
  return (
    <div className={styles.contentLayout}>
      <div className={styles.contentTitle}>{title}</div>
      <hr className={styles.line}></hr>
      <div className={styles.chipGrid}>
        {filterTypes.map((type, idx) => (
          <Chip
            key={idx}
            type={'modalBasic'}
            isSelected={false}
            content={type}
          />
        ))}
      </div>
    </div>
  )
}

export default SelfFilterModal
