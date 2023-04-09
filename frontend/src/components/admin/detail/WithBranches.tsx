import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateCorp,
} from 'features/admin/contents/adminContentsSlice'
import { SetStateAction, useState } from 'react'
import { BranchType, CorpType } from 'types/types'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import ModifyButton from './ModifyButton'
import SectionPlusBtn from '../SectionPlusBtn'
import ImageInput from '../ImageInput'
import { toast } from 'react-toastify'

const WithBranches = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { branches } = useAppSelector(selectCurrentContent) as CorpType

  const dispatch = useAppDispatch()
  const [cnt, setCnt] = useState<number>(branches.length)
  const [tmpBranches, setTmpBranches] = useState<BranchType[]>(branches)
  const [images, setImages] = useState<string[]>(
    branches.map(item => item.image),
  )

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...corp }
      const t: BranchType[] = []
      for (let i = 0; i < cnt; i++) {
        if (!images[i] || !tmpBranches[i]?.name) {
          toast('내용을 작성해주세요.')
          return
        }
        const b: BranchType = {
          image: images[i],
          name: tmpBranches[i].name,
        }
        t.push(b)
      }
      tmp.branches = t
      dispatch(updateCorp(tmp))
        .then(e => {
          console.log(e)
          const bc = e.payload.branches as BranchType[]
          setCnt(bc.length)
          setTmpBranches(bc)
          setImages(bc.map(i => i.image))
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
          {'자회사'}
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
                    max={8}
                    value={cnt}
                    setValue={setCnt}
                  />
                  <div className={styles.imageWrap}>
                    <img
                      src={images[index] || ''}
                      alt={tmpBranches[index]?.name || ''}
                    />
                    <ImageInput
                      idx={index}
                      images={images}
                      setImages={setImages}
                    />
                  </div>
                  <input
                    className={styles.clientName}
                    value={tmpBranches[index]?.name || ''}
                    onChange={e => {
                      const tmp = [...tmpBranches]
                      tmp[index] = {
                        image: tmp[index]?.image || '',
                        name: e.target.value,
                      }
                      setTmpBranches(tmp)
                    }}
                  />
                </div>
              )
            })}
          </>
        ) : (
          <>
            {branches.map((item, index) => {
              if (item.image)
                return (
                  <div key={index} className={styles.branch}>
                    <img src={item.image} alt={item.name} />
                  </div>
                )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default WithBranches
