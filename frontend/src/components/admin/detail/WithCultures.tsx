import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import React, { useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { CorpType } from 'types/types'
import ModifyButton from './ModifyButton'
const WithCultures = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { cultures } = useAppSelector(selectCurrentContent) as CorpType

  const [isModified, setIsMofifed] = useState(false)

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={setIsMofifed} />
          {'조직문화'}
        </div>
        <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
      </div>
      <div className={styles.functionGrid}>
        {cultures.map((item, index) => {
          return (
            <div key={index} className={styles.cardGrid}>
              <GiCheckMark className={styles.a} />
              <span className={styles.b}>{item.title}</span>
              <span className={styles.c}>{item.content}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WithCultures
