import React, { useEffect } from 'react'
import { CommonLayout } from '../../CommonComponent'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  resetGuideScrapCount,
  setGuideScrapList,
} from 'reducers/settingReducer'
import { getMemberGuideList, selectGuideList } from 'reducers/guideReducer'
import GuideScrapCardGrid from 'containers/MyPage/CommonComponent/CardGrid/GuideScrapCardGrid'

const GuideScrapContent = () => {
  const mainInfoList = useAppSelector(selectGuideList)

  const dispatch = useAppDispatch()

  const getScrapList = async () => {
    dispatch(resetGuideScrapCount())

    if (mainInfoList.length == 0) {
      await dispatch(getMemberGuideList())
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
