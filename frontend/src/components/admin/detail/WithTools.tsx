import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  searchTool,
  selectCurrentContent,
  updateCorp,
} from 'features/admin/contents/adminContentsSlice'
import { disconnect } from 'process'
import { SetStateAction, useEffect, useState } from 'react'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { CorpType, ToolType } from 'types/types'
import SearchInputBox from '../SearchInputBox'
import SectionPlusBtn from '../SectionPlusBtn'
import ModifyButton from './ModifyButton'
const WithTools = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { tools } = useAppSelector(selectCurrentContent) as CorpType

  const dispatch = useAppDispatch()
  const [cnt, setCnt] = useState<number>(tools.length || 1)
  const [tmpTools, setTmpTools] = useState<ToolType[]>(tools)

  const [isDrop, setIsDrop] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState<string>('')
  const [itemList, setItemList] = useState<ToolType[]>([])

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...corp }
      const t: ToolType[] = []
      for (let i = 0; i < cnt; i++) t.push(tmpTools[i])

      tmp.tools = t

      dispatch(updateCorp(tmp)).then(e => {
        console.log(e)
        const ts = e.payload.tools as ToolType[]
        setCnt(ts.length)
        setTmpTools(ts)
        setIsMofifed(false)
      })
    } else setIsMofifed(true)
  }

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      if (searchKey && isLoading) {
        dispatch(searchTool(searchKey)).then(data => {
          setIsDrop(true)
          setIsLoading(false)
          if (data.meta.requestStatus === 'fulfilled') {
            setItemList(data.payload)
            if (data.payload.length === 0) setIsDrop(false)
          }
        })
      } else {
        setIsDrop(false)
      }
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [searchKey])

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={handleModify} />
          {'사내 협업툴'}
        </div>
        <p className={styles.subTitle}>{'* 어드민 전체 출력'}</p>
      </div>
      <div className={styles.branchGrid}>
        {isModified ? (
          <>
            {[...Array(cnt)].map((_, index) => {
              return (
                <div key={index} className={styles.branch}>
                  <SectionPlusBtn
                    idx={index}
                    max={tmpTools.length + 1}
                    value={cnt}
                    setValue={setCnt}
                  />
                  {tmpTools[index] ? (
                    <>
                      <img
                        src={tmpTools[index]?.image || ''}
                        alt={tmpTools[index]?.nameKr || ''}
                      />
                      <div className={styles.subTitle}>
                        {tmpTools[index]?.nameKr || ''}
                      </div>
                    </>
                  ) : (
                    <div className={styles.searchBox}>
                      <input
                        className={styles.searchInput}
                        value={searchKey}
                        onChange={e => setSearchKey(e.target.value)}
                      />
                      <div
                        className={`${styles.drop}${
                          isDrop ? '' : ` ${styles.none}`
                        }`}
                      >
                        {itemList.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className={styles.searchItem}
                              onClick={() => {
                                setTmpTools([...tmpTools, item])
                                setSearchKey('')
                                setItemList([])
                                setIsDrop(false)
                              }}
                            >
                              {item.nameKr}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </>
        ) : (
          <>
            {tools.map((item, index) => {
              if (item.image)
                return (
                  <div key={index} className={styles.branch}>
                    <a href={item.url} target={'_blank'} rel={'noreferrer'}>
                      <img src={item.image} alt={item.nameKr} />
                    </a>
                    <div className={styles.subTitle}>{item.nameKr}</div>
                  </div>
                )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default WithTools
