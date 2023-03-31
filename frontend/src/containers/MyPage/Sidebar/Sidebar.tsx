import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import { BsChevronDown } from 'react-icons/bs'

const Sidebar = () => {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.layout}>
      <div className={styles.title}>내 정보</div>
      <div className={styles.sectionContainer}>
        <div className={styles.mainSection}>
          <div>북마크 컨텐츠</div>
          <BsChevronDown className={styles.chevron} />
        </div>
        <div className={styles.subSectionContainer}>
          <div className={styles.subSection}>혼자써요</div>
          <div className={styles.subSection}>함께써요</div>
          <div className={styles.subSection}>가이드</div>
        </div>
      </div>
      <div
        className={active ? styles.mainSectionActive : styles.mainSection}
        onClick={() => setActive(!active)}
      >
        설정
      </div>
    </div>
  )
}

export default Sidebar
