import React, { useEffect, useRef } from 'react'
import styles from './CardGrid.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  changeSelfScrapCount,
  selfScrapCount,
  selfScrapExportList,
  selfScrapList,
  setSelfScrapExportList,
} from 'reducers/settingReducer'
import { SelfSmallCard } from 'containers/Self/SelfCard'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown } from 'react-icons/bs'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const SelfScrapCardGrid = () => {
  const scrapList = useAppSelector(selfScrapList)
  const scrapExportList = useAppSelector(selfScrapExportList)
  const contentCount = useAppSelector(selfScrapCount)

  const countRef = useRef({ count: contentCount })

  const maxContentCount = Math.floor((scrapList.length - 1) / 12)

  const dispatch = useAppDispatch()

  const getScrapExportList = () => {
    const newList = scrapList.slice(0, (contentCount + 1) * 12)
    dispatch(setSelfScrapExportList(newList))
  }

  const moreContentEvent = () => {
    dispatch(changeSelfScrapCount())
    countRef.current.count += 1
    const newList = scrapList.slice(0, (countRef.current.count + 1) * 12)
    dispatch(setSelfScrapExportList(newList))
  }

  useEffect(() => {
    getScrapExportList()
  }, [scrapList])

  return (
    <>
      <Pc>
        <div className={styles.layout}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <SelfSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 툴이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  마음에 드는 툴을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/self'}>
                  <span className={styles.noSearchResetText}>
                    툴 둘러보러 가기 →
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
        {scrapList.length > 12 && contentCount < maxContentCount ? (
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
        <div className={styles.layout}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <SelfSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 툴이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  마음에 드는 툴을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/self'}>
                  <span className={styles.noSearchResetText}>
                    툴 둘러보러 가기 →
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
        {scrapList.length > 12 && contentCount < maxContentCount ? (
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
        <div className={styles.layoutMobile}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <SelfSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 툴이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  마음에 드는 툴을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/self'}>
                  <span className={styles.noSearchResetText}>
                    툴 둘러보러 가기 →
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
        {scrapList.length > 12 && contentCount < maxContentCount ? (
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
        <div className={styles.layoutMobile}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <SelfSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 툴이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  마음에 드는 툴을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/self'}>
                  <span className={styles.noSearchResetText}>
                    툴 둘러보러 가기 →
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
        {scrapList.length > 12 && contentCount < maxContentCount ? (
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

export default SelfScrapCardGrid
