import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useRef } from 'react'
import {
  selectGuideList,
  selectRandomList,
  setRandomList,
} from 'reducers/guideReducer'

import styles from './GuideContent.module.css'

const GuideNotice = () => {
  const guideList = useAppSelector(selectGuideList)
  const randomList = useAppSelector(selectRandomList)
  const dispatch = useAppDispatch()

  const tick = useRef<() => void>()

  const callback = () => {
    dispatch(setRandomList())
  }

  useEffect(() => {
    tick.current = callback
  })
  useEffect(() => {
    const t = () => {
      tick.current?.()
    }
    const tmp = setInterval(t, 8000)
    return () => clearInterval(tmp)
  }, [])

  return (
    <div className={styles.notiBox}>
      {[...Array(3)].map((_, index) => {
        return (
          <div key={index} className={styles.notiCard}>
            {guideList[randomList[index]] && (
              <a
                className={styles.cardContent}
                style={{
                  backgroundImage: `url(${guideList[randomList[index]].image})`,
                }}
                href={guideList[randomList[index]].url}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                <div className={styles.contentCover}></div>
                <div className={styles.content}>
                  <div className={styles.contentTitle}>
                    {guideList[randomList[index]].title}
                  </div>
                  <div className={styles.subContent}>
                    <span>#{guideList[randomList[index]].source}</span>
                    <span>
                      {`${guideList[randomList[index]].date}`
                        .substring(0, 10)
                        .replaceAll('-', '.')}
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default GuideNotice
