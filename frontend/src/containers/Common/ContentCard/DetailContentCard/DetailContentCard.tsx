import React from 'react'
import CardTitle from '../CardTitle'
import styles from './DetailContentCard.module.css'

type ContentProps = {
  children: React.ReactNode
}

const DetailContentCard = ({ children }: ContentProps) => {
  return (
    <div className={styles.cardLayout}>
      <div className={styles.cardContent}>
        <CardTitle title='자회사' description='블라블라' />
        <hr className={styles.line}></hr>
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  )
}

export default DetailContentCard
