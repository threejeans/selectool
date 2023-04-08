import React from 'react'
import styles from './LandingIntroduce.module.css'
import commonStyles from '../../../styles/pages/landingPage/Landing.module.css'
import emLeft from 'assets/landing_introduce_em_left.svg'
import emRight from 'assets/landing_introduce_em_right.svg'

const LandingIntroduceSectionMobile = () => {
  return (
    <div id='section02' className={styles.container}>
      <div className={styles.contents}>
        <div>
          <div
            className={`${styles.bubble_container} ${styles.bubble_01}`}
            data-aos='fade-up'
          >
            <img className={styles.bubble_em_left} src={emLeft} alt={''} />
            <div className={styles.bubble_text}>
              &quot;툴 배우다 끝날 판&rdquo;
            </div>
          </div>
          <div
            className={`${styles.bubble_container} ${styles.bubble_02}`}
            data-aos='fade-up'
          >
            <img className={styles.bubble_em_right} src={emRight} alt={''} />
            <div className={styles.bubble_text}>
              &quot;정신없이 늘리다보니 <br /> 고정 구독료가 너무
              부담돼요&rdquo;
            </div>
          </div>
          <div
            className={`${styles.bubble_container} ${styles.bubble_03}`}
            data-aos='fade-up'
          >
            <img className={styles.bubble_em_left} src={emLeft} alt={''} />
            <div className={styles.bubble_text}>“보안·보안·보안”</div>
          </div>
        </div>
        <div>
          <div className={commonStyles.title_container} data-aos='fade-up'>
            <h2 className={`${commonStyles.bold} ${styles.margin_right}`}>
              셀렉툴은 개인·팀·기업을 위한 <br />
              업무 툴 통합 비교 서비스에요
            </h2>
            <div className={commonStyles.title_bar}></div>
          </div>
          <div className={commonStyles.description} data-aos='fade-up'>
            원격 근무로 인해 셀 수 없이 늘어난 협업툴을 <br />
            사용하는 이용자들의 불편함을 해소하고자 시작했어요.
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingIntroduceSectionMobile
