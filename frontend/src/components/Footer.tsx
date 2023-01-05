import React from 'react';

import { BsChevronCompactUp, BsInstagram } from 'react-icons/bs';
import styles from 'styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.corp}>
            <div className={styles.title}>SELECTOOL</div>
            <button className={styles.instaBtn}>
              <BsInstagram />
            </button>
          </div>
          <div className={styles.privacy}>
            <a href="">개인정보처리방침</a>
            {'|'}
            <a href="">운영정책</a>
            {'|'}
            <a href="">문의사항</a>
          </div>
          <div>Copyright © 2022 Selectool Corp. All rights reserved.</div>
        </div>
        <button className={styles.topBtn}>
          <BsChevronCompactUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
