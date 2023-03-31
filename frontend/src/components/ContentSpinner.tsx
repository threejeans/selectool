import React from 'react'
import styles from 'styles/components/ContentSpinner.module.css'

const ContentSpinner = () => {
  return (
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default ContentSpinner
