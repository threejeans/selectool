import React from 'react'
import { ContentTitle } from 'containers/Common'
import { WithMain } from 'containers/With'
import styles from '../../styles/pages/commons/Content.module.css'

const With = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <ContentTitle
          title='기업별 툴'
          description='* 다양한 협업툴 사이에서 기업별 협업툴을 확인하고 보다 명확한 비교점을 찾고 싶은 워커에게 권하는 툴이에요'
        />
        <WithMain />
      </div>
    </div>
  )
}

export default With
