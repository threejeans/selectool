import Spinner from 'components/Spinner'
import { SelfCard } from 'containers/Self'
import React from 'react'
import { SelfMainInfo } from 'types/DataTypes'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
  list: SelfMainInfo[]
}

const SelfCardGrid = ({ isSpinner = false, list }: GridProps) => {
  return (
    <div
      className={`${styles.layout} ${
       styles.selfLayout
      }`}
    >
      {isSpinner ? <Spinner /> : (
        list.length > 0 ? (list.map((data, idx) => 
          <SelfCard data={data} key={idx} />
        )) : (
          <div>등록된 tool이 없습니다</div>
        )
      )}
    </div>
  )
}

export default SelfCardGrid
