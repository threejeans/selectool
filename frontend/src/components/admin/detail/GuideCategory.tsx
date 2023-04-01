import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateGuide,
} from 'features/admin/contents/adminContentsSlice'
import React, { useEffect, useState } from 'react'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { GuideType } from 'types/types'
import ModifyButton from './ModifyButton'
import { getCategoryList } from 'reducers/guideReducer'
import TextInputBox from '../TextInputBox'
import CategoryGroup from '../CategoryGroup'
import DuplicatedCategoryGroup from '../DuplicatedCategoryGroup'

const GuideCategory = () => {
  const guide = useAppSelector(selectCurrentContent) as GuideType

  const dispatch = useAppDispatch()

  const [tmpToolName, setTmpToolName] = useState<string>(guide.toolName)

  const [isFirst, setIsFirst] = useState(true)
  const funcList = ['디자인', '개발', '기획', '마케팅']
  const [categoryList, setCategoryList] = useState<string[]>([])

  const [tmpFunc, setTmpFunc] = useState(guide.func || '')
  const [tmpCategories, setTmpCategories] = useState<string[]>([
    ...guide.categories.map(i => i.name),
  ])

  useEffect(() => {
    setCategoryList(getCategoryList(tmpFunc))
    if (!isFirst) {
      setTmpCategories([])
    } else setIsFirst(false)
  }, [tmpFunc])

  const [isModified, setIsModifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...guide }
      tmp.func = tmpFunc
      tmp.categories = tmpCategories.map(i => {
        return {
          name: i,
        }
      })

      dispatch(updateGuide(tmp)).then(e => {
        console.log(e)
        const gd = e.payload as GuideType
        setTmpFunc(gd.func)
        setTmpCategories(gd.categories.map(i => i.name))
        setIsModifed(false)
      })
    } else setIsModifed(true)
  }
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={handleModify} />
          {'툴 및 분류'}
        </div>
      </div>
      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <td>{'툴 이름'}</td>
            {isModified ? (
              <td>
                <input
                  className={styles.infoItemInput}
                  value={tmpToolName || ''}
                  onChange={e => setTmpToolName(e.target.value)}
                />
              </td>
            ) : (
              <td>{tmpToolName}</td>
            )}
          </tr>
          <tr>
            <td>기능 분류</td>
            {isModified ? (
              <td>
                <CategoryGroup
                  title={''}
                  required={false}
                  list={funcList}
                  category={tmpFunc}
                  setCategory={setTmpFunc}
                />
              </td>
            ) : (
              <td className={styles.cateItemWrap}>
                <span className={styles.cateItem}>{tmpFunc}</span>
              </td>
            )}
          </tr>
          <tr>
            <td>카테고리 분류</td>
            {isModified ? (
              <td>
                <DuplicatedCategoryGroup
                  title={''}
                  required={false}
                  list={categoryList}
                  categories={tmpCategories}
                  setCategories={setTmpCategories}
                />
              </td>
            ) : (
              <td className={styles.cateItemWrap}>
                {tmpCategories.map((item, index) => {
                  return (
                    <span key={index} className={styles.cateItem}>
                      {item}
                    </span>
                  )
                })}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GuideCategory
