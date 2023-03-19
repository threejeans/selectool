import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { ToolType } from 'types/types'
import ModifyButton from './ModifyButton'

const ic = ['🧑🏻‍💻 👩🏻‍💻', '👫🏻', '🏢', '🏢🏢', '🏢🏢🏢', '🏢🏢🏢🏢']

const SelfPlans = () => {
  const { plans } = useAppSelector(selectCurrentContent) as ToolType
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
      <div className={styles.planGrid}>
        {plans.map((item, index) => {
          return (
            <div key={index} className={styles.plan}>
              <div className={styles.planTitle}>{ic[index]}</div>
              <div className={styles.planTitle}>{item.title}</div>
              <div className={styles.planVolume}>{item.volume}</div>
              <div className={styles.planCost}>{item.cost}</div>
              <div>
                {item.planFunctions.map((it, i) => {
                  return (
                    <div key={i}>
                      <GiCheckMark />
                      {it.func}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelfPlans
