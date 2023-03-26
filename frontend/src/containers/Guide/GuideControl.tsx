import { useAppDispatch } from 'app/hooks'
import { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { getCategoryList, setCategoryFilter } from 'reducers/guideReducer'

import styles from './GuideContent.module.css'

const GuideControl = () => {
  const [isDrop, setIsDrop] = useState<'none' | 'category' | 'function'>('none')
  const funcList = ['디자인', '개발', '기획', '마케팅', '']
  const [func, setFunc] = useState('') // 기능 분류
  const [categoryList, setCategoryList] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([]) // 카테고리 중복 분류

  const dispatch = useAppDispatch()

  useEffect(() => {
    setCategoryList(getCategoryList(func))
    setCategories([])
  }, [func])

  useEffect(() => {
    dispatch(setCategoryFilter(categories))
  }, [categories])
  return (
    <div className={styles.controlBox}>
      <div className={styles.buttonGroup}>
        <div className={styles.dropBox}>
          <div
            className={`${styles.selectButton} ${
              isDrop === 'category' ? styles.active : styles.dum
            }`}
            onClick={() => {
              if (isDrop !== 'category') setIsDrop('category')
              else setIsDrop('none')
            }}
          >
            {`카테고리 분류${func === '' ? '' : ` : ${func}`}`}
            {isDrop !== 'category' ? <BiChevronDown /> : <BiChevronUp />}
          </div>
          <div
            className={`${styles.selectBox} ${
              isDrop === 'category' ? styles.dum : styles.none
            }`}
            tabIndex={0}
            onBlur={() => setIsDrop(func === '' ? 'none' : 'function')}
          >
            {funcList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.dropItem} ${
                    func === item ? styles.active : styles.dum
                  }`}
                  onClick={() => {
                    setFunc(item)
                    if (item) setIsDrop('function')
                  }}
                >
                  {item || '초기화'}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.dropBox}>
          <div
            className={`${styles.selectButton} ${
              isDrop === 'function' ? styles.active : styles.dum
            }`}
            onClick={() => {
              if (isDrop !== 'function') setIsDrop('function')
              else setIsDrop('none')
            }}
          >
            기능 분류{categories.length > 0 ? ` (${categories.length})` : ''}
            {isDrop !== 'function' ? <BiChevronDown /> : <BiChevronUp />}
          </div>
          <div
            className={`${styles.fuctionBox} ${
              isDrop === 'function' ? styles.dum : styles.none
            }`}
            tabIndex={0}
            onBlur={() => {
              setIsDrop('none')
            }}
          >
            {categoryList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.functionItem} ${
                    categories.includes(item) ? styles.active : styles.dum
                  }`}
                  onClick={() => {
                    if (func) {
                      if (!categories.includes(item))
                        setCategories([...categories, item])
                      else {
                        const tmp: string[] = []
                        categories.map(i => {
                          if (i !== item) tmp.push(i)
                        })
                        setCategories(tmp)
                      }
                    }
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='배우고 싶은 툴을 입력해주세요. 🔍'
        />
      </div>
    </div>
  )
}

export default GuideControl
