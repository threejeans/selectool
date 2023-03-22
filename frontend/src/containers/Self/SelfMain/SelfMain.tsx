import { getSelfMainInfoAPI } from 'api/self'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { SelfCardGrid, FilterSection } from 'containers/Common'
import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  changeSearchDataStatus,
  searchDataState,
  searchValue,
} from 'reducers/commonReducer'
import { setSelfMainInfoList } from 'reducers/selfReducer'
import styles from 'styles/pages/commons/Content.module.css'

const SelfMain = () => {
  const contents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isNoSearchData = useAppSelector(searchDataState)
  const searchContent = useAppSelector(searchValue)

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
    if (searchContent === '') {
      dispatch(changeSearchDataStatus(false))
    }
  }, [])

  return (
    <div className={styles.mainLayout}>
      <FilterSection
        isFilterButton
        filterTypes={contents}
        placeholder={'툴 이름을 입력해주세요'}
      />
      {isNoSearchData ? (
        <div className={styles.noSearchLayout}>
          <div className={styles.noSearchMainText}>
            아쉽게도 &#39;{searchContent}&#39;와 일치하는 툴이 없어요 :&#40;
          </div>
          <div className={styles.noSearchSubText}>
            <a>툴 등록 요청</a>을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
          </div>
          <a
            className={styles.noSearchResetText}
            onClick={() => {
              dispatch(changeSearchDataStatus(false))
              getselfMainInfoList()
            }}
          >
            다른 툴 둘러보기 →
          </a>
        </div>
      ) : (
        <Suspense fallback={<SelfCardGrid isSpinner />}>
          <SelfCardGrid />
        </Suspense>
      )}
    </div>
  )
}

export default SelfMain
