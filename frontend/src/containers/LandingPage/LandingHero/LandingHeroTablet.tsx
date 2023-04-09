import React from 'react'
import styles from './LandingHero.module.css'
import Image from 'assets/landing_image.png'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown } from 'react-icons/bs'

const LandingHeroTablet = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.image}
          src={Image}
          alt={'랜딩 이미지'}
          data-aos='fade-up'
          data-aos-duration='1500'
        />
        <div className={styles.titleTablet} data-aos='fade-up'>
          <h1 className={styles.titleTop}>
            나{/* scroller start */}
            <div className={styles.scroller}>
              <div className={styles.scroller_item}>
                <Link to={'/self'}>혼자</Link>
                <br />
                <Link to={'/with'}>함께</Link>
              </div>
            </div>
            {/* scroller end */}일 할건데
          </h1>
          <h1 className={styles.titleBottom}>업무툴 뭐 써야 좋지?</h1>
        </div>
      </div>
      <div>
        <a href='#section02'>
          <div className={styles.scrollArrow}>
            <BsChevronCompactDown />
          </div>
          <div className={styles.scrollArrow}>
            <BsChevronCompactDown />
          </div>
          <div className={styles.scrollArrow}>
            <BsChevronCompactDown />
          </div>
        </a>
      </div>
    </div>
  )
}

export default LandingHeroTablet
