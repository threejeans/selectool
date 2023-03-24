import { useAppSelector } from 'app/hooks'
import ContentSpinner from 'components/ContentSpinner'
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
        <ContentSpinner />
      ) : mainInfoList.length > 0 ? (
        mainInfoList.map((data, idx) => <SelfCard data={data} key={idx} />)
      ) : (
        <ContentSpinner />
      )}
    </div>
  )
}

export default SelfCardGrid
