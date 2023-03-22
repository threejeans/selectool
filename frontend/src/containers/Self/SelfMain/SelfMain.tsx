import { getSelfMainInfoAPI } from 'api/self'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { SelfCardGrid, FilterSection } from 'containers/Common'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelfMainInfoList } from 'reducers/selfReducer'
import styles from 'styles/pages/commons/Content.module.css'

const SelfMain = () => {
  const contents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getselfMainInfoList = async () => {
    const response = await getSelfMainInfoAPI()
    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setSelfMainInfoList(response.data))
    }
  }

  useEffect(() => {
    getselfMainInfoList()
  }, [])

  return (
    <div className={styles.mainLayout}>
      <FilterSection
        isFilterButton
        filterTypes={contents}
        placeholder={'툴 이름을 입력해주세요'}
      />
      <Suspense fallback={<SelfCardGrid isSpinner />}>
        <SelfCardGrid />
      </Suspense>
    </div>
  )
}

export default SelfMain
