import React from 'react'
import styles from './CardTitle.module.css'

type TitleProps = {
  title: string
  description: string
}
const CardTitle = ({ title, description }: TitleProps) => {
  return (
    <div className={styles.titleLayout}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}

export default CardTitle
