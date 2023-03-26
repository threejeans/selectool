import { useAppSelector } from 'app/hooks'
import React from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { selectCategories, selectGuideList } from 'reducers/guideReducer'
import { GuideType } from 'types/types'
import styles from './GuideContent.module.css'

const GuideListResult = () => {
  const guideList = useAppSelector(selectGuideList)
  const categories = useAppSelector(selectCategories)
  const getResult = () => {
    const tmp: GuideType[] = []
    if (!categories.length) {
      guideList.map(item => tmp.push(item))
    }
    return tmp.map((item, index) => {
      return (
        <a
          className={styles.guideItem}
          key={index}
          href={item.url}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <div
            className={styles.guideImage}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <span
              className={styles.toolImage}
              style={{
                backgroundImage: `url(${item.toolImage})`,
              }}
            ></span>
          </div>
          <div className={styles.guideInfo}>
            <div className={styles.guideTitle}>{item.title}</div>
            <div className={styles.guideContent}>
              {`${item.content.substring(0, 60)}...`}
            </div>
            <div className={styles.guideSubContent}>
              <span className={styles.guideSource}>{item.source}</span>
              <span>
                {`${item.date}`.substring(0, 10).replaceAll('-', '.')}
              </span>
            </div>
          </div>
        </a>
      )
    })
  }
  return (
    <>
      <div className={styles.guideGrid}>{getResult()}</div>
      <div className={styles.moreGroup}>
        <button className={styles.moreButton}>
          더보기
          <BiChevronDown />
        </button>
      </div>
    </>
  )
}

export default GuideListResult
