import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { ToolType } from 'types/types'
import ModifyButton from './ModifyButton'

const SelfClients = () => {
  const { clients } = useAppSelector(selectCurrentContent) as ToolType
  const [isModified, setIsMofifed] = useState(false)
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={setIsMofifed} />
          {'주요 고객사'}
        </div>
        <p className={styles.subTitle}>{'* 상위 8개 고객사 기준'}</p>
      </div>
      <div className={styles.clientGrid}>
        {clients.map((item, index) => {
          if (index < 8)
            return (
              <div key={index} className={styles.client}>
                <a href={item.url} target={'_blank'} rel={'noreferrer'}>
                  <img src={item.image} alt={item.name} />{' '}
                </a>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default SelfClients
