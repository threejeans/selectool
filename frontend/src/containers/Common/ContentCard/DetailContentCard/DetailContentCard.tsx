import React from 'react'
import CardTitle from '../CardTitle'
import styles from './DetailContentCard.module.css'

type ContentProps = {
  title: string
  description: string
  children: React.ReactNode
  isWith?: boolean
}

const DetailContentCard = ({
  title,
  description,
  children,
  isWith = false,
}: ContentProps) => {
  return (
    <div className={isWith ? styles.cardWithLayout : styles.cardLayout}>
      <div className={styles.cardContent}>
        <CardTitle title={title} description={description} />
        <hr className={styles.line}></hr>
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  )
}

export default DetailContentCard
