import { Sidebar } from 'containers/MyPage'
import React from 'react'
import styles from 'styles/pages/commons/Content.module.css'

const Mypage = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Sidebar />
      </div>
    </div>
  )
}

export default Mypage
