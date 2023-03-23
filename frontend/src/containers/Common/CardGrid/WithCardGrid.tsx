import { useAppSelector } from 'app/hooks'
import Spinner from 'components/Spinner'
import { WithCard } from 'containers/With'
import React from 'react'
import { withMainInfoList } from 'reducers/withReducer'
import { WithCorpType } from 'types/types'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
}

const CardGrid = ({ isSpinner = false }: GridProps) => {
  const mainInfoList = useAppSelector(withMainInfoList)

  return (
    <div className={`${styles.layout} ${styles.withLayout}`}>
      {isSpinner ? (
        <Spinner />
      ) : mainInfoList.length > 0 ? (
        mainInfoList.map((data, idx) => <WithCard data={data} key={idx} />)
      ) : (
        <div>등록된 tool이 없습니다</div>
      )}
    </div>
  )
}

export default CardGrid
