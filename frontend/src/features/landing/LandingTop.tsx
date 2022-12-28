import React from 'react';
import styles from "styles/components/landing/LandingTop.module.css";
import Image from "assets/landing_image.png";

const LandingTop = () => {
  return (
    <div className={styles.top}>
      <img className={styles.image} src={Image} alt={"랜딩 이미지"} />
      <h1 className={styles.title}>나 혼자 일 할건데 업무툴 뭐 써야 좋지?</h1>
    </div>
  );
};

export default LandingTop;