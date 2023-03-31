import { useAppDispatch, useAppSelector } from 'app/hooks'
import ContentSpinner from 'components/ContentSpinner'
import { SelfCard } from 'containers/Self'
import React, { useEffect, useRef } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import {
  changeSelfContentCount,
  selfContentCount,
  selfMainInfoExportList,
  selfMainInfoList,
  setSelfMainInfoExportList,
} from 'reducers/selfReducer'
import styles from './CardGrid.module.css'

type GridProps = {
  isSpinner?: boolean
}

const SelfCardGrid = ({ isSpinner = false }: GridProps) => {
  const mainInfoList = useAppSelector(selfMainInfoList)
  const mainInfoExportList = useAppSelector(selfMainInfoExportList)
  const contentCount = useAppSelector(selfContentCount)
  const countRef = useRef({ count: contentCount })

  const maxContentCount = Math.floor((mainInfoList.length - 1) / 20)

  const dispatch = useAppDispatch()

  const getMainInfoExportList = () => {
    const newList = mainInfoList.slice(0, (contentCount + 1) * 20)
    dispatch(setSelfMainInfoExportList(newList))
  }

  const moreContentEvent = () => {
    dispatch(changeSelfContentCount())
    countRef.current.count += 1
    const newList = mainInfoList.slice(0, (countRef.current.count + 1) * 20)
    dispatch(setSelfMainInfoExportList(newList))
  }

  useEffect(() => {
    getMainInfoExportList()
  }, [mainInfoList])

  return (
    <>
      <div className={`${styles.layout} ${styles.selfLayout}`}>
        {isSpinner ? (
          <ContentSpinner />
        ) : mainInfoExportList.length > 0 ? (
          mainInfoExportList.map((data, idx) => (
            <SelfCard data={data} key={idx} />
          ))
        ) : (
          <ContentSpinner />
        )}
      </div>
      {mainInfoList.length > 20 && contentCount < maxContentCount ? (
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

export default SelfCardGrid
