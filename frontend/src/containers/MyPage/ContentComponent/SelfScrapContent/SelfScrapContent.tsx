import React, { useEffect } from 'react'
import { CommonLayout, SelfScrapCardGrid } from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selfMainInfoList, setSelfMainInfoList } from 'reducers/selfReducer'
import { resetSelfScrapCount, setSelfScrapList } from 'reducers/settingReducer'
import { getAuthSelfMainInfoAPI } from 'api/authSelf'
import { useNavigate } from 'react-router-dom'

const SelfScrapContent = () => {
  const mainInfoList = useAppSelector(selfMainInfoList)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getScrapList = async () => {
    dispatch(resetSelfScrapCount())
    if (mainInfoList.length === 0) {
      const response = await dispatch(getAuthSelfMainInfoAPI()).unwrap()

      if (response.isNotFound404) {
        navigate('/error')
      } else {
        dispatch(setSelfMainInfoList(response.data))
      }
    }

    const newScrapList = mainInfoList.filter(item => item.isBookmarked === true)
    dispatch(setSelfScrapList(newScrapList))
  }

  useEffect(() => {
    getScrapList()
  }, [mainInfoList])

  return (
    <CommonLayout type='bookmark'>
      <SelfScrapCardGrid />
    </CommonLayout>
  )
}

export default SelfScrapContent
