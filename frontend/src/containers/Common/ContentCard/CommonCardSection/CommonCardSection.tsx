import React from 'react'
import styles from './CommonCardSection.module.css'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

type CommonCardProps = {
  name: string
  content: string
}

const CommonCardSection = ({ name, content }: CommonCardProps) => {
  return (
    <>
      <Pc>
        <div className={styles.layout}>
          <div className={styles.name}>✔ {name}</div>
          <div className={styles.content}>{content}</div>
        </div>
      </Pc>
      <Tablet>
        <div className={styles.layout}>
          <div className={styles.name}>✔ {name}</div>
          <div className={styles.content}>{content}</div>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.layoutMobile}>
          <div className={styles.name}>✔ {name}</div>
          <div className={styles.content}>{content}</div>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.layoutMobile}>
          <div className={styles.name}>✔ {name}</div>
          <div className={styles.content}>{content}</div>
        </div>
      </Mobile>
    </>
  )
}

export default CommonCardSection
