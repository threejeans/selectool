import SearchForm from 'components/SearchForm'
import React from 'react'
import FilterGrid from '../FilterGrid'
import styles from './FilterSection.module.css'
import filterIcon from 'assets/filter_icon.svg'
import filterIconSelected from 'assets/filter_icon_selected.svg'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  changeFilterModalStatus,
  filterModalCheckedState,
  setSelfMainInfoList,
} from 'reducers/selfReducer'
import SelfFilterModal from 'containers/Self/SelfFilterModal/SelfFilterModal'
import { changeSearchDataStatus, searchValue } from 'reducers/commonReducer'
import { getSelfSearchListAPI } from 'api/self'
import { useNavigate } from 'react-router-dom'
import { getWithSearchListAPI } from 'api/with'
import { setWithMainInfoList } from 'reducers/withReducer'
import { selectAccessToken } from 'features/auth/authSlice'
import { getAuthSelfSearchListAPI } from 'api/authSelf'
import { getAuthWithSearchListAPI } from 'api/authWith'

export type filterProps = {
  isFilterButton?: boolean
  placeholder?: string
}

const FilterSection = ({
  isFilterButton = false,
  placeholder,
}: filterProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const searchContent = useAppSelector(searchValue)
  const filterModalCheckedStatus = useAppSelector(filterModalCheckedState)
  const isLogon = useAppSelector(selectAccessToken)

  const openModal = () => {
    dispatch(changeFilterModalStatus())
  }

  const searchEvent = async () => {
    if (isFilterButton) {
      const response = isLogon
        ? await dispatch(getAuthSelfSearchListAPI(searchContent)).unwrap()
        : await getSelfSearchListAPI(searchContent)
      switch (response.statusCode) {
        case 404:
          navigate('/error')
          return
        case 400:
          dispatch(changeSearchDataStatus(true))
          return
        default:
          dispatch(setSelfMainInfoList(response.data))
          dispatch(changeSearchDataStatus(false))
      }
    } else {
      const response = isLogon
        ? await dispatch(getAuthWithSearchListAPI(searchContent)).unwrap()
        : await getWithSearchListAPI(searchContent)
      switch (response.statusCode) {
        case 404:
          navigate('/error')
          return
        case 400:
          dispatch(changeSearchDataStatus(true))
          return
        default:
          dispatch(setWithMainInfoList(response.data))
          dispatch(changeSearchDataStatus(false))
      }
    }
  }

  return (
    <div className={styles.layout}>
      <SelfFilterModal />
      <FilterGrid isSelf={isFilterButton}></FilterGrid>
      <div className={styles.rightSection}>
        {isFilterButton ? (
          <button
            className={
              filterModalCheckedStatus ? styles.buttonSelected : styles.button
            }
            onClick={openModal}
          >
            <img
              src={filterModalCheckedStatus ? filterIconSelected : filterIcon}
              alt=''
              className={styles.iconImage}
            />
          </button>
        ) : null}
        <SearchForm placeholder={placeholder} submitEvent={searchEvent} />
      </div>
    </div>
  )
}

export default FilterSection
