import { SelfDetailMain } from 'containers/Self'
import React from 'react'
import styles from 'styles/pages/commons/Content.module.css'

const SelfDetail = () => {
  return (
    <div className={`${styles.layout} ${styles.detailLayout}`}>
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          <SelfDetailMain />
        </div>
      </div>
    </div>
  )
}

export default SelfDetail
