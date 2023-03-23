import { getWithMainInfoAPI } from 'api/with'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { WithCardGrid, FilterSection, RegisterModal } from 'containers/Common'
import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  changeRegisterModalStatus,
  changeSearchDataStatus,
  searchDataState,
  searchValue,
} from 'reducers/commonReducer'
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
  const navigate = useNavigate()

  const isNoSearchData = useAppSelector(searchDataState)
  const searchContent = useAppSelector(searchValue)

  const getWithMainInfoList = async () => {
    const response = await getWithMainInfoAPI()
    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setWithMainInfoList(response.data))
    }
  }

  if (searchContent === '') {
    dispatch(changeSearchDataStatus(false))
  }

  useEffect(() => {
    getWithMainInfoList()
  }, [])

  return (
    <div className={styles.mainLayout}>
      <RegisterModal />
      <FilterSection
        filterTypes={filterTypes}
        placeholder={'기업명을 입력해주세요'}
      />
      {isNoSearchData ? (
        <div className={styles.noSearchLayout}>
          <div className={styles.noSearchMainText}>
            아쉽게도 &#39;{searchContent}&#39;와 일치하는 기업이 없어요 :&#40;
          </div>
          <div className={styles.noSearchSubText}>
            <a onClick={() => dispatch(changeRegisterModalStatus())}>
              기업 등록 요청
            </a>
            을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
          </div>
          <a
            className={styles.noSearchResetText}
            onClick={() => {
              dispatch(changeSearchDataStatus(false))
              getWithMainInfoList()
            }}
          >
            다른 기업 둘러보기 →
          </a>
        </div>
      ) : (
        <Suspense fallback={<WithCardGrid isSpinner />}>
          <WithCardGrid />
        </Suspense>
      )}
    </div>
  )
}

export default WithMain
