import React from 'react';

import { BsChevronCompactUp, BsInstagram } from 'react-icons/bs';
import styles from 'styles/components/Footer.module.css';

const Footer = () => {
  const handleClick = () => {
    document.location.href = 'https://www.instagram.com/selectool.info/'
  }

  const handleScroll = () => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  
  };

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
            <a href="https://www.notion.so/4ba132c6639b469cb99ea45c4b8d2c5f#a8ba9855017245bcb4f92f929d0a2163">개인정보처리방침</a>
            {'|'}
            <a href="https://www.notion.so/6267c9d0c8a841d7aa8f060772cbd858">운영정책</a>
            {'|'}
            <a href="">문의사항</a>
          </div>
          <div>Copyright © 2022 Selectool Corp. All rights reserved.</div>
        </div>
        <button className={styles.topBtn} onClick={handleScroll}>
          <BsChevronCompactUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
