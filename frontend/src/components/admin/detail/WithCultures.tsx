import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateCorp,
} from 'features/admin/contents/adminContentsSlice'
import { SetStateAction, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { GiCheckMark } from 'react-icons/gi'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { CorpType, CultureType } from 'types/types'
import SectionPlusBtn from '../SectionPlusBtn'
import ModifyButton from './ModifyButton'

const WithCultures = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { cultures } = useAppSelector(selectCurrentContent) as CorpType

  const dispatch = useAppDispatch()
  const [cnt, setCnt] = useState<number>(cultures.length)
  const [tmpCultures, setTmpCultures] = useState<CultureType[]>(cultures)

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...corp }
      const t: CultureType[] = []
      for (let i = 0; i < cnt; i++) t.push(tmpCultures[i])
      tmp.cultures = t
      dispatch(updateCorp(tmp))
        .then(e => {
          console.log(e)
          const ct = e.payload.cultures as CultureType[]
          setCnt(ct.length)
          setTmpCultures(ct)
          setIsMofifed(false)
        })
        .catch(err => console.error(err))
    } else setIsMofifed(true)
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={handleModify} />
          {'조직문화'}
        </div>
        <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
      </div>
      <div className={styles.functionGrid}>
        {isModified ? (
          <>
            {[...Array(cnt)].map((_, index) => (
              <div key={index} className={styles.cardGrid}>
                <span className={styles.a}>
                  <SectionPlusBtn
                    idx={index}
                    max={16}
                    value={cnt}
                    setValue={setCnt}
                  />
                </span>
                <input
                  className={styles.b}
                  value={tmpCultures[index]?.title || ''}
                  onChange={e => {
                    const tmp = [...tmpCultures]
                    tmp[index] = {
                      title: e.target.value,
                      content: tmp[index]?.content || '',
                    }
                    setTmpCultures(tmp)
                  }}
                />
                <input
                  className={styles.c}
                  value={tmpCultures[index]?.content || ''}
                  onChange={e => {
                    const tmp = [...tmpCultures]
                    tmp[index] = {
                      title: tmp[index]?.title || '',
                      content: e.target.value,
                    }
                    setTmpCultures(tmp)
                  }}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {cultures.map((item, index) => {
              return (
                <div key={index} className={styles.cardGrid}>
                  <GiCheckMark className={styles.a} />
                  <span className={styles.b}>{item.title}</span>
                  <span className={styles.c}>{item.content}</span>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default WithCultures
