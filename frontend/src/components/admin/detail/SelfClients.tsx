import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateTool,
} from 'features/admin/contents/adminContentsSlice'
import { SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { ClientType, ToolType } from 'types/types'
import ImageInput from '../ImageInput'
import SectionPlusBtn from '../SectionPlusBtn'
import ModifyButton from './ModifyButton'

const SelfClients = () => {
  const tool = useAppSelector(selectCurrentContent) as ToolType
  const { clients } = useAppSelector(selectCurrentContent) as ToolType

  const dispatch = useAppDispatch()
  const [cnt, setCnt] = useState<number>(clients.length)
  const [tmpClients, setTmpClients] = useState<ClientType[]>(clients)
  const [images, setImages] = useState<string[]>(
    clients.map(item => item.image),
  )

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...tool }
      const t: ClientType[] = [] // 갯수만큼만 복사
      for (let i = 0; i < cnt; i++) {
        if (!images[i] || !tmpClients[i]?.name || !tmpClients[i]?.url) {
          toast('내용을 작성해주세요.')
          return
        }
        const c: ClientType = {
          id: tmpClients[i]?.id || 0,
          name: tmpClients[i]?.name,
          image: images[i],
          url: tmpClients[i]?.url,
        }
        t.push(c)
      }
      tmp.clients = t

      dispatch(updateTool(tmp))
        .then(e => {
          console.log(e)
          const tf = e.payload.clients as ClientType[]
          setCnt(tf.length)
          setTmpClients(tf)
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
          {'주요 고객사'}
        </div>
        <p className={styles.subTitle}>{'* 어드민 전체 출력'}</p>
      </div>
      <div className={styles.clientGrid}>
        {isModified ? (
          <>
            {[...Array(cnt)].map((_, index) => {
              return (
                <div key={index} className={styles.client}>
                  <SectionPlusBtn
                    idx={index}
                    max={8}
                    value={cnt}
                    setValue={setCnt}
                  />
                  <div className={styles.imageWrap}>
                    <img
                      src={images[index] || ''}
                      alt={tmpClients[index]?.name || ''}
                    />
                    <ImageInput
                      idx={index}
                      images={images}
                      setImages={setImages}
                    />
                  </div>
                  <input
                    className={styles.clientName}
                    value={tmpClients[index]?.name || ''}
                    onChange={e => {
                      const tmp = [...tmpClients]
                      tmp[index] = {
                        id: tmp[index]?.id || '',
                        name: e.target.value,
                        image: tmp[index]?.image || '',
                        url: tmp[index]?.url || '',
                      }
                      setTmpClients(tmp)
                    }}
                  />
                  <input
                    className={styles.clientUrl}
                    value={tmpClients[index]?.url || ''}
                    onChange={e => {
                      const tmp = [...tmpClients]
                      tmp[index] = {
                        id: tmp[index]?.id || '',
                        name: tmp[index]?.name || '',
                        image: tmp[index]?.image || '',
                        url: e.target.value,
                      }
                      setTmpClients(tmp)
                    }}
                  />
                </div>
              )
            })}
          </>
        ) : (
          <>
            {clients.map((item, index) => {
              return (
                <div key={index} className={styles.client}>
                  <a href={item.url} target={'_blank'} rel={'noreferrer'}>
                    <img src={item.image} alt={item.name} />
                  </a>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default SelfClients
