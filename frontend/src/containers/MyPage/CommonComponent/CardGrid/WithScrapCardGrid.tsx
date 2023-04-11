import { WithCard, WithSmallCard } from 'containers/With'
import styles from './CardGrid.module.css'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  changeWithScrapCount,
  setWithScrapExportList,
  withScrapExportList,
  withScrapList,
  withScrapCount,
} from 'reducers/settingReducer'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown } from 'react-icons/bs'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const WithScrapCardGrid = () => {
  const scrapList = useAppSelector(withScrapList)
  const scrapExportList = useAppSelector(withScrapExportList)
  const contentCount = useAppSelector(withScrapCount)

  const countRef = useRef({ count: contentCount })

  const maxContentCount = Math.floor((scrapList.length - 1) / 12)

  const dispatch = useAppDispatch()

  const getScrapExportList = () => {
    const newList = scrapList.slice(0, (contentCount + 1) * 12)
    dispatch(setWithScrapExportList(newList))
  }

  const moreContentEvent = () => {
    dispatch(changeWithScrapCount())
    countRef.current.count += 1
    const newList = scrapList.slice(0, (countRef.current.count + 1) * 12)
    dispatch(setWithScrapExportList(newList))
  }

  useEffect(() => {
    getScrapExportList()
  }, [scrapList])

  return (
    <>
      <Pc>
        <div className={styles.layoutWith}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <WithSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 기업이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  관심 있는 기업을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/with'}>
                  <span className={styles.noSearchResetText}>
                    기업 둘러보러 가기 →
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
        <div className={styles.layoutWith}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <WithSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 기업이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  관심 있는 기업을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/with'}>
                  <span className={styles.noSearchResetText}>
                    기업 둘러보러 가기 →
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
        <div className={styles.layoutWithMobile}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <WithCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayoutMobile}>
              <div className={styles.noSearchLayoutMobile}>
                <div className={styles.noSearchMainTextMobile}>
                  아직 저장된 기업이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubTextMobile}>
                  관심 있는 기업을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/with'}>
                  <span className={styles.noSearchResetTextMobile}>
                    기업 둘러보러 가기 →
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
        <div className={styles.layoutWithMobile}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <WithCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayoutMobile}>
              <div className={styles.noSearchLayoutMobile}>
                <div className={styles.noSearchMainTextMobile}>
                  아직 저장된 기업이 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubTextMobile}>
                  관심 있는 기업을 저장하시면 이 곳에서 한눈에 확인할 수 있어요
                </div>
                <Link to={'/with'}>
                  <span className={styles.noSearchResetTextMobile}>
                    기업 둘러보러 가기 →
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

export default WithScrapCardGrid
