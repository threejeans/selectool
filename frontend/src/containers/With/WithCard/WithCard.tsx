import React, { useEffect, useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './withCard.module.css'
import { WithCorpType } from 'types/types'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { withScrapToolAPI, withUnscrapToolAPI } from 'api/authWith'
import { setWithMainInfoList, withMainInfoList } from 'reducers/withReducer'

type CardProps = {
  data: WithCorpType
}

const WithCard = ({ data }: CardProps) => {
  const [isHover, setHover] = useState(false)
  const [toastStatus, setToastStatus] = useState(false)

  const dispatch = useAppDispatch()

  const isLogon = useAppSelector(selectAccessToken) !== undefined
  const withMainList = useAppSelector(withMainInfoList)

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async (corpId?: number) => {
    if (isLogon) {
      const response = data.isBookmarked
        ? await dispatch(withUnscrapToolAPI(data.id)).unwrap()
        : await dispatch(withScrapToolAPI(data.id)).unwrap()

      if (response.statusCode === 200 || response.statusCode === 201) {
        const newList = withMainList.map(item =>
          item.id === data.id
            ? { ...item, isBookmarked: !item.isBookmarked }
            : item,
        )
        dispatch(setWithMainInfoList(newList))
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

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.topBar}></div>
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
        onClick={() => handleScrap(data.id)}
      ></BsFillBookmarkFill>
      <Link to={`/with/${data.id}`} className={styles.clickContainer}>
        {isHover ? (
          <div className={styles.hoverContainer}>
            <div className={styles.hoverCompanyContainer}>
              <div>
                <img src={data.image} className={styles.companyLogoHover}></img>
              </div>
              <div className={styles.textContainerHover}>
                <div className={styles.companyNameHover}>{data.nameKr}</div>
                <div className={styles.descriptionHover}>{data.info}</div>
              </div>
            </div>
            <hr className={styles.lineHover}></hr>
            <div className={styles.selectoolContainer}>
              <div className={styles.selectoolTitle}>
                {data.nameKr}&apos;s{' '}
                <span className={styles.selectoolPoint}>SELECTOOL</span>
              </div>
              <div className={styles.toolLayout}>
                {data.tools.slice(0, 3).map((tool, idx) => (
                  <div className={styles.toolContainer} key={idx}>
                    <img src={tool.image} className={styles.toolLogo}></img>
                    <div className={styles.toolNameHover}>{tool.nameKr}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.contentsContainer}>
            <div className={styles.companyLogoContainer}>
              <img src={data.image} className={styles.companyLogo}></img>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.companyInfoContainer}>
                <div className={styles.companyName}>{data.nameKr}</div>
                <div className={styles.companyCoName}>{data.teamNameKr}</div>
              </div>
              <div className={styles.description}>{data.info}</div>
            </div>
          </div>
        )}
      </Link>
    </div>
  )
}

export default WithCard
