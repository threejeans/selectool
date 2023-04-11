import React from 'react'
import styles from './CommonLayout.module.css'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

type titleProps = {
  title: string
  description: string
}

const ContentTitle = ({ title, description }: titleProps) => {
  return (
    <>
      <Pc>
        <div className={styles.titleLayout}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </Pc>
      <Tablet>
        {' '}
        <div className={styles.titleLayout}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.titleLayoutMobile}>
          <div className={styles.titleMobile}>{title}</div>
          <div className={styles.descriptionMobile}>{description}</div>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.titleLayoutMobile}>
          <div className={styles.titleMobile}>{title}</div>
          <div className={styles.descriptionMobile}>{description}</div>
        </div>
      </Mobile>
    </>
  )
}

export default ContentTitle
