import { useAppSelector } from 'app/hooks'
import Spinner from 'components/Spinner'
import { SelfCard } from 'containers/Self'
import React from 'react'
import { selfMainInfoList } from 'reducers/selfReducer'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
}

const SelfCardGrid = ({ isSpinner = false }: GridProps) => {
  const mainInfoList = useAppSelector(selfMainInfoList)

  return (
    <div className={`${styles.layout} ${styles.selfLayout}`}>
      {isSpinner ? (
        <Spinner />
      ) : mainInfoList.length > 0 ? (
        mainInfoList.map((data, idx) => <SelfCard data={data} key={idx} />)
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default SelfCardGrid
