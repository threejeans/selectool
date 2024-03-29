import { getAuthSelfMainInfoAPI } from 'api/authSelf'
import { getSelfMainInfoAPI } from 'api/self'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'
import { SelfCardGrid, FilterSection, RegisterModal } from 'containers/Common'
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
  changeFilterModalCheckedStatus,
  resetSelfModalFilter,
  selfCategoryFilterList,
  setSelfCategoryFilterList,
  setSelfCategoryFilterParams,
  setSelfMainInfoList,
} from 'reducers/selfReducer'
import styles from 'styles/pages/commons/Content.module.css'

const SelfMain = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isNoSearchData = useAppSelector(searchDataState)
  const searchContent = useAppSelector(searchValue)
  const noSearchContent = useAppSelector(noSearchValue)
  const categoryList = useAppSelector(selfCategoryFilterList)
  const isLogon = useAppSelector(selectAccessToken)

  const resetItems = () => {
    dispatch(resetSelfModalFilter())

    dispatch(
      setSelfCategoryFilterList(
        categoryList.map(item =>
          item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
        ),
      ),
    )
    dispatch(setSelfCategoryFilterParams(''))
  }

  const getselfMainInfoList = async () => {
    resetItems()
    dispatch(changeFilterModalCheckedStatus(false))

    const response = isLogon
      ? await dispatch(getAuthSelfMainInfoAPI()).unwrap()
      : await getSelfMainInfoAPI()
    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setSelfMainInfoList(response.data))
    }
  }

  if (searchContent === '') {
    dispatch(changeSearchDataStatus(false))
  }

  useEffect(() => {
    getselfMainInfoList()
  }, [])

  return (
    <div className={styles.mainLayout}>
      <RegisterModal isSelf />
      <FilterSection isFilterButton placeholder={'툴 이름을 입력해주세요'} />
      {isNoSearchData ? (
        <>
          <Pc>
            <div className={styles.noSearchLayout}>
              <div className={styles.noSearchMainText}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 툴이 없어요
                :&#40;
              </div>
              <div className={styles.noSearchSubText}>
                <a onClick={() => dispatch(changeRegisterModalStatus())}>
                  툴 등록 요청
                </a>
                을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
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
          </Pc>
          <Tablet>
            <div className={styles.noSearchLayout}>
              <div className={styles.noSearchMainText}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 툴이 없어요
                :&#40;
              </div>
              <div className={styles.noSearchSubText}>
                <a onClick={() => dispatch(changeRegisterModalStatus())}>
                  툴 등록 요청
                </a>
                을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
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
          </Tablet>
          <MobileWide>
            <div className={styles.noSearchLayoutMobile}>
              <div className={styles.noSearchMainTextMobile}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 툴이 없어요
                :&#40;
              </div>
              <div className={styles.noSearchSubTextMobile}>
                <a onClick={() => dispatch(changeRegisterModalStatus())}>
                  툴 등록 요청
                </a>
                을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
              </div>
              <a
                className={styles.noSearchResetTextMobile}
                onClick={() => {
                  dispatch(changeSearchDataStatus(false))
                  getselfMainInfoList()
                }}
              >
                다른 툴 둘러보기 →
              </a>
            </div>
          </MobileWide>
          <Mobile>
            <div className={styles.noSearchLayoutMobile}>
              <div className={styles.noSearchMainTextMobile}>
                아쉽게도 &#39;{noSearchContent}&#39;에 일치하는 툴이 없어요
                :&#40;
              </div>
              <div className={styles.noSearchSubTextMobile}>
                <a onClick={() => dispatch(changeRegisterModalStatus())}>
                  툴 등록 요청
                </a>
                을 해주시면 검토 후 빠른 시일 내에 제공해드릴게요
              </div>
              <a
                className={styles.noSearchResetTextMobile}
                onClick={() => {
                  dispatch(changeSearchDataStatus(false))
                  getselfMainInfoList()
                }}
              >
                다른 툴 둘러보기 →
              </a>
            </div>
          </Mobile>
        </>
      ) : (
        <Suspense fallback={<SelfCardGrid isSpinner />}>
          <SelfCardGrid />
        </Suspense>
      )}
    </div>
  )
}

export default SelfMain
