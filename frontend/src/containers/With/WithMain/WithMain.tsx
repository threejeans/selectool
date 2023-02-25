import { WithCardGrid, FilterSection } from 'containers/Common'
import React, { Suspense } from 'react'
import styles from 'styles/pages/commons/Content.module.css'

const WithMain = () => {
  const filterTypes = [
    '금융',
    '커뮤니티',
    '모빌리티',
    '여행/레저',
    '커머스',
    'Other',
  ]

  return (
    <div className={styles.mainLayout}>
      <FilterSection
        filterTypes={filterTypes}
        placeholder={'기업명을 입력해주세요'}
      />
      <Suspense fallback={<WithCardGrid isSpinner list={[]} />}>
        <WithCardGrid list={[]}  />
      </Suspense>
    </div>
  )
}

export default WithMain
