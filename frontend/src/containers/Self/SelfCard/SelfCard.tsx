import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './SelfCard.module.css'
import { Link } from 'react-router-dom'
import { SelfMainInfo } from 'types/types'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { selfScrapToolAPI, selfUnscrapToolAPI } from 'api/authSelf'
import { selfMainInfoList, setSelfMainInfoList } from 'reducers/selfReducer'

type CardProps = {
  data: SelfMainInfo
}

const SelfCard = ({ data }: CardProps) => {
  const [isHover, setHover] = useState(false)
  const [toastStatus, setToastStatus] = useState(false)

  const dispatch = useAppDispatch()

  const isLogon = useAppSelector(selectAccessToken)
  const selfMainList = useAppSelector(selfMainInfoList)

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async () => {
    if (isLogon) {
      const response = data.isBookmarked
        ? await dispatch(selfUnscrapToolAPI(data.id)).unwrap()
        : await dispatch(selfScrapToolAPI(data.id)).unwrap()

      if (response.statusCode === 200 || response.statusCode === 201) {
        const newList = selfMainList.map(item =>
          item.id === data.id
            ? { ...item, isBookmarked: !item.isBookmarked }
            : item,
        )
        dispatch(setSelfMainInfoList(newList))
        handleToast()
      } else {
        console.log('error', response.statusCode)
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

  const topicObject: {
    [index: string]: {
      en: string
    }
  } = {
    디자인: { en: 'Design' },
    아카이빙: { en: 'Archiving' },
    화상회의: { en: 'online Meeting' },
    화이트보드: { en: 'white board' },
    개발: { en: 'Development' },
  }

  let topicEn = 'Etc'

  if (topicObject[data.topic]) {
    topicEn = topicObject[data.topic].en
  }

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isHover ? (
        <div className={styles.hoverContainer}>
          <div className={styles.hoverContentLayout}>
            <div className={styles.hoverTextSection}>
              <div className={styles.typeEng}>{topicEn.toUpperCase()}</div>
              <div className={styles.hookText}>{data.msg}</div>
            </div>
            <div className={styles.aTag}>
              <Link to={`/self/${data.id}`}>
                {data.nameKr}에 대해 더 알아보기 →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      {toastStatus && (
        <div
          className={`${styles.toast} ${
            data.isBookmarked ? '' : styles.toast_cancel
          }`}
        >
          {data.isBookmarked
            ? '북마크에 추가되었어요'
            : '북마크가 취소되었어요'}
        </div>
      )}
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          data.isBookmarked ? styles.bookmarkScraped : null
        }`}
        onClick={handleScrap}
      ></BsFillBookmarkFill>
      <div className={styles.contentsContainer}>
        <div className={styles.appIconContainer}>
          <img src={data.image} className={styles.appIcon}></img>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.type}>{data.topic}</div>
          <div className={styles.name}>{data.nameKr}</div>
          <div className={styles.description}>{data.info}</div>
        </div>
      </div>
    </div>
  )
}

export default SelfCard
