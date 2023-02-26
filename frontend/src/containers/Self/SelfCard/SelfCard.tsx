import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './SelfCard.module.css'
import imageSample from 'assets/notion.svg'
import { Link } from 'react-router-dom'

const SelfCard = () => {
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
              <div className={styles.typeEng}>ARCHIVING</div>
              <div className={styles.hookText}>Better Together</div>
            </div>
            <div className={styles.aTag}>
              <Link to={'/self'}>노션에 대해 더 알아보기 →</Link>
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
          <img src={imageSample} className={styles.appIcon}></img>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.type}>아카이빙</div>
          <div className={styles.name}>노션</div>
          <div className={styles.description}>
            프로젝트 관리 및 기록 소프트웨어
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfCard
