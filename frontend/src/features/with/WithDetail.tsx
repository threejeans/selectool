import { WithDetailMain } from 'containers/With'
import React from 'react'
import styles from 'styles/pages/commons/Content.module.css'

const WithDetail = () => {
  return (
    <div className={`${styles.layout} ${styles.detailLayout}`}>
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          <WithDetailMain />
        </div>
      </div>
    </div>
  )
}

export default WithDetail
