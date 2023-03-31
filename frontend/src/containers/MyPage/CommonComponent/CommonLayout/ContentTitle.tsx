import React from 'react'
import styles from './CommonLayout.module.css'

type titleProps = {
  title: string
  description: string
}

const ContentTitle = ({ title, description }: titleProps) => {
  return (
    <div className={styles.titleLayout}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}

export default ContentTitle
