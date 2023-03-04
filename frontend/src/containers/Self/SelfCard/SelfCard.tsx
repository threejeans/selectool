import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './SelfCard.module.css'
import { Link } from 'react-router-dom'
import { SelfMainInfo } from 'types/types'

type CardProps = {
  data: SelfMainInfo
}

const SelfCard = ({ data }: CardProps) => {
  const [isScraped, setScraped] = useState(false)
  const [isHover, setHover] = useState(false)

  const handleScrap = () => {
    setScraped(!isScraped)
    // clickEvent
  }

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
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          isScraped ? styles.bookmarkScraped : null
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
