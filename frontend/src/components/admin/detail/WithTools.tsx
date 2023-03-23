import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import React, { useState } from 'react'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { CorpType } from 'types/types'
import ModifyButton from './ModifyButton'
const WithTools = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { tools } = useAppSelector(selectCurrentContent) as CorpType

  const [isModified, setIsMofifed] = useState(false)
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={setIsMofifed} />
          {'사내 협업툴'}
        </div>
        <p className={styles.subTitle}>{'* 어드민 전체 출력'}</p>
      </div>
      <div className={styles.branchGrid}>
        {tools.map((item, index) => {
          if (item.image)
            return (
              <div key={index} className={styles.branch}>
                <a href={item.url} target={'_blank'} rel={'noreferrer'}>
                  <img src={item.image} alt={item.nameKr} />{' '}
                </a>
                <div className={styles.subTitle}>{item.nameKr}</div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default WithTools
