import React from 'react'
import styles from './LandingHero.module.css'
import Image from 'assets/landing_image.png'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown } from 'react-icons/bs'

const LandingHeroMobile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.imageMobile}
          src={Image}
          alt={'랜딩 이미지'}
          data-aos='fade-up'
          data-aos-duration='1500'
        />
        <div className={styles.titleMobileWide} data-aos='fade-up'>
          <h1 className={styles.titleTopMobile}>
            나{/* scroller start */}
            <div className={styles.scrollerMobile}>
              <div className={styles.scroller_itemMobile}>
                <Link to={'/self'}>혼자</Link>
                <br />
                <Link to={'/with'}>함께</Link>
              </div>
            </div>
            {/* scroller end */}일 할건데
          </h1>
          <h1 className={styles.titleBottomMobile}>업무툴 뭐 써야 좋지?</h1>
        </div>
      </div>
      <div>
        <a href='#section02'>
          <div className={`${styles.scrollArrow} ${styles.arrowMobile}`}>
            <BsChevronCompactDown />
          </div>
          <div className={`${styles.scrollArrow} ${styles.arrowMobile}`}>
            <BsChevronCompactDown />
          </div>
          <div className={`${styles.scrollArrow} ${styles.arrowMobile}`}>
            <BsChevronCompactDown />
          </div>
        </a>
      </div>
    </div>
  )
}

export default LandingHeroMobile
