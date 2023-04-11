import React from 'react'
import styles from './ContentTitle.module.css'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

type titleProps = {
  title: string
  description: string
}

const ContentTitle = ({ title, description }: titleProps) => {
  return (
    <>
      <Pc>
        <div className={styles.layout}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <hr className={styles.line}></hr>
        </div>
      </Pc>
      <Tablet>
        <div className={styles.layout}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <hr className={styles.line}></hr>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.layoutMobile}>
          <div className={styles.titleMobile}>{title}</div>
          <div className={styles.descriptionMobile}>{description}</div>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.layoutMobile}>
          <div className={styles.titleMobile}>{title}</div>
          <div className={styles.descriptionMobile}>{description}</div>
        </div>
      </Mobile>
    </>
  )
}

export default ContentTitle
