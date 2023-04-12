import React, { useEffect } from 'react'
import { CommonLayout } from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  guideListForScrap,
  resetGuideScrapCount,
  setGuideListForScrap,
  setGuideScrapList,
} from 'reducers/settingReducer'
import GuideScrapCardGrid from 'containers/MyPage/CommonComponent/CardGrid/GuideScrapCardGrid'
import { useNavigate } from 'react-router-dom'
import { getAuthGuideInfoAPI } from 'api/setting'

const GuideScrapContent = () => {
  const mainInfoList = useAppSelector(guideListForScrap)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getScrapList = async () => {
    dispatch(resetGuideScrapCount())

    if (mainInfoList.length === 0) {
      const response = await dispatch(getAuthGuideInfoAPI()).unwrap()

      if (response.isNotFound404) {
        navigate('/error')
      } else {
        dispatch(setGuideListForScrap(response.data))
      }
    }

    const newScrapList = mainInfoList.filter(item => item.isBookmarked === true)
    dispatch(setGuideScrapList(newScrapList))
  }

  useEffect(() => {
    getScrapList()
  }, [mainInfoList])

  return (
    <CommonLayout type='bookmark'>
      <GuideScrapCardGrid />
    </CommonLayout>
  )
}

export default GuideScrapContent
