import { selfScrapToolAPI, selfUnscrapToolAPI } from 'api/authSelf'
import { withScrapToolAPI, withUnscrapToolAPI } from 'api/authWith'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { selfSpecificInfo } from 'reducers/selfReducer'
import { withSpecificInfo } from 'reducers/withReducer'
import styles from './DetailMainCard.module.css'

type ÇardProps = {
  isSelf?: boolean
  image?: string
  nameKr?: string
  info?: string
  id?: number
  isBookmarked: boolean
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
  button1ClickEvent,
  button2ClickEvent,
  button3ClickEvent,
}: ÇardProps) => {
  const [isScraped, setScraped] = useState(isBookmarked)
  const [toastStatus, setToastStatus] = useState(false)

  const isLogon = useAppSelector(selectAccessToken) !== undefined

  const dispatch = useAppDispatch()

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async () => {
    if (isLogon) {
      if (isSelf) {
        const response = isScraped
          ? await dispatch(selfUnscrapToolAPI(id)).unwrap()
          : await dispatch(selfScrapToolAPI(id)).unwrap()

        if (response.statusCode === 200 || response.statusCode === 201) {
          setScraped(!isScraped)
          handleToast()
        } else {
          console.log('error', response.statusCode)
        }
      } else {
        const response = isScraped
          ? await dispatch(withUnscrapToolAPI(id)).unwrap()
          : await dispatch(withScrapToolAPI(id)).unwrap()

        if (response.statusCode === 200 || response.statusCode === 201) {
          setScraped(!isScraped)
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
          className={`${styles.toast} ${isScraped ? '' : styles.toast_cancel}`}
        >
          {isScraped ? '북마크에 추가되었어요' : '북마크가 취소되었어요'}
        </div>
      )}
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          isScraped ? styles.bookmarkScraped : null
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
            text={'구독하기'}
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
