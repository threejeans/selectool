import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateTool,
} from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { ToolFuncType, ToolType } from 'types/types'
import SectionPlusBtn from '../SectionPlusBtn'
import ModifyButton from './ModifyButton'

const SelfCore = () => {
  const tool = useAppSelector(selectCurrentContent) as ToolType
  const { toolFunctions } = useAppSelector(selectCurrentContent) as ToolType

  const dispatch = useAppDispatch()
  const [toolFunc, setToolFunc] = useState<number>(toolFunctions.length)
  const [tmpToolFunctions, setTmpToolFunctions] =
    useState<ToolFuncType[]>(toolFunctions)

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...tool }
      const t: ToolFuncType[] = [] // 갯수만큼만 복사
      for (let i = 0; i < toolFunc; i++) t.push(tmpToolFunctions[i])
      tmp.toolFunctions = t

      dispatch(updateTool(tmp))
        .then(e => {
          console.log(e)
          const tf = e.payload.toolFunctions as ToolFuncType[]
          setToolFunc(tf.length)
          setTmpToolFunctions(tf)
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
          {'핵심 기능'}
        </div>
        <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
      </div>
      <div className={styles.functionGrid}>
        {isModified ? (
          <>
            {[...Array(toolFunc)].map((_, index) => {
              return (
                <div key={index} className={styles.cardGrid}>
                  <span className={styles.a}>
                    <SectionPlusBtn
                      idx={index}
                      max={8}
                      value={toolFunc}
                      setValue={setToolFunc}
                    />
                  </span>
                  <input
                    className={styles.b}
                    value={tmpToolFunctions[index]?.name || ''}
                    onChange={e => {
                      const tmp = [...tmpToolFunctions]
                      tmp[index] = {
                        name: e.target.value,
                        content: tmp[index]?.content || '',
                      }
                      setTmpToolFunctions(tmp)
                    }}
                  />
                  <input
                    className={styles.c}
                    value={tmpToolFunctions[index]?.content || ''}
                    onChange={e => {
                      const tmp = [...tmpToolFunctions]
                      tmp[index] = {
                        name: tmp[index]?.name || '',
                        content: e.target.value,
                      }
                      setTmpToolFunctions(tmp)
                    }}
                  />
                </div>
              )
            })}
          </>
        ) : (
          <>
            {toolFunctions.map((item, index) => {
              return (
                <div key={index} className={styles.cardGrid}>
                  <GiCheckMark className={styles.a} />
                  <span className={styles.b}>{item.name}</span>
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

export default SelfCore
