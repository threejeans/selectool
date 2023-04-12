import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect, useRef, useState } from 'react'
import {
  changeGuideScrapCount,
  guideListForScrap,
  guideScrapCount,
  guideScrapExportList,
  guideScrapList,
  setGuideListForScrap,
  setGuideScrapExportList,
  setGuideScrapList,
} from 'reducers/settingReducer'
import styles from './CardGrid.module.css'
import { Link } from 'react-router-dom'
import { BsChevronCompactDown, BsFillBookmarkFill } from 'react-icons/bs'
import { GuideType } from 'types/types'
import { getMemberGuideList, switchGuideBookmark } from 'reducers/guideReducer'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'
import { getAuthGuideInfoAPI } from 'api/setting'

const GuideScrapCardGrid = () => {
  const scrapList = useAppSelector(guideScrapList)
  const scrapExportList = useAppSelector(guideScrapExportList)
  const contentCount = useAppSelector(guideScrapCount)

  const countRef = useRef({ count: contentCount })

  const maxContentCount = Math.floor((scrapList.length - 1) / 12)

  const dispatch = useAppDispatch()

  const getScrapExportList = () => {
    const newList = scrapList.slice(0, (contentCount + 1) * 12)
    dispatch(setGuideScrapExportList(newList))
  }

  const moreContentEvent = () => {
    dispatch(changeGuideScrapCount())
    countRef.current.count += 1
    const newList = scrapList.slice(0, (countRef.current.count + 1) * 12)
    dispatch(setGuideScrapExportList(newList))
  }

  useEffect(() => {
    getScrapExportList()
  }, [scrapList])

  return (
    <>
      <Pc>
        <div className={styles.guideLayout}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <GuideSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 가이드가 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  도움 되는 가이드를 저장하시면 이 곳에서 한눈에 확인할 수
                  있어요
                </div>
                <Link to={'/guide'}>
                  <span className={styles.noSearchResetText}>
                    가이드 둘러보러 가기 →
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
        <div className={styles.guideLayout}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <GuideSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayout}>
              <div className={styles.noSearchLayout}>
                <div className={styles.noSearchMainText}>
                  아직 저장된 가이드가 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubText}>
                  도움 되는 가이드를 저장하시면 이 곳에서 한눈에 확인할 수
                  있어요
                </div>
                <Link to={'/guide'}>
                  <span className={styles.noSearchResetText}>
                    가이드 둘러보러 가기 →
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
        <div className={styles.guideLayoutMobile}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <GuideSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayoutMobile}>
              <div className={styles.noSearchLayoutMobile}>
                <div className={styles.noSearchMainTextMobile}>
                  아직 저장된 가이드가 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubTextMobile}>
                  도움 되는 가이드를 저장하시면 이 곳에서 한눈에 확인할 수
                  있어요
                </div>
                <Link to={'/guide'}>
                  <span className={styles.noSearchResetTextMobile}>
                    가이드 둘러보러 가기 →
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
        <div className={styles.guideLayoutMobile}>
          {scrapExportList.length > 0 ? (
            scrapExportList.map((data, idx) => (
              <GuideSmallCard data={data} key={idx} />
            ))
          ) : (
            <div className={styles.noContentlayoutMobile}>
              <div className={styles.noSearchLayoutMobile}>
                <div className={styles.noSearchMainTextMobile}>
                  아직 저장된 가이드가 없어요 :&#40;
                </div>
                <div className={styles.noSearchSubTextMobile}>
                  도움 되는 가이드를 저장하시면 이 곳에서 한눈에 확인할 수
                  있어요
                </div>
                <Link to={'/guide'}>
                  <span className={styles.noSearchResetTextMobile}>
                    가이드 둘러보러 가기 →
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

export default GuideScrapCardGrid

type guidePropsType = {
  data: GuideType
}

export const GuideSmallCard = ({ data }: guidePropsType) => {
  const [toastStatus, setToastStatus] = useState(false)
  const guideMainList = useAppSelector(guideListForScrap)

  const dispatch = useAppDispatch()

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async () => {
    data.id && data.isBookmarked !== undefined
      ? await dispatch(
          switchGuideBookmark({ id: data.id, isBookmarked: data.isBookmarked }),
        ).then(async () => {
          const response = await dispatch(getAuthGuideInfoAPI()).unwrap()

          dispatch(setGuideListForScrap(response.data))

          const newScrapList = guideMainList.filter(
            item => item.isBookmarked === true,
          )
          dispatch(setGuideScrapList(newScrapList))

          handleToast()
        })
      : ''
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000)
    }
  })

  return (
    <div className={styles.guideScrapContainer}>
      {toastStatus && (
        <div className={`${styles.toast} ${styles.toast_cancel}`}>
          북마크가 취소되었어요
        </div>
      )}
      <BsFillBookmarkFill
        className={`${styles.guideBookmark} ${
          data.isBookmarked ? styles.bookmarkScraped : null
        }`}
        onClick={handleScrap}
      ></BsFillBookmarkFill>
      <div className={styles.guideContentsContainer}>
        <img src={data.image} className={styles.guideImage}></img>
        <div className={styles.guideTextContainer}>
          <div className={styles.guideTitle}>{data.title}</div>
          <div className={styles.guideContent}>
            {data.content && data.content.length > 32
              ? `${data.content.substring(0, 32)}...`
              : data.content}
          </div>
          <div className={styles.guideTextBottom}>
            {' '}
            <div className={styles.guideSource}>{data.source}</div>
            <div className={styles.guideContent}>
              {data.date?.toString().substring(0, 10)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
