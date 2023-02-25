import { stubArray } from 'lodash'
import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './withCard.module.css'
import { WithMainInfo } from 'types/DataTypes'

type CardProps = {
  data: WithMainInfo
}

const WithCard = ({ data }: CardProps) => {
  const [isScraped, setScraped] = useState(false)
  const [isHover, setHover] = useState(false)

  const handleScrap = () => {
    setScraped(!isScraped)
    // clickEvent
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
        onClick={handleScrap}
      ></BsFillBookmarkFill>

      {isHover ? (
        <div className={styles.hoverContainer}>
          <div className={styles.hoverCompanyContainer}>
            <div>
              <img
                src={data.withCorpLogo}
                className={styles.companyLogoHover}
              ></img>
            </div>
            <div className={styles.textContainerHover}>
              <div className={styles.companyNameHover}>
                {data.withCorpNameKr}
              </div>
              <div className={styles.descriptionHover}>{data.withCorpInfo}</div>
            </div>
          </div>
          <hr className={styles.lineHover}></hr>
          <div className={styles.selectoolContainer}>
            <div className={styles.selectoolTitle}>
              {data.withCorpNameKr}&apos;s{' '}
              <span className={styles.selectoolPoint}>SELECTOOL</span>
            </div>
            <div className={styles.toolLayout}>
              {data.withCorpTool.map((tool, idx) => (
                <div className={styles.toolContainer} key={idx}>
                  <img src={tool.toolLogo} className={styles.toolLogo}></img>
                  <div className={styles.toolName}>{tool.toolName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentsContainer}>
          <div className={styles.companyLogoContainer}>
            <img src={data.withCorpLogo} className={styles.companyLogo}></img>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.companyInfoContainer}>
              <div className={styles.companyName}>{data.withCorpNameKr}</div>
              <div className={styles.companyCoName}>{data.withTeamNameKr}</div>
            </div>
            <div className={styles.description}>{data.withCorpInfo}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WithCard
