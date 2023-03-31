import {
  getAuthSelfCategoryListAPI,
  getAuthSelfMainInfoAPI,
} from 'api/authSelf'
import {
  getAuthWithCategoryListAPI,
  getAuthWithMainInfoAPI,
} from 'api/authWith'
import { getSelfCategoryListAPI, getSelfMainInfoAPI } from 'api/self'
import { getWithCategoryListAPI, getWithMainInfoAPI } from 'api/with'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Chip from 'components/Chip'
import { selectAccessToken } from 'features/auth/authSlice'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  filterModalCheckedState,
  selfCategoryFilterList,
  selfModalFilterParams,
  setSelfCategoryFilterList,
  setSelfCategoryFilterParams,
  setSelfMainInfoList,
} from 'reducers/selfReducer'
import {
  setWithCategoryFilterList,
  setWithMainInfoList,
  withCategoryFilterList,
} from 'reducers/withReducer'
import styles from './FilterGrid.module.css'

export type filterDataProps = {
  isSelf?: boolean
}

const FilterGrid = ({ isSelf = false }: filterDataProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const categoryList = isSelf
    ? useAppSelector(selfCategoryFilterList)
    : useAppSelector(withCategoryFilterList)
  const filterModalCheckedStatus = useAppSelector(filterModalCheckedState)
  const modalFilterParams = useAppSelector(selfModalFilterParams)
  const isLogon = useAppSelector(selectAccessToken)

  const allSelectedRef = useRef({ isAllSelected: false })
  const categoryListRef = useRef({ categoryList: categoryList })

  const clickEvent = async (content: string) => {
    if (isSelf && content === 'ALL') {
      allSelectedRef.current.isAllSelected =
        !allSelectedRef.current.isAllSelected
      const newList = allSelectedRef.current.isAllSelected
        ? categoryList.map(item =>
            !item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
          )
        : categoryList.map(item =>
            item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
          )
      dispatch(setSelfCategoryFilterList(newList))
      categoryListRef.current.categoryList = newList
    } else if (
      isSelf &&
      content !== 'ALL' &&
      allSelectedRef.current.isAllSelected
    ) {
      allSelectedRef.current.isAllSelected =
        !allSelectedRef.current.isAllSelected
      const newList = categoryList.map(item =>
        item.content === content || item.content === 'ALL'
          ? { ...item, isSelected: !item.isSelected }
          : item,
      )
      dispatch(setSelfCategoryFilterList(newList))
      categoryListRef.current.categoryList = newList
    } else {
      const newList = categoryList.map(item =>
        item.content === content
          ? { ...item, isSelected: !item.isSelected }
          : item,
      )
      categoryListRef.current.categoryList = newList
      if (isSelf) {
        dispatch(setSelfCategoryFilterList(newList))
      } else {
        dispatch(setWithCategoryFilterList(newList))
      }
    }

    const categoryStringList = categoryListRef.current.categoryList
      .filter(item => item.isSelected && item.content !== 'ALL')
      .map(item => item.content)
    let params = categoryStringList.join('&category=')
    if (categoryStringList.length >= 1) {
      params = 'category=' + params
    }

    dispatch(setSelfCategoryFilterParams(params))

    if (isSelf && params && filterModalCheckedStatus) {
      params += '&' + modalFilterParams
    } else if (isSelf && !params && filterModalCheckedStatus) {
      params += modalFilterParams
    }

    const response = isSelf
      ? isLogon
        ? await dispatch(getAuthSelfCategoryListAPI(params)).unwrap()
        : await getSelfCategoryListAPI(params)
      : isLogon
      ? await dispatch(getAuthWithCategoryListAPI(params)).unwrap()
      : await getWithCategoryListAPI(params)

    switch (response.statusCode) {
      case 404:
        navigate('/error')
        return
      case 400:
        alert(
          '해당 카테고리에 해당하는 툴이 없습니다. 빠른 시일 내에 제공해드릴게요.',
        )
        dispatch(
          isSelf
            ? setSelfCategoryFilterList(
                categoryList.map(item =>
                  item.isSelected
                    ? { ...item, isSelected: !item.isSelected }
                    : item,
                ),
              )
            : setWithCategoryFilterList(
                categoryList.map(item =>
                  item.isSelected
                    ? { ...item, isSelected: !item.isSelected }
                    : item,
                ),
              ),
        )

        // eslint-disable-next-line no-case-declarations
        const responseData = isSelf
          ? filterModalCheckedStatus
            ? isLogon
              ? await dispatch(
                  getAuthSelfCategoryListAPI(modalFilterParams),
                ).unwrap()
              : await getSelfCategoryListAPI(modalFilterParams)
            : isLogon
            ? await dispatch(getAuthSelfMainInfoAPI()).unwrap()
            : await getSelfMainInfoAPI()
          : isLogon
          ? await dispatch(getAuthWithMainInfoAPI()).unwrap()
          : await getWithMainInfoAPI()
        if (isSelf) {
          dispatch(setSelfMainInfoList(responseData.data))
          dispatch(setSelfCategoryFilterParams(''))
        } else {
          dispatch(setWithMainInfoList(responseData.data))
        }
        return
      default:
        if (isSelf) {
          dispatch(setSelfMainInfoList(response.data))
        } else {
          dispatch(setWithMainInfoList(response.data))
        }
    }
  }

  return (
    <div className={styles.layout}>
      {categoryList.map((item, idx) => (
        <Chip
          key={idx}
          type={item.type}
          isSelected={item.isSelected}
          content={item.content}
          clickEvent={() => clickEvent(item.content)}
        />
      ))}
    </div>
  )
}

export default FilterGrid
