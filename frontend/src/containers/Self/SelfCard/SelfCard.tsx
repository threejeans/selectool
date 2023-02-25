import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './SelfCard.module.css'
import { Link } from 'react-router-dom'
import { SelfMainInfo } from 'types/DataTypes'

type CardProps = {
 data: SelfMainInfo
}

const SelfCard = ({data}: CardProps) => {
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
      {isHover ? (
        <div className={styles.hoverContainer}>
          <div className={styles.hoverContentLayout}>
            <div className={styles.hoverTextSection}>
              <div className={styles.typeEng}>{data.individualToolTagEn.toUpperCase()}</div>
              <div className={styles.hookText}>Better Together</div>
            </div>
            <div className={styles.aTag}>
              <Link to={'/self'}>{data.individualToolNameKr}에 대해 더 알아보기 →</Link>
            </div>
          </div>
        </div>
      ) : null}
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          isScraped ? styles.bookmarkScraped : null
        }`}
        onClick={handleScrap}
      ></BsFillBookmarkFill>
      <div className={styles.contentsContainer}>
        <div className={styles.appIconContainer}>
          <img src={data.individualToolLogo} className={styles.appIcon}></img>
        </div> 
        <div className={styles.textContainer}>
          <div className={styles.type}>{data.individualToolTagKr}</div>
          <div className={styles.name}>{data.individualToolNameKr}</div>
          <div className={styles.description}>
            {data.individualToolInfo}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfCard
