import { getAuthWithMainInfoAPI } from 'api/authWith'
import { getWithMainInfoAPI } from 'api/with'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'
import { WithCardGrid, FilterSection, RegisterModal } from 'containers/Common'
import { selectAccessToken } from 'features/auth/authSlice'
import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  changeRegisterModalStatus,
  changeSearchDataStatus,
  noSearchValue,
  searchDataState,
  searchValue,
} from 'reducers/commonReducer'
import {
  setWithCategoryFilterList,
  setWithMainInfoList,
  withCategoryFilterList,
} from 'reducers/withReducer'
import styles from 'styles/pages/commons/Content.module.css'

const WithMain = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isNoSearchData = useAppSelector(searchDataState)
  const searchContent = useAppSelector(searchValue)
  const noSearchContent = useAppSelector(noSearchValue)
  const categoryList = useAppSelector(withCategoryFilterList)
  const isLogon = useAppSelector(selectAccessToken) !== undefined

  const resetItems = () => {
    dispatch(
      setWithCategoryFilterList(
        categoryList.map(item =>
          item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
        ),
      ),
    )
  }

  const getWithMainInfoList = async () => {
    resetItems()
    const response = isLogon
      ? await dispatch(getAuthWithMainInfoAPI()).unwrap()
      : await getWithMainInfoAPI()
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
      <FilterSection placeholder={'기업명을 입력해주세요'} />
      {isNoSearchData ? (
        <>
          <Pc>
            <div className={styles.noSearchLayout}>
              <div className={styles.noSearchMainText}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 기업이 없어요
                :&#40;
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
          </Pc>
          <Tablet>
            <div className={styles.noSearchLayout}>
              <div className={styles.noSearchMainText}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 기업이 없어요
                :&#40;
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
          </Tablet>
          <MobileWide>
            <div className={styles.noSearchLayoutMobile}>
              <div className={styles.noSearchMainTextMobile}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 기업이 없어요
                :&#40;
              </div>
              <div className={styles.noSearchSubTextMobile}>
                <a onClick={() => dispatch(changeRegisterModalStatus())}>
                  기업 등록 요청
                </a>
                을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
              </div>
              <a
                className={styles.noSearchResetTextMobile}
                onClick={() => {
                  dispatch(changeSearchDataStatus(false))
                  getWithMainInfoList()
                }}
              >
                다른 기업 둘러보기 →
              </a>
            </div>
          </MobileWide>
          <Mobile>
            <div className={styles.noSearchLayoutMobile}>
              <div className={styles.noSearchMainTextMobile}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 기업이 없어요
                :&#40;
              </div>
              <div className={styles.noSearchSubTextMobile}>
                <a onClick={() => dispatch(changeRegisterModalStatus())}>
                  기업 등록 요청
                </a>
                을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
              </div>
              <a
                className={styles.noSearchResetTextMobile}
                onClick={() => {
                  dispatch(changeSearchDataStatus(false))
                  getWithMainInfoList()
                }}
              >
                다른 기업 둘러보기 →
              </a>
            </div>
          </Mobile>
        </>
      ) : (
        <Suspense fallback={<WithCardGrid isSpinner />}>
          <WithCardGrid />
        </Suspense>
      )}
    </div>
  )
}

export default WithMain
