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
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'
import { SelfSmallCard } from 'containers/Self/SelfCard'

type GridProps = {
  isSpinner?: boolean
}

const SelfCardGrid = ({ isSpinner = false }: GridProps) => {
  const mainInfoList = useAppSelector(selfMainInfoList)
  const mainInfoExportList = useAppSelector(selfMainInfoExportList)
  const contentCount = useAppSelector(selfContentCount)
  const countRef = useRef({ count: contentCount })

  const maxContentCount = Math.floor((mainInfoList.length - 1) / 12)

  const dispatch = useAppDispatch()

  const getMainInfoExportList = () => {
    const newList = mainInfoList.slice(0, (contentCount + 1) * 12)
    dispatch(setSelfMainInfoExportList(newList))
  }

  const moreContentEvent = () => {
    dispatch(changeSelfContentCount())
    countRef.current.count += 1
    const newList = mainInfoList.slice(0, (countRef.current.count + 1) * 12)
    dispatch(setSelfMainInfoExportList(newList))
  }

  useEffect(() => {
    getMainInfoExportList()
  }, [mainInfoList])

  return (
    <>
      <Pc>
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
      </Pc>
      <Tablet>
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
      </Tablet>
      <MobileWide>
        <div className={`${styles.layout} ${styles.selfLayoutMobile}`}>
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
      </MobileWide>
      <Mobile>
        <div className={`${styles.layout} ${styles.selfLayoutMobile}`}>
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
      </Mobile>
    </>
  )
}

export default SelfCardGrid
