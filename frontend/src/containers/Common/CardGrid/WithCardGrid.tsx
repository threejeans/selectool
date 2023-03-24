import { useAppSelector } from 'app/hooks'
import ContentSpinner from 'components/ContentSpinner'
import { WithCard } from 'containers/With'
import React from 'react'
import { withMainInfoList } from 'reducers/withReducer'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
}

const CardGrid = ({ isSpinner = false }: GridProps) => {
  const mainInfoList = useAppSelector(withMainInfoList)

  return (
    <div className={`${styles.layout} ${styles.withLayout}`}>
      {isSpinner ? (
        <ContentSpinner />
      ) : mainInfoList.length > 0 ? (
        mainInfoList.map((data, idx) => <WithCard data={data} key={idx} />)
      ) : (
        <ContentSpinner />
      )}
    </div>
  )
}

export default CardGrid
