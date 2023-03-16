import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { ToolType } from 'types/types'
import ModifyButton from './ModifyButton'
import { GiCheckMark } from 'react-icons/gi'

const SelfCore = () => {
  const { toolFunctions } = useAppSelector(selectCurrentContent) as ToolType
  const [isModified, setIsMofifed] = useState(false)
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={setIsMofifed} />
          {'핵심 기능'}
        </div>
        <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
      </div>
      <div className={styles.functionGrid}>
        {toolFunctions.map((item, index) => {
          return (
            <div key={index} className={styles.cardGrid}>
              <GiCheckMark className={styles.a} />
              <span className={styles.b}>{item.name}</span>
              <span className={styles.c}>{item.content}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelfCore
