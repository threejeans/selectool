import React from 'react';
import styles from "./LandingCTA.module.css";
import commonStyles from "../../../styles/pages/landingPage/Landing.module.css";

const LandingCTASection = () => {
  return (
    <div className={styles.container}>
      <span className={commonStyles.subtitle} data-aos="fade-up" data-aos-duration="1500">Our core value</span>
      <h2 data-aos="fade-up"
     data-aos-duration="1500">개인·팀·기업만의 공간을 만들어가는 <br />
        모든 분들에게 도움이 되기를 바라요</h2>
    </div>
  );
};

export default LandingCTASection;