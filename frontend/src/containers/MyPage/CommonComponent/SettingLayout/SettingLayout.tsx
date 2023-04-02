import React from 'react'
import styles from './SettingLayout.module.css'

type LayoutProps = {
  title: string
  children: React.ReactNode
}

const SettingLayout = ({ title, children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
          <hr className={styles.line}></hr>
        </div>
        {children}
      </div>
    </div>
  )
}

export default SettingLayout
