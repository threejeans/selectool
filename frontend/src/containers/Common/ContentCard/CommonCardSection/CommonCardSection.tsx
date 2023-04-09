import React from 'react'
import styles from './CommonCardSection.module.css'

type CommonCardProps = {
  name: string
  content: string
}

const CommonCardSection = ({ name, content }: CommonCardProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.name}>✔ {name}</div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}

export default CommonCardSection
