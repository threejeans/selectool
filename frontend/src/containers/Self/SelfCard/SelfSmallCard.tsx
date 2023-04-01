// PC 마이페이지 용
import React, { useEffect, useState } from 'react'
import styles from './SelfCard.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selfMainInfoList, setSelfMainInfoList } from 'reducers/selfReducer'
import { SelfMainInfo } from 'types/types'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { selfUnscrapToolAPI } from 'api/authSelf'
import { setSelfScrapList } from 'reducers/settingReducer'

type CardProps = {
  data: SelfMainInfo
}

const SelfSmallCard = ({ data }: CardProps) => {
  const [toastStatus, setToastStatus] = useState(false)
  const selfMainList = useAppSelector(selfMainInfoList)

  const dispatch = useAppDispatch()

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async () => {
    const response = await dispatch(selfUnscrapToolAPI(data.id)).unwrap()

    if (response.statusCode === 200 || response.statusCode === 201) {
      const newList = selfMainList.map(item =>
        item.id === data.id
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item,
      )
      dispatch(setSelfMainInfoList(newList))

      const newScrapList = selfMainList.filter(
        item => item.isBookmarked === true,
      )
      dispatch(setSelfScrapList(newScrapList))

      handleToast()
    } else {
      console.log('error', response.statusCode)
    }
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000)
    }
  })

  return (
    <div className={styles.smallCardContainer}>
      {toastStatus && (
        <div className={`${styles.toast} ${styles.toast_cancel}`}>
          북마크가 취소되었어요
        </div>
      )}
      <BsFillBookmarkFill
        className={`${styles.smallBookmark} ${
          data.isBookmarked ? styles.bookmarkScraped : null
        }`}
        onClick={handleScrap}
      ></BsFillBookmarkFill>
      <div className={styles.contentsSmallContainer}>
        <div className={styles.appIconSmallContainer}>
          <img src={data.image} className={styles.appIconSmall}></img>
        </div>
        <div className={styles.textSmallContainer}>
          <div className={styles.typeSmall}>{data.topic}</div>
          <div className={styles.nameSmall}>{data.nameKr}</div>
          <div className={styles.descriptionSmall}>{data.info}</div>
        </div>
      </div>
    </div>
  )
}

export default SelfSmallCard
