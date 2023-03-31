import React from 'react'
import styles from './CommonLayout.module.css'
import ContentTitle from './ContentTitle'

type LayoutProps = {
  type: string
  children: React.ReactNode
}

const CommonLayout = ({ type, children }: LayoutProps) => {
  const contentTitle =
    type === 'bookmark'
      ? {
          title: '북마크 컨텐츠',
          description: '저장한 협업툴, 가이드 컨텐츠 등을 확인할 수 있어요',
        }
      : {
          title: '설정',
          description: '계정, 알람 등 상세 설정을 할 수 있어요.',
        }

  return (
    <div className={styles.contentContainer}>
      <ContentTitle
        title={contentTitle.title}
        description={contentTitle.description}
      />
      <div>{children}</div>
    </div>
  )
}

export default CommonLayout
