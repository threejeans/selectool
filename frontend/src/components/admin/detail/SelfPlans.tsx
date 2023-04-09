import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateTool,
} from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { GiCheckMark } from 'react-icons/gi'
import { toast } from 'react-toastify'
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
  const [cnts, setCnts] = useState<number[]>([
    ...plans.map(item => item.planFunctions.length),
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ])
  const [tmpPlanFunctions, setTmpPlanFunctions] = useState<
    PlanFunctionType[][]
  >([...plans.map(item => item.planFunctions), [], [], [], [], [], [], [], []])

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...tool }
      const t: PlanType[] = [] // 갯수만큼만 복사
      for (let i = 0; i < cnt; i++) {
        if (!tmpPlans[i]?.title || !tmpPlans[i]?.volume || !tmpPlans[i]?.cost) {
          toast('내용을 입력해주세요.')
          return
        }
        const ttt: PlanFunctionType[] = []
        for (let j = 0; j < cnts[i]; j++) {
          const func = tmpPlanFunctions[i][j]
          if (func) ttt.push(func)
        }
        const tt: PlanType = {
          title: tmpPlans[i].title,
          volume: tmpPlans[i].volume,
          cost: tmpPlans[i].cost,
          planFunctions: ttt,
        }
        t.push(tt)
      }
      tmp.plans = t

      dispatch(updateTool(tmp))
        .then(e => {
          console.log(e)
          const tf = e.payload.plans as PlanType[]
          setCnt(tf.length)
          setTmpPlans(tf)
          setCnts([
            ...tf.map(item => item.planFunctions?.length || 1),
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
          ])
          setTmpPlanFunctions([
            ...tf.map(item => item.planFunctions),
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
          ])
          setIsMofifed(false)
        })
        .catch(err => console.error(err))
    } else setIsMofifed(true)
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={handleModify} />
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
                  <div className={styles.subTitle}>
                    가격 플랜 기능
                    <span>
                      <BiPlus
                        className={styles.sectionPlus}
                        onClick={() => {
                          if (cnts[index] < 10) {
                            cnts[index] = cnts[index] + 1
                            setCnts([...cnts])
                          } else toast('너무 많습니다.')
                        }}
                      />
                      <BiMinus
                        className={styles.sectionMinus}
                        onClick={() => {
                          if (cnts[index] > 0) {
                            cnts[index] = cnts[index] - 1
                            setCnts([...cnts])
                          } else toast('1개 이상 입력하세요.')
                        }}
                      />
                    </span>
                  </div>
                  <div className={styles.planFunc}>
                    {cnts[index] &&
                      [...Array(cnts[index])].map((_, jndex) => {
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
