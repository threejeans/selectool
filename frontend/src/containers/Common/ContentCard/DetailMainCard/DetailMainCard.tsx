import { selfScrapToolAPI, selfUnscrapToolAPI } from 'api/authSelf'
import { withScrapToolAPI, withUnscrapToolAPI } from 'api/authWith'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { selfSpecificInfo, setSelfSpecificInfo } from 'reducers/selfReducer'
import { setWithSpecificInfo, withSpecificInfo } from 'reducers/withReducer'
import styles from './DetailMainCard.module.css'

type ÇardProps = {
  isSelf?: boolean
  image?: string
  nameKr?: string
  info?: string
  id?: number
  isBookmarked: boolean
  isSubscribed?: boolean
  button1ClickEvent: () => void
  button2ClickEvent: () => void
  button3ClickEvent: () => void
}

const DetailMainCard = ({
  isSelf = false,
  image,
  nameKr,
  info,
  id,
  isBookmarked,
  isSubscribed = false,
  button1ClickEvent,
  button2ClickEvent,
  button3ClickEvent,
}: ÇardProps) => {
  const dispatch = useAppDispatch()

  const isLogon = useAppSelector(selectAccessToken) !== undefined
  const specificInfo = isSelf
    ? useAppSelector(selfSpecificInfo)
    : useAppSelector(withSpecificInfo)

  const [toastStatus, setToastStatus] = useState(false)

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async () => {
    if (isLogon) {
      if (isSelf) {
        const response = isBookmarked
          ? await dispatch(selfUnscrapToolAPI(id)).unwrap()
          : await dispatch(selfScrapToolAPI(id)).unwrap()

        if (response.statusCode === 200 || response.statusCode === 201) {
          const newSpecificInfo = { ...specificInfo }
          newSpecificInfo.isBookmarked = !newSpecificInfo.isBookmarked
          dispatch(setSelfSpecificInfo(newSpecificInfo))
          handleToast()
        } else {
          console.log('error', response.statusCode)
        }
      } else {
        const response = isBookmarked
          ? await dispatch(withUnscrapToolAPI(id)).unwrap()
          : await dispatch(withScrapToolAPI(id)).unwrap()

        if (response.statusCode === 200 || response.statusCode === 201) {
          const newSpecificInfo = { ...specificInfo }
          newSpecificInfo.isBookmarked = !newSpecificInfo.isBookmarked
          dispatch(setWithSpecificInfo(newSpecificInfo))
          handleToast()
        } else {
          console.log('error', response.statusCode)
        }
      }
    } else {
      dispatch(loginModalOpen())
    }
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000)
    }
  })

  return (
    <div
      className={`${styles.cardLayout} ${
        isSelf ? null : styles.withCardLayout
      }`}
    >
      {toastStatus && (
        <div
          className={`${styles.toast} ${
            isBookmarked ? '' : styles.toast_cancel
          }`}
        >
          {isBookmarked ? '북마크에 추가되었어요' : '북마크가 취소되었어요'}
        </div>
      )}
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          isBookmarked ? styles.bookmarkScraped : null
        }`}
        onClick={handleScrap}
      ></BsFillBookmarkFill>
      <div className={styles.topSection}>
        <img src={image} className={styles.image}></img>
        <div className={styles.infoSection}>
          <div className={styles.name}>{nameKr}</div>
          <div className={styles.info}>{info}</div>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <div className={styles.smallButtons}>
          <Button
            color={isSelf ? 'secondary' : 'primary'}
            size={'mdShort'}
            text={'웹페이지 ↗'}
            clickEvent={button1ClickEvent}
          ></Button>
          <Button
            color={'secondary'}
            size={'mdShort'}
            text={isSelf ? '가이드 ↗' : '공유하기'}
            clickEvent={button2ClickEvent}
          ></Button>
        </div>
        {isSelf ? (
          <Button
            color={'primary'}
            size={'mdLong'}
            text={isSubscribed ? '구독 해제' : '구독하기'}
            clickEvent={button3ClickEvent}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default DetailMainCard
