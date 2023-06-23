import { useAppDispatch, useAppSelector } from 'app/hooks'
import ContentSpinner from 'components/ContentSpinner'
import { WithCard } from 'containers/With'
import React, { useEffect, useRef } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import {
  changeWithContentCount,
  setWithMainInfoExportList,
  withContentCount,
  withMainInfoExportList,
  withMainInfoList,
} from 'reducers/withReducer'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
}

const CardGrid = ({ isSpinner = false }: GridProps) => {
  const mainInfoList = useAppSelector(withMainInfoList)
  const mainInfoExportList = useAppSelector(withMainInfoExportList)
  const contentCount = useAppSelector(withContentCount)
  const countRef = useRef({ count: contentCount })

  const dispatch = useAppDispatch()

  const maxContentCount = Math.floor((mainInfoList.length - 1) / 12)

  const getMainInfoExportList = () => {
    const newList = mainInfoList.slice(0, (contentCount + 1) * 12)
    dispatch(setWithMainInfoExportList(newList))
  }

  const moreContentEvent = () => {
    dispatch(changeWithContentCount())
    countRef.current.count += 1
    const newList = mainInfoList.slice(0, (countRef.current.count + 1) * 12)
    dispatch(setWithMainInfoExportList(newList))
  }

  useEffect(() => {
    getMainInfoExportList()
  }, [mainInfoList])

  return (
    <>
      <div className={`${styles.layout} ${styles.withLayout}`}>
        {isSpinner ? (
          <ContentSpinner />
        ) : mainInfoExportList.length > 0 ? (
          mainInfoExportList.map((data, idx) => (
            <WithCard data={data} key={idx} />
          ))
        ) : (
          <ContentSpinner />
        )}
      </div>
      {mainInfoList.length > 12 && contentCount < maxContentCount ? (
        <div className={styles.moreGroup}>
          <button className={styles.moreButton} onClick={moreContentEvent}>
            더보기&nbsp;&nbsp;
            <BsChevronCompactDown className={styles.icon} />
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default CardGrid
