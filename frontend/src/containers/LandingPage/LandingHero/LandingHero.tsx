import React from 'react'
import styles from './LandingHero.module.css'
import Image from 'assets/landing_image.png'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown } from 'react-icons/bs'
import { Pc, ResponsiveProps } from 'components/Layout'
import { useMediaQuery } from 'react-responsive'

const LandingHero = () => {
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
        <Pc>
          <h1 className={styles.title} data-aos='fade-up'>
            나{/* scroller start */}
            <div className={styles.scroller}>
              <div className={styles.scroller_item}>
                <Link to={'/self'}>혼자</Link>
                <br />
                <Link to={'/with'}>함께</Link>
              </div>
            </div>
            {/* scroller end */}일 할건데 업무툴 뭐 써야 좋지?
          </h1>
        </Pc>
        <DownTablet>
          <div className={styles.titleContainer} data-aos='fade-up'>
            <h1 className={styles.titleTop}>
              나
              <div className={styles.scroller}>
                <div className={styles.scroller_item}>
                  <Link to={'/self'}>혼자</Link>
                  <br />
                  <Link to={'/with'}>함께</Link>
                </div>
              </div>
              일 할건데
            </h1>
            <h1 className={styles.titleBottom}>업무툴 뭐 써야 좋지?</h1>
          </div>
        </DownTablet>
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

export default LandingHero

export const DownTablet = ({ children }: ResponsiveProps) => {
  const isDownTablet = useMediaQuery({
    query: '(max-width:1079px)',
  })
  return <>{isDownTablet && children}</>
}
