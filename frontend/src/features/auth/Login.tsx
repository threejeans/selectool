import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'components/Modal'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalClose, selectLoginModal } from './authSlice'

import GoogleLogo from 'assets/google_logo.svg'
import NaverLogo from 'assets/naver_logo.svg'
import KakaoLogo from 'assets/kakao_logo.svg'

import styles from 'styles/pages/auth/Login.module.css'
import { Link } from 'react-router-dom'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`
const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`
// .env.local 설정 필요
const Login = () => {
  const isLoginModal = useAppSelector(selectLoginModal)
  const dispatcth = useAppDispatch()
  const closeModal = () => dispatcth(loginModalClose())

  return (
    <Modal
      isModal={isLoginModal}
      setIsModal={() => {
        closeModal()
      }}
    >
      <Pc>
        <div className={styles.container}>
          <div className={styles.title}>{'셀렉툴이 처음이어도 괜찮아요'}</div>
          <div className={styles.description}>
            {
              '간편 로그인을 통해 툴 정보를 모아보고 관심있는 컨텐츠를 구독해보세요.'
            }
          </div>
          <div className={styles.buttonGroup}>
            <LoginButton
              uri={GOOGLE_URI}
              bg={'#FFFFFF'}
              img={GoogleLogo}
              title={'Google'}
              color={'#8D8D8D'}
            />
            <LoginButton
              uri={KAKAO_URI}
              bg={'#FDDC3F'}
              img={KakaoLogo}
              title={'Kakao'}
              color={'3A2929'}
            />
            <LoginButton
              uri={NAVER_URI}
              bg={'#03C75A'}
              img={NaverLogo}
              title={'Naver'}
              color={'#FFFFFF'}
            />
          </div>
          <div className={styles.privacy}>
            {'로그인은 '}
            <Link to='/service-use'>{'개인 정보 보호 정책'}</Link>
            {' 및 '}
            <Link to='/privacy'>{'서비스 약관'}</Link>
            {'에 동의하는 것을 의미하며, '}
            <br />
            {'서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.'}
          </div>
        </div>
      </Pc>
      <Tablet>
        <div className={styles.container}>
          <div className={styles.title}>{'셀렉툴이 처음이어도 괜찮아요'}</div>
          <div className={styles.description}>
            {
              '간편 로그인을 통해 툴 정보를 모아보고 관심있는 컨텐츠를 구독해보세요.'
            }
          </div>
          <div className={styles.buttonGroup}>
            <LoginButton
              uri={GOOGLE_URI}
              bg={'#FFFFFF'}
              img={GoogleLogo}
              title={'Google'}
              color={'#8D8D8D'}
            />
            <LoginButton
              uri={KAKAO_URI}
              bg={'#FDDC3F'}
              img={KakaoLogo}
              title={'Kakao'}
              color={'3A2929'}
            />
            <LoginButton
              uri={NAVER_URI}
              bg={'#03C75A'}
              img={NaverLogo}
              title={'Naver'}
              color={'#FFFFFF'}
            />
          </div>
          <div className={styles.privacy}>
            {'로그인은 '}
            <Link to='/service-use'>{'개인 정보 보호 정책'}</Link>
            {' 및 '}
            <Link to='/privacy'>{'서비스 약관'}</Link>
            {'에 동의하는 것을 의미하며, '}
            <br />
            {'서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.'}
          </div>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.containerMobile}>
          <div className={styles.titleMobile}>
            {'셀렉툴이 처음이어도 괜찮아요'}
          </div>
          <div className={styles.descriptionMobile}>
            간편 로그인을 통해 툴 정보를 모아보고
            <br />
            관심있는 컨텐츠를 구독해보세요.
          </div>
          <div className={styles.buttonGroupMobile}>
            <LoginButton
              uri={GOOGLE_URI}
              bg={'#FFFFFF'}
              img={GoogleLogo}
              title={'구글로 시작하기'}
              color={'#8D8D8D'}
            />
            <LoginButton
              uri={KAKAO_URI}
              bg={'#FDDC3F'}
              img={KakaoLogo}
              title={'카카오로 시작하기'}
              color={'3A2929'}
            />
            <LoginButton
              uri={NAVER_URI}
              bg={'#03C75A'}
              img={NaverLogo}
              title={'네이버로 시작하기'}
              color={'#FFFFFF'}
            />
          </div>
          <div className={styles.privacyMobile}>
            {'로그인은 '}
            <Link to='/service-use'>{'개인 정보 보호 정책'}</Link>
            {' 및 '}
            <Link to='/privacy'>{'서비스 약관'}</Link>
            {'에 동의하는 것을 의미하며, '}
            <br />
            {'서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.'}
          </div>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.containerMobile}>
          <div className={styles.titleMobile}>
            {'셀렉툴이 처음이어도 괜찮아요'}
          </div>
          <div className={styles.descriptionMobile}>
            간편 로그인을 통해 툴 정보를 모아보고
            <br />
            관심있는 컨텐츠를 구독해보세요.
          </div>
          <div className={styles.buttonGroupMobile}>
            <LoginButton
              uri={GOOGLE_URI}
              bg={'#FFFFFF'}
              img={GoogleLogo}
              title={'구글로 시작하기'}
              color={'#8D8D8D'}
            />
            <LoginButton
              uri={KAKAO_URI}
              bg={'#FDDC3F'}
              img={KakaoLogo}
              title={'카카오로 시작하기'}
              color={'3A2929'}
            />
            <LoginButton
              uri={NAVER_URI}
              bg={'#03C75A'}
              img={NaverLogo}
              title={'네이버로 시작하기'}
              color={'#FFFFFF'}
            />
          </div>
          <div className={styles.privacyMobile}>
            {'로그인은 '}
            <Link to='/service-use'>{'개인 정보 보호 정책'}</Link>
            {' 및 '}
            <Link to='/privacy'>{'서비스 약관'}</Link>
            {'에 동의하는 것을 의미하며, '}
            <br />
            {'서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.'}
          </div>
        </div>
      </Mobile>
    </Modal>
  )
}

export default Login

type LoginButtonProps = {
  uri: string
  bg: string
  img: string
  title: string
  color: string
}
const LoginButton = ({ uri, bg, img, title, color }: LoginButtonProps) => {
  return (
    <a href={uri} style={{ backgroundColor: bg, color: color }}>
      <img src={img} alt={title} />
      {title}
    </a>
  )
}
