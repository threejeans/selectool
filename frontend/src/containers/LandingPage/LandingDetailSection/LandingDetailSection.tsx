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
import { Pc } from 'components/Layout'
import { DownTablet } from '../LandingHero/LandingHero'

const LandingDetailSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={commonStyles.subtitle} data-aos='fade-up'>
          Product
        </div>
        <div className={commonStyles.titleContainer} data-aos='fade-up'>
          <div className={commonStyles.titleBar}></div>
          <h2 className={`${commonStyles.bold} ${styles.marginLeft}`}>
            어떤 협업툴을 도입해야 개인·팀 업무가
            <br />
            효율적으로 진행될까요?
          </h2>
        </div>

        <div className={styles.mainContents}>
          <div data-aos='fade-right'>
            <h4 className={styles.detailTitle}>
              툴 종류, 기능, 요금 정책들을 <br />
              <span className={styles.highlight}>한눈에 비교</span>해 보세요.
            </h4>
            <hr className={styles.line} />
            <div className={commonStyles.description}>
              비대면 근무가 일상으로 자리 잡은 시대에 필수인 협업툴. <br />
              흩어져있는 정보는 넘쳐나고 하나하나 찾아볼 시간이 없는 <br />
              분들을 위해 한곳에 모아뒀어요.
            </div>
            <div className={styles.aTag}>
              <Link to={'/self'}>직무별 툴 확인하기 →</Link>
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={image01Back}
                className={styles.imageBack01}
                alt=''
                data-aos='fade-up-left'
              />
              <img
                src={image01Front}
                className={styles.imageFront01}
                alt=''
                data-aos='fade-up-left'
              />
            </div>
          </div>
        </div>

        <div className={`${styles.mainContents} ${styles.right}`}>
          <Pc>
            <div className={styles.imageSection}>
              <div className={styles.imageContainer}>
                <img
                  src={image02Back}
                  className={styles.imageBack02}
                  alt=''
                  data-aos='fade-up-right'
                />
                <img
                  src={image02Front}
                  className={styles.imageFront02}
                  alt=''
                  data-aos='fade-up-right'
                />
              </div>
            </div>
            <div data-aos='fade-left'>
              <h4 className={styles.detailTitle}>
                <span className={styles.highlight}>[&emsp;&emsp;]</span>은
                이러한 협업툴을 사용하고 있어요
              </h4>
              <hr className={styles.line} />
              <div className={commonStyles.description}>
                현업에서 기업들이 활용하는 툴들을 확인하고 상황과 성향에 맞는{' '}
                <br />
                툴을 찾아보세요. 그들의 조직 문화와 업무 방식도 엿볼 수 있어요.
              </div>
              <div className={styles.aTag}>
                <Link to={'/with'}>기업별 툴 확인하기 →</Link>
              </div>
            </div>
          </Pc>
          <DownTablet>
            <div data-aos='fade-right'>
              <h4 className={styles.detailTitle}>
                <span className={styles.highlight}>[&emsp;&emsp;]</span>은
                이러한 협업툴을 사용하고 있어요
              </h4>
              <hr className={styles.lineRight} />
              <div className={commonStyles.description}>
                현업에서 기업들이 활용하는 툴들을 확인하고 <br />
                상황과 성향에 맞는 툴을 찾아보세요. <br />
                그들의 조직 문화와 업무 방식도 엿볼 수 있어요.
              </div>
              <div className={styles.aTag}>
                <Link to={'/with'}>기업별 툴 확인하기 →</Link>
              </div>
            </div>
            <div className={styles.imageSection}>
              <div className={styles.imageContainer}>
                <img
                  src={image02Back}
                  className={styles.imageBack02}
                  alt=''
                  data-aos='fade-up-left'
                />
                <img
                  src={image02Front}
                  className={styles.imageFront02}
                  alt=''
                  data-aos='fade-up-left'
                />
              </div>
            </div>
          </DownTablet>
        </div>

        <div className={styles.mainContents}>
          <div data-aos='fade-right' className={styles.titleSection}>
            <h4 className={styles.detailTitle}>
              관심있는 <span className={styles.highlight}>툴 가이드</span> 를
              통해 <br />
              신속하고 정확하게 자료를 학습해요.
            </h4>
            <hr className={styles.line} />
            <div className={commonStyles.description}>
              더 이상 어떻게 익혀야할지 막막해하지 말아요. <br />툴 사용법만
              익히다가 해야하는 업무가 미뤄지지 않도록 도와드릴게요.
            </div>
            <div className={styles.aTag}>
              <Link to={'/guide'}>툴 가이드 확인하기 →</Link>
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={image03Back}
                className={styles.imageBack03}
                alt=''
                data-aos='fade-up-left'
              />
              <img
                src={image03Front}
                className={styles.imageFront03}
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

export default LandingDetailSection
