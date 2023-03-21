import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { PlanFunctionType, PlanType, ToolType } from 'types/types'
import SectionPlusBtn from '../SectionPlusBtn'
import ModifyButton from './ModifyButton'

const ic = ['🧑🏻‍💻 👩🏻‍💻', '👫🏻', '🏢', '🏢🏢', '🏢🏢🏢', '🏢🏢🏢🏢']

const SelfPlans = () => {
  const tool = useAppSelector(selectCurrentContent) as ToolType
  const { plans } = useAppSelector(selectCurrentContent) as ToolType

  const dispatch = useAppDispatch()
  const [cnt, setCnt] = useState<number>(plans.length)
  const [tmpPlans, setTmpPlans] = useState<PlanType[]>(plans)
  const [cnts, setCnts] = useState<number[]>(
    plans.map(item => item.planFunctions.length),
  )
  const [tmpPlanFunctions, setTmpPlanFunctions] = useState<
    PlanFunctionType[][]
  >(plans.map(item => item.planFunctions))

  const [isModified, setIsMofifed] = useState(false)
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={setIsMofifed} />
          {'요금안내'}
        </div>
        <p className={styles.subTitle}>{'* 요금 플랜'}</p>
      </div>
      <div className={styles.planGrid}>
        {isModified ? (
          <>
            {[...Array(cnt)].map((_, index) => {
              return (
                <div key={index} className={styles.plan}>
                  <SectionPlusBtn
                    idx={index}
                    max={8}
                    value={cnt}
                    setValue={setCnt}
                  />
                  <input
                    className={styles.planTitle}
                    value={tmpPlans[index]?.title || ''}
                    onChange={e => {
                      const tmp = [...tmpPlans]
                      tmp[index] = {
                        title: e.target.value,
                        volume: tmp[index]?.volume || '',
                        cost: tmp[index]?.cost || '',
                        planFunctions: tmp[index]?.planFunctions || [],
                      }
                      setTmpPlans(tmp)
                    }}
                  />
                  <input
                    className={styles.planVolume}
                    value={tmpPlans[index]?.volume || ''}
                    onChange={e => {
                      const tmp = [...tmpPlans]
                      tmp[index] = {
                        title: tmp[index]?.title || '',
                        volume: e.target.value,
                        cost: tmp[index]?.cost || '',
                        planFunctions: tmp[index]?.planFunctions || [],
                      }
                      setTmpPlans(tmp)
                    }}
                  />
                  <input
                    className={styles.planVolume}
                    value={tmpPlans[index]?.cost || ''}
                    onChange={e => {
                      const tmp = [...tmpPlans]
                      tmp[index] = {
                        title: tmp[index]?.title || '',
                        volume: tmp[index]?.volume || '',
                        cost: e.target.value,
                        planFunctions: tmp[index]?.planFunctions || [],
                      }
                      setTmpPlans(tmp)
                    }}
                  />
                  <div className={styles.subTitle}>가격 플랜 기능</div>
                  {[...Array(cnts[index] || 1)].map((_, jndex) => {
                    return (
                      <input
                        key={jndex}
                        className={styles.planVolume}
                        value={tmpPlanFunctions[index]?.[jndex]?.func || ''}
                        onChange={e => {
                          const tmp = [...tmpPlanFunctions]
                          const ttmp = [...tmp[index]] || []
                          ttmp[jndex] = {
                            func: e.target.value,
                          }
                          tmp[index] = ttmp
                          setTmpPlanFunctions(tmp)
                        }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

export default SelfPlans
