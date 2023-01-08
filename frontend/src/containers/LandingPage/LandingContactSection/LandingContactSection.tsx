import React from 'react';
import styles from './LandingContact.module.css';

const LandingContactSection = () => {
  return (
    <div className={ styles.container }>
      <div className={ styles.contents } data-aos="flip-up">
        <div className={ styles.text }>
          <h3>
        날카로운 안목을 가진 여러분들의 <br />
        제안사항을 팀에게 전달해주세요!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LandingContactSection;