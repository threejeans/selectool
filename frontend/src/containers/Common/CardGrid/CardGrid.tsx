import Spinner from 'components/Spinner'
import { SelfCard } from 'containers/Self'
import { WithCard } from 'containers/With'
import React from 'react'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
  type?: string
}

const CardGrid = ({ isSpinner = false, type }: GridProps) => {
  return (
    // <div className={styles.container}>
    <div className={styles.layout}>
      {/* 임시 */}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
      {type === 'self' ? <SelfCard /> : isSpinner ? <Spinner /> : <WithCard />}
    </div>
    // </div>
  )
}

export default CardGrid
