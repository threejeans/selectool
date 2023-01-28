import Modal from 'components/Modal'
import Spinner from 'components/Spinner'
import { CardGrid, FilterSection } from 'containers/Common'
import React, { Suspense } from 'react'
import styles from 'styles/pages/commons/Content.module.css'

const SelfMain = () => {
  const contents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']

  return (
    <div className={styles.mainLayout}>
      <FilterSection
        isFilterButton
        filterTypes={contents}
        placeholder={'툴 이름을 입력해주세요'}
      />
      <Suspense fallback={<CardGrid isSpinner />}>
        <CardGrid type={'self'} />
      </Suspense>
    </div>
  )
}

export default SelfMain
