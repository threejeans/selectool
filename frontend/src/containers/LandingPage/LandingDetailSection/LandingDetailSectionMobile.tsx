import React from 'react'
import styles from './LandingDetail.module.css'
import commonStyles from '../../../styles/pages/landingPage/Landing.module.css'
import { Link } from 'react-router-dom'

import image01Front from 'assets/landing_detail_image01_front.svg'
import image01Back from 'assets/landing_detail_image01_back.svg'

import image02Front from 'assets/landing_detail_image02_front.svg'
import image02Back from 'assets/landing_detail_image02_back.svg'

import image03Back from 'assets/landing_detail_image03_front.svg'
import image03Front from 'assets/landing_detail_image03_back.svg'

const LandingDetailSectionMobile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={commonStyles.subtitleMobile} data-aos='fade-up'>
          Product
        </div>
        <div className={commonStyles.title_container} data-aos='fade-up'>
          <div className={commonStyles.title_bar_mobile}></div>
          <h2
            className={`${commonStyles.bold} ${styles.margin_left} ${commonStyles.h2Mobile}`}
          >
            어떤 협업툴을 도입해야 개인·팀 업무가
            <br />
            효율적으로 진행될까요?
          </h2>
        </div>

        <div className={styles.main_contents_Mobile}>
          <div data-aos='fade-right'>
            <h4 className={styles.detail_title_mobile}>
              툴 종류, 기능, 요금 정책들을 <br />
              <span className={styles.highlight}>한눈에 비교</span>해 보세요.
            </h4>
            <hr className={styles.line_mobile} />
            <div className={commonStyles.description_mobile}>
              비대면 근무가 일상으로 자리 잡은 시대에 필수인 협업툴. <br />
              흩어져있는 정보는 넘쳐나고 하나하나 찾아볼 시간이 없는 <br />
              분들을 위해 한곳에 모아뒀어요.
            </div>
            <div className={styles.a_tag_mobile}>
              <Link to={'/self'}>기능별 툴 확인하기 →</Link>
            </div>
          </div>
          <div className={styles.image_section_mobile}>
            <div className={styles.image_container_mobile}>
              <img
                src={image01Back}
                className={styles.image_back_01_mobile}
                alt=''
                data-aos='fade-up-left'
              />
              <img
                src={image01Front}
                className={styles.image_front_01_mobile}
                alt=''
                data-aos='fade-up-left'
              />
            </div>
          </div>
        </div>

        <div className={`${styles.main_contents_Mobile} ${styles.right} `}>
          <div data-aos='fade-right'>
            <h4 className={styles.detail_title_mobile}>
              <span className={styles.highlight}>[&emsp;&emsp;]</span>은 이러한
              협업툴을 사용하고 있어요
            </h4>
            <hr className={styles.line_right_mobile} />
            <div className={commonStyles.description_mobile}>
              현업에서 기업들이 활용하는 툴들을 확인하고 상황과 성향에 맞는 툴을
              <br></br>
              찾아보세요. 그들의 조직 문화와 업무 방식도 옅볼 수 있어요.
            </div>
            <div className={styles.a_tag_mobile}>
              <Link to={'/with'}>기업별 툴 확인하기 →</Link>
            </div>
          </div>
          <div className={styles.image_section_mobile}>
            <div className={styles.image_container_mobile}>
              <img
                src={image02Back}
                className={styles.image_back_02_mobile}
                alt=''
                data-aos='fade-up-left'
              />
              <img
                src={image02Front}
                className={styles.image_front_02_mobile}
                alt=''
                data-aos='fade-up-left'
              />
            </div>
          </div>
        </div>

        <div className={styles.main_contents_Mobile}>
          <div data-aos='fade-right' className={styles.title_section}>
            <h4 className={styles.detail_title_mobile}>
              관심있는 <span className={styles.highlight}>툴 가이드</span> 를
              통해 <br />
              신속하고 정확하게 자료를 학습해요.
            </h4>
            <hr className={styles.line_mobile} />
            <div className={commonStyles.description_mobile}>
              더 이상 어떻게 익혀야할지 막막해하지 말아요. <br />툴 사용법만
              익히다가 해야하는 업무가 미뤄지지 않도록 도와드릴게요.
            </div>
            <div className={styles.a_tag_mobile}>
              <Link to={'/guide'}>툴 가이드 확인하기 →</Link>
            </div>
          </div>
          <div className={styles.image_section_mobile}>
            <div className={styles.image_container_mobile}>
              <img
                src={image03Back}
                className={styles.image_back_03_mobile}
                alt=''
                data-aos='fade-up-left'
              />
              <img
                src={image03Front}
                className={styles.image_front_03_mobile}
                alt=''
                data-aos='fade-up-left'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingDetailSectionMobile
