import { useAppDispatch, useAppSelector } from 'app/hooks'
import { InputChangeEvent } from 'components/Input'
import { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import {
  getCategoryList,
  selectSearchKey,
  setCategoryFilter,
  setSearchKey,
} from 'reducers/guideReducer'

import styles from './GuideContent.module.css'
import SearchForm from 'components/SearchForm'
import { FiSearch } from 'react-icons/fi'

const GuideControl = () => {
  const searchKey = useAppSelector(selectSearchKey)

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

  useEffect(() => {
    if (searchKey.length > 0) {
      setCategories([])
      setFunc('')
    }
  }, [searchKey])

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
                  {item || '선택안함'}
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
            {categoryList.length > 0 && (
              <span className={styles.duple}>* 복수 선택이 가능해요.</span>
            )}
          </div>
        </div>
        <div className={styles.dropBox}>
          {categories.length > 0 && (
            <div className={styles.selectButton} onClick={() => setFunc('')}>
              선택 초기화
            </div>
          )}
        </div>
      </div>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          value={searchKey || ''}
          onChange={e => dispatch(setSearchKey(e.target.value))}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              setFunc('')
              setCategories([])
            }
          }}
          type='text'
          placeholder='배우고 싶은 툴을 입력해주세요.'
        />
        {searchKey === '' ? <FiSearch className={styles.search} /> : ''}
      </div>
    </div>
  )
}

export default GuideControl
