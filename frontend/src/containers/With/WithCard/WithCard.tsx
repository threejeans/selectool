import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './withCard.module.css'
import { WithCorpType } from 'types/types'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { withScrapToolAPI, withUnscrapToolAPI } from 'api/authWith'

type CardProps = {
  data: WithCorpType
}

const WithCard = ({ data }: CardProps) => {
  const [isScraped, setScraped] = useState(false)
  const [isHover, setHover] = useState(false)
  const isLogon = useAppSelector(selectAccessToken) !== undefined
  const dispatch = useAppDispatch()

  const handleScrap = async (corpId?: number) => {
    if (isLogon) {
      if (isScraped) {
        await dispatch(withUnscrapToolAPI(corpId))
      } else {
        await dispatch(withScrapToolAPI(corpId))
      }
      setScraped(!isScraped)
    } else {
      dispatch(loginModalOpen())
    }
  }

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.topBar}></div>
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          isScraped ? styles.bookmarkScraped : null
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
