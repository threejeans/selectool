import React from 'react'
import { BsChevronCompactUp, BsInstagram } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from 'styles/components/Footer.module.css'

const FooterMobile = () => {
  const handleClick = () => {
    document.location.href = 'https://www.instagram.com/selectool.info/'
  }

  const handleScroll = () => {
    if (!window.scrollY) return
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className={styles.footerMobile}>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.corp}>
            <div className={styles.titleMobile}>SELECTOOL</div>
            <button className={styles.instaBtnMobile} onClick={handleClick}>
              <BsInstagram />
            </button>
          </div>
          <div className={styles.privacyMobile}>
            <Link to='/service-use'>개인정보처리방침</Link>
            {'|'}
            <Link to='/privacy'>운영정책</Link>
            {'|'}
            <a href='mailto:selectool2022@gmail.com'>문의사항</a>
          </div>
          <div className={styles.copyrightMobile}>
            Copyright © 2022 Selectool Corp. All rights reserved.
          </div>
        </div>
        <button className={styles.topBtnMobile} onClick={handleScroll}>
          <BsChevronCompactUp />
        </button>
      </div>
    </footer>
  )
}

export default FooterMobile
