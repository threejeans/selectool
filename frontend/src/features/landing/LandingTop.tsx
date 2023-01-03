import React from 'react';
import styles from "styles/components/landing/LandingTop.module.css";
import Image from "assets/landing_image.png";
import { Link } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';

const LandingTop = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.image} src={Image} alt={"랜딩 이미지"} />
        <h1 className={styles.title}>
          나 

          {/* scroller start */}
          <div className={styles.scroller}>
            <div className={styles.scroller_item}>
              <Link to={'/self'}>혼자</Link><br/>
              <Link to={'/with'}>함께</Link>
            </div>
          </div>
          {/* scroller end */}

          일 할건데 업무툴 뭐 써야 좋지?
        </h1>
      </div>
      <div>
        <div className={styles.scrollArrow}>
          <BsChevronCompactDown />
        </div>
        <div className={styles.scrollArrow}>
          <BsChevronCompactDown />
        </div>
        <div className={styles.scrollArrow}>
          <BsChevronCompactDown />
        </div>
      </div>
    </div>
  );
};

export default LandingTop;