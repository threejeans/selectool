import Spinner from 'components/Spinner'
import { WithCard } from 'containers/With'
import React from 'react'
import { WithMainInfo } from 'types/dataTypes'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
  list: WithMainInfo[]
}

const CardGrid = ({ isSpinner = false, list }: GridProps) => {
  return (
    <div className={`${styles.layout} ${styles.withLayout}`}>
      {isSpinner ? (
        <Spinner />
      ) : list.length > 0 ? (
        list.map((data, idx) => <WithCard data={data} key={idx} />)
      ) : (
        <div>등록된 tool이 없습니다</div>
      )}
      {/* 임시 */}
      {/* {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />} */}
    </div>
    // </div>
  )
}

export default CardGrid
