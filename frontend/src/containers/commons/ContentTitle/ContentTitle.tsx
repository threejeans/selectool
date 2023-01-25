import React from 'react';
import styles from './ContentTitle.module.css';

type titleProps = {
  title: string;
  description: string;
};

const ContentTitle = ({title, description}: titleProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <hr className={styles.line}></hr>
    </div>
  );
};

export default ContentTitle;