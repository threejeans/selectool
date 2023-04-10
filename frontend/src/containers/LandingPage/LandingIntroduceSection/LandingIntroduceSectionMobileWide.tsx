import React from 'react'
import styles from './LandingIntroduce.module.css'
import commonStyles from '../../../styles/pages/landingPage/Landing.module.css'
import emLeft from 'assets/landing_introduce_em_left.svg'
import emRight from 'assets/landing_introduce_em_right.svg'

const LandingIntroduceSectionMobileWide = () => {
  return (
    <div id='section02' className={styles.containerMobile}>
      <div className={styles.contentsMobile}>
        <div className={styles.titleSection}>
          <div className={commonStyles.title_container} data-aos='fade-up'>
            <h2
              className={`${commonStyles.bold} ${styles.margin_right} ${commonStyles.h2Mobile}`}
            >
              셀렉툴은 개인·팀·기업을 위한 <br />
              업무 툴 통합 비교 서비스에요
            </h2>
            <div className={commonStyles.title_bar_mobile}></div>
          </div>
          <div className={commonStyles.description_mobile} data-aos='fade-up'>
            원격 근무로 인해 셀 수 없이 늘어난 협업툴을 <br />
            사용하는 이용자들의 불편함을 해소하고자 시작했어요.
          </div>
        </div>
        <div className={styles.bubbbleSectionMobile}>
          <div
            className={`${styles.bubble_container_mobilewide} ${styles.bubble_01_mobilewide}`}
            data-aos='fade-up'
          >
            <img
              className={styles.bubble_em_left_mobile}
              src={emLeft}
              alt={''}
            />
            <div className={styles.bubble_text_mobile}>
              &quot;툴 배우다 끝날 판&rdquo;
            </div>
          </div>
          <div
            className={`${styles.bubble_container_mobilewide} ${styles.bubble_02_mobilewide}`}
            data-aos='fade-up'
          >
            <img
              className={styles.bubble_em_right_mobile}
              src={emRight}
              alt={''}
            />
            <div className={styles.bubble_text_mobile}>
              &quot;정신없이 늘리다보니 <br /> 고정 구독료가 너무
              부담돼요&rdquo;
            </div>
          </div>
          <div
            className={`${styles.bubble_container_mobilewide} ${styles.bubble_03_mobilewide}`}
            data-aos='fade-up'
          >
            <img
              className={styles.bubble_em_left_mobile}
              src={emLeft}
              alt={''}
            />
            <div className={styles.bubble_text_mobile}>“보안·보안·보안”</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingIntroduceSectionMobileWide
