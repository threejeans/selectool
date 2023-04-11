import React, { useEffect, useState } from 'react'
import styles from './withCard.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { setWithMainInfoList, withMainInfoList } from 'reducers/withReducer'
import { withUnscrapToolAPI } from 'api/authWith'
import { WithCorpType } from 'types/types'
import { setWithScrapList } from 'reducers/settingReducer'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

type CardProps = {
  data: WithCorpType
}

const WithSmallCard = ({ data }: CardProps) => {
  const [toastStatus, setToastStatus] = useState(false)
  const withMainList = useAppSelector(withMainInfoList)

  const dispatch = useAppDispatch()

  const handleToast = () => {
    setToastStatus(true)
  }

  const handleScrap = async () => {
    const response = await dispatch(withUnscrapToolAPI(data.id)).unwrap()

    if (response.statusCode === 200 || response.statusCode === 201) {
      const newList = withMainList.map(item =>
        item.id === data.id
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item,
      )
      dispatch(setWithMainInfoList(newList))

      const newScrapList = withMainList.filter(
        item => item.isBookmarked === true,
      )
      dispatch(setWithScrapList(newScrapList))

      handleToast()
    } else {
      console.log('error', response.statusCode)
    }
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000)
    }
  })

  return (
    <>
      <Pc>
        <div className={styles.smallCardContainer}>
          <div className={styles.smallTopBar}></div>
          {toastStatus && (
            <div className={`${styles.toast} ${styles.toast_cancel}`}>
              북마크가 취소되었어요
            </div>
          )}
          <BsFillBookmarkFill
            className={`${styles.smallBookmark} ${
              data.isBookmarked ? styles.bookmarkScraped : null
            }`}
            onClick={handleScrap}
          ></BsFillBookmarkFill>
          <div className={styles.contentsSmallContainer}>
            <div className={styles.companyLogoContainer}>
              <img src={data.image} className={styles.companyLogoSmall}></img>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.companyInfoContainer}>
                <div className={styles.companyName}>{data.nameKr}</div>
                <div className={styles.companyCoName}>{data.teamNameKr}</div>
              </div>
              <div className={styles.description}>{data.info}</div>
            </div>
          </div>
        </div>
      </Pc>
      <Tablet>
        <div className={styles.smallCardContainer}>
          <div className={styles.smallTopBar}></div>
          {toastStatus && (
            <div className={`${styles.toast} ${styles.toast_cancel}`}>
              북마크가 취소되었어요
            </div>
          )}
          <BsFillBookmarkFill
            className={`${styles.smallBookmark} ${
              data.isBookmarked ? styles.bookmarkScraped : null
            }`}
            onClick={handleScrap}
          ></BsFillBookmarkFill>
          <div className={styles.contentsSmallContainer}>
            <div className={styles.companyLogoContainer}>
              <img src={data.image} className={styles.companyLogoSmall}></img>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.companyInfoContainer}>
                <div className={styles.companyName}>{data.nameKr}</div>
                <div className={styles.companyCoName}>{data.teamNameKr}</div>
              </div>
              <div className={styles.description}>{data.info}</div>
            </div>
          </div>
        </div>
      </Tablet>
      <MobileWide>
        <div className={styles.cardContainerMobile}>
          <div className={styles.topBar}></div>
          {toastStatus && (
            <div className={`${styles.toastMobile} ${styles.toast_cancel}`}>
              북마크가 취소되었어요
            </div>
          )}
          <BsFillBookmarkFill
            className={`${styles.smallBookmark} ${
              data.isBookmarked ? styles.bookmarkScraped : null
            }`}
            onClick={handleScrap}
          ></BsFillBookmarkFill>
          <div className={styles.contentsContainer}>
            <div className={styles.companyLogoContainer}>
              <img src={data.image} className={styles.companyLogoMobile}></img>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.companyInfoContainer}>
                <div className={styles.companyNameMobile}>{data.nameKr}</div>
                <div className={styles.companyCoNameMobile}>
                  {data.teamNameKr}
                </div>
              </div>
              <div className={styles.description}>{data.info}</div>
            </div>
          </div>
        </div>
      </MobileWide>
      <Mobile>
        <div className={styles.cardContainerMobile}>
          <div className={styles.topBar}></div>
          {toastStatus && (
            <div className={`${styles.toastMobile} ${styles.toast_cancel}`}>
              북마크가 취소되었어요
            </div>
          )}
          <BsFillBookmarkFill
            className={`${styles.smallBookmark} ${
              data.isBookmarked ? styles.bookmarkScraped : null
            }`}
            onClick={handleScrap}
          ></BsFillBookmarkFill>
          <div className={styles.contentsContainer}>
            <div className={styles.companyLogoContainer}>
              <img src={data.image} className={styles.companyLogoMobile}></img>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.companyInfoContainer}>
                <div className={styles.companyNameMobile}>{data.nameKr}</div>
                <div className={styles.companyCoNameMobile}>
                  {data.teamNameKr}
                </div>
              </div>
              <div className={styles.description}>{data.info}</div>
            </div>
          </div>
        </div>
      </Mobile>
    </>
  )
}

export default WithSmallCard
