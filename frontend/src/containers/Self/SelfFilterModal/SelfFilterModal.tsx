import { getSelfCategoryListAPI, getSelfMainInfoAPI } from 'api/self'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import Chip from 'components/Chip'
import Modal from 'components/Modal'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  changeFilterModalCheckedStatus,
  changeFilterModalStatus,
  filterModalState,
  filterObjectType,
  selfCategoryFilterParams,
  selfModalFilterList,
  setSelfMainInfoList,
  setSelfModalFilterList,
  setSelfModalFilterParams,
} from 'reducers/selfReducer'
import styles from './SelfFilterModal.module.css'

type ContentProps = {
  title: string
  type: string
}

export type filterList = {
  [key: string]: filterObjectType[]
}

const SelfFilterModal = () => {
  const modalStatus = useAppSelector(filterModalState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const closemodal = () => {
    dispatch(changeFilterModalStatus())
    resetItems()
  }
  const modalFilterList = useAppSelector(selfModalFilterList)
  const categoryFilterParams = useAppSelector(selfCategoryFilterParams)
  const newList: filterList = {
    cost: [...modalFilterList['cost']],
    sort: [...modalFilterList['sort']],
    country: [...modalFilterList['country']],
  }

  const resetItems = () => {
    newList['cost'] = newList['cost'].map(item =>
      item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
    )
    newList['sort'] = newList['sort'].map(item =>
      item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
    )
    newList['country'] = newList['country'].map(item =>
      item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
    )
    dispatch(setSelfModalFilterList(newList))
  }

  const resetEvent = async () => {
    resetItems()
    const responseData = categoryFilterParams
      ? await getSelfCategoryListAPI(categoryFilterParams)
      : await getSelfMainInfoAPI()
    dispatch(setSelfMainInfoList(responseData.data))
    dispatch(changeFilterModalCheckedStatus(false))
  }

  const allClickedEvent = async () => {
    const filterList = {
      cost: 'none',
      sort: 'none',
      country: 'none',
    }
    for (const item of modalFilterList.cost) {
      if (item.isSelected) {
        filterList.cost = item.content
      }
    }
    for (const item of modalFilterList.sort) {
      if (item.isSelected) {
        filterList.sort = item.content
      }
    }
    for (const item of modalFilterList.country) {
      if (item.isSelected && item.content === '전체') {
        filterList.country = item.content
        break
      } else if (
        item.isSelected &&
        item.content === '해외' &&
        filterList.country === '국내'
      ) {
        filterList.country = '전체'
      } else if (item.isSelected) {
        filterList.country = item.content
      }
    }
    if (
      filterList.cost === 'none' &&
      filterList.sort === 'none' &&
      filterList.country === 'none'
    ) {
      resetEvent()
    } else {
      let params = ''
      if (filterList.cost === '무료 플랜') {
        params += 'onlyTrial=true'
      } else {
        params += 'onlyTrial=false'
      }

      if (filterList.sort === '가나다순') {
        params += '&orderTarget=name'
      }
      if (filterList.sort === '북마크 많은 순') {
        params += '&orderTarget=bookmark'
      }
      if (filterList.country === '국내') {
        params += '&country=국내'
      }
      if (filterList.country === '해외') {
        params += '&country=해외'
      }
      dispatch(setSelfModalFilterParams(params))

      if (categoryFilterParams) {
        params = categoryFilterParams + '&' + params
      }

      const response = await getSelfCategoryListAPI(params)
      switch (response.statusCode) {
        case 404:
          navigate('/error')
          return
        case 400:
          alert(
            '해당 카테고리와 필터 해당하는 툴이 없습니다. 빠른 시일 내에 제공해드릴게요.',
          )
          resetItems()
          // eslint-disable-next-line no-case-declarations
          const responseData = categoryFilterParams
            ? await getSelfCategoryListAPI(categoryFilterParams)
            : await getSelfMainInfoAPI()
          dispatch(setSelfMainInfoList(responseData.data))

          dispatch(changeFilterModalCheckedStatus(false))
          dispatch(changeFilterModalStatus())
          return
        default:
          dispatch(setSelfMainInfoList(response.data))
          dispatch(changeFilterModalCheckedStatus(true))
          dispatch(changeFilterModalStatus())
      }
    }
  }

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
          <FilterContent title='💵 가격 범위' type={'cost'} />
          <FilterContent title='🗃 정렬' type={'sort'} />
          <FilterContent title='🌐 국가' type={'country'} />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            color={'outlined'}
            size={'md'}
            text={'초기화'}
            clickEvent={resetEvent}
          ></Button>
          <Button
            color={'primary'}
            size={'md'}
            text={'다 골랐어요!'}
            clickEvent={allClickedEvent}
          ></Button>
        </div>
      </div>
    </Modal>
  )
}

const FilterContent = ({ title, type }: ContentProps) => {
  const dispatch = useDispatch()

  const modalFilterList = useAppSelector(selfModalFilterList)
  const allSelectedRef = useRef({ isAllSelected: false })

  const newList: filterList = {
    cost: [...modalFilterList['cost']],
    sort: [...modalFilterList['sort']],
    country: [...modalFilterList['country']],
  }
  const modalFilterListRef = useRef({ filterList: newList })

  const chipClickEvent = (content: string) => {
    if (type === 'country' && content === '전체') {
      allSelectedRef.current.isAllSelected =
        !allSelectedRef.current.isAllSelected
      newList[type] = allSelectedRef.current.isAllSelected
        ? newList[type].map(item =>
            !item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
          )
        : newList[type].map(item =>
            item.isSelected ? { ...item, isSelected: !item.isSelected } : item,
          )
    } else if (
      type === 'country' &&
      content !== '전체' &&
      allSelectedRef.current.isAllSelected
    ) {
      allSelectedRef.current.isAllSelected =
        !allSelectedRef.current.isAllSelected
      newList[type] = newList[type].map(item =>
        item.content === content || item.content === '전체'
          ? { ...item, isSelected: !item.isSelected }
          : item,
      )
    } else {
      if (type === 'sort' || type === 'cost') {
        newList[type] = newList[type].map(item =>
          item.content !== content && item.isSelected
            ? { ...item, isSelected: !item.isSelected }
            : item,
        )
      }
      newList[type] = newList[type].map(item =>
        item.content === content
          ? { ...item, isSelected: !item.isSelected }
          : item,
      )
    }
    modalFilterListRef.current.filterList = newList
    dispatch(setSelfModalFilterList(newList))
  }

  return (
    <div className={styles.contentLayout}>
      <div className={styles.contentTitle}>{title}</div>
      <hr className={styles.line}></hr>
      <div className={styles.chipGrid}>
        {modalFilterList[type].map((item, idx) => (
          <Chip
            key={idx}
            type={item.type}
            isSelected={item.isSelected}
            content={item.content}
            clickEvent={() => chipClickEvent(item.content)}
          />
        ))}
      </div>
    </div>
  )
}

export default SelfFilterModal
