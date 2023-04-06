import React from 'react'

import { BsChevronCompactUp, BsInstagram } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from 'styles/components/Footer.module.css'

const Footer = () => {
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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.corp}>
            <div className={styles.title}>SELECTOOL</div>
            <button className={styles.instaBtn} onClick={handleClick}>
              <BsInstagram />
            </button>
          </div>
          <div className={styles.privacy}>
            <Link to='/service-use'>개인정보처리방침</Link>
            {'|'}
            <Link to='/privacy'>운영정책</Link>
            {'|'}
            <a href=''>문의사항</a>
          </div>
          <div className={styles.copyright}>
            Copyright © 2022 Selectool Corp. All rights reserved.
          </div>
        </div>
        <button className={styles.topBtn} onClick={handleScroll}>
          <BsChevronCompactUp />
        </button>
      </div>
    </footer>
  )
}

export default Footer
