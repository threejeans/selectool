import { stubArray } from 'lodash'
import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './withCard.module.css'
import companyLogoEx from 'assets/daangn_logo.png'
import toolLogoEx01 from 'assets/gandi_logo.png'
import toolLogoEx02 from 'assets/slack_logo.svg'
import toolLogoEx03 from 'assets/figma_logo.png'
import { WithMainInfo } from 'types/DataTypes'

type CardProps = {
  data: WithMainInfo
 }

const WithCard = ({data}: CardProps) => {
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
                src={companyLogoEx}
                className={styles.companyLogoHover}
              ></img>
            </div>
            <div className={styles.textContainerHover}>
              <div className={styles.companyNameHover}>당근마켓</div>
              <div className={styles.descriptionHover}>
                지역 기반 중고 직거래 플랫폼 &rsquo;당근마켓&rsquo;을 운영하는
                기업
              </div>
            </div>
          </div>
          <hr className={styles.lineHover}></hr>
          <div className={styles.selectoolContainer}>
            <div className={styles.selectoolTitle}>
              당근마켓&apos;s{' '}
              <span className={styles.selectoolPoint}>SELECTOOL</span>
            </div>
            <div className={styles.toolLayout}>
              <div className={styles.toolContainer}>
                <img src={toolLogoEx01} className={styles.toolLogo}></img>
                <div className={styles.toolName}>잔디</div>
              </div>
              <div className={styles.toolContainer}>
                <img src={toolLogoEx02} className={styles.toolLogo}></img>
                <div className={styles.toolName}>슬랙</div>
              </div>
              <div className={styles.toolContainer}>
                <img src={toolLogoEx03} className={styles.toolLogo}></img>
                <div className={styles.toolName}>피그마</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentsContainer}>
          <div className={styles.companyLogoContainer}>
            <img src={companyLogoEx} className={styles.companyLogo}></img>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.companyInfoContainer}>
              <div className={styles.companyName}>당근마켓</div>
              <div className={styles.companyCoName}>(주)당근마켓</div>
            </div>
            <div className={styles.description}>
              지역 기반 중고 직거래 플랫폼 &rsquo;당근마켓&rsquo;을 운영하는
              기업
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WithCard
