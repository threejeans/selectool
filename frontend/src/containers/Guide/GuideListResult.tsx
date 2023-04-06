import { useAppDispatch, useAppSelector } from 'app/hooks'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import { BiChevronDown } from 'react-icons/bi'
import { BsBookmarkFill } from 'react-icons/bs'
import {
  getGuideList,
  plusContentCnt,
  selectCategories,
  selectContentCnt,
  selectGuideList,
  selectSearchKey,
  switchGuideBookmark,
} from 'reducers/guideReducer'
import { GuideType } from 'types/types'
import { IsBookmarkedType } from 'types/userTypes'
import styles from './GuideContent.module.css'

const GuideListResult = () => {
  const accessToken = useAppSelector(selectAccessToken)
  const guideList = useAppSelector(selectGuideList)
  const categories = useAppSelector(selectCategories)
  const contentCnt = useAppSelector(selectContentCnt)
  const searchKey = useAppSelector(selectSearchKey)

  const dispatch = useAppDispatch()

  const handleScrap = (params: IsBookmarkedType) => {
    if (!accessToken) {
      dispatch(loginModalOpen())
      return
    }
    dispatch(switchGuideBookmark(params)).then(() => {
      dispatch(getGuideList())
    })
  }

  const getResult = () => {
    const tmp = new Set<GuideType>([])
    const max = Math.min(contentCnt, guideList.length)
    if (searchKey.length > 0) {
      let i = 0
      while (tmp.size < max && i < guideList.length) {
        const cur = guideList[i]
        const { title, content }: GuideType = cur
        if (title.includes(searchKey) || content.includes(searchKey))
          tmp.add(cur)
        i++
      }
    } else if (!categories.length) {
      for (let i = 0; i < max; i++) {
        tmp.add(guideList[i])
      }
    } else {
      let i = 0
      while (tmp.size < max && i < categories.length) {
        const cate = categories[i]
        for (let j = 0; j < guideList.length; j++) {
          if (tmp.size >= max) break
          const cur = guideList[j]
          const { categories } = cur
          for (let k = 0; k < categories.length; k++) {
            if (categories[k].name === cate) {
              tmp.add(cur)
              break
            }
          }
        }
        i++
      }
    }
    return [...Array.from(tmp)].map((item, index) => {
      console.log(item.categories)
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
            <BsBookmarkFill
              className={styles.bookmark}
              style={{
                color: `var(${
                  item.isBookmarked
                    ? '--primary-color-main'
                    : '--gray-scale-color-g10'
                })`,
              }}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                if (item.id && item.isBookmarked !== undefined)
                  handleScrap({ id: item.id, isBookmarked: item.isBookmarked })
              }}
            />
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
        <button
          className={styles.moreButton}
          onClick={() => dispatch(plusContentCnt())}
        >
          더보기
          <BiChevronDown />
        </button>
      </div>
    </>
  )
}

export default GuideListResult
