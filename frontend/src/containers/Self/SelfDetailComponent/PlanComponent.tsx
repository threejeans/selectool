import React from 'react'
import { PlanFunctionType } from 'types/types'
import styles from './SelfDetailComponent.module.css'

type PlanProps = {
  idx: number
  title: string
  volume: string
  cost: string
  planFunc: PlanFunctionType[]
}

const planImogi = ['🧑🏻‍💻 👩🏻‍💻', '👫🏻', '🏢', '🖥']

const PlanComponent = ({
  idx,
  title,
  volume,
  cost,
  planFunc = [],
}: PlanProps) => {
  return (
    <div className={styles.planLayout}>
      <div className={styles.planFirstSection}>
        <div className={styles.imogi}>{planImogi[idx]}</div>
        <div className={styles.planTitle}>{title}</div>
        <div className={styles.planVolume}>팀 전체 {volume}</div>
      </div>
      <div className={styles.planSecondSection}>
        멤버당&nbsp;&nbsp;<span className={styles.planCost}>{cost}</span>
      </div>
      <div className={styles.planThirdSection}>
        {planFunc.map((func, index) => (
          <div key={index}>✔ {func.func}</div>
        ))}
      </div>
    </div>
  )
}

export default PlanComponent
