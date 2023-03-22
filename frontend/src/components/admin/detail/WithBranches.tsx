import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { CorpType } from 'types/types'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import ModifyButton from './ModifyButton'

const WithBranches = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { branches } = useAppSelector(selectCurrentContent) as CorpType

  const [isModified, setIsMofifed] = useState(false)

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={setIsMofifed} />
          {'자회사'}
        </div>
        <p className={styles.subTitle}>{'* 어드민 전체 출력'}</p>
      </div>
      <div className={styles.branchGrid}>
        {branches.map((item, index) => {
          if (item.image)
            return (
              <div key={index} className={styles.branch}>
                <img src={item.image} alt={item.name} />
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default WithBranches
