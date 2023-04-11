import { WithDetailMain } from 'containers/With'
import React from 'react'
import styles from 'styles/pages/commons/Content.module.css'

const WithDetail = () => {
  return (
    <div className={`${styles.layout} ${styles.detailLayout}`}>
      <div className={styles.container}>
        <WithDetailMain />
      </div>
    </div>
  )
}

export default WithDetail
