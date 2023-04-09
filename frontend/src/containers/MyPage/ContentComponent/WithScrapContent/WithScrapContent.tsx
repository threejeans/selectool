import React, { useEffect } from 'react'
import { CommonLayout, WithScrapCardGrid } from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setWithMainInfoList, withMainInfoList } from 'reducers/withReducer'
import { useNavigate } from 'react-router-dom'
import { resetWithScrapCount, setWithScrapList } from 'reducers/settingReducer'
import { getAuthWithMainInfoAPI } from 'api/authWith'

const WithScrapContent = () => {
  const mainInfoList = useAppSelector(withMainInfoList)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getScrapList = async () => {
    dispatch(resetWithScrapCount())
    if (mainInfoList.length === 0) {
      const response = await dispatch(getAuthWithMainInfoAPI()).unwrap()

      if (response.isNotFound404) {
        navigate('/error')
      } else {
        dispatch(setWithMainInfoList(response.data))
      }
    }

    const newScrapList = mainInfoList.filter(item => item.isBookmarked === true)
    dispatch(setWithScrapList(newScrapList))
  }

  useEffect(() => {
    getScrapList()
  }, [mainInfoList])

  return (
    <CommonLayout type='bookmark'>
      <WithScrapCardGrid />
    </CommonLayout>
  )
}

export default WithScrapContent
