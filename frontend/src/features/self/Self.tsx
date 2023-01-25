import { ContentTitle } from 'containers/commons';
import { SelfMain } from 'containers/Self';
import React from 'react';
import styles from '../../styles/pages/commons/Content.module.css';

const Self = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <ContentTitle title = '혼자써요' description='* 새로운 기능 툴을 통해 업무 능력 향상을 원하는 워커에게 권하는 툴이에요'/>
        <SelfMain />
      </div>
    </div>
  );
};

export default Self;
