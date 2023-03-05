import { getWithMainInfoAPI } from 'api/with'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { WithCardGrid, FilterSection } from 'containers/Common'
import React, { Suspense, useEffect } from 'react'
import { setWithMainInfoList, withMainInfoList } from 'reducers/withReducer'
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
  const dispatch = useAppDispatch()
  const mainInfoList = useAppSelector(withMainInfoList)

  useEffect(() => {
    getWithMainInfoList()
  }, [])

  const getWithMainInfoList = async () => {
    dispatch(setWithMainInfoList(await getWithMainInfoAPI()))
  }

  return (
    <div className={styles.mainLayout}>
      <FilterSection
        filterTypes={filterTypes}
        placeholder={'기업명을 입력해주세요'}
      />
      <Suspense fallback={<WithCardGrid isSpinner list={[]} />}>
        <WithCardGrid list={mainInfoList} />
      </Suspense>
    </div>
  )
}

export default WithMain
