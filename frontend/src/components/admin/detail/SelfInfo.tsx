import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateTool,
} from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import { ToolType } from 'types/types'
import ModifyButton from './ModifyButton'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import ImageInput from '../ImageInput'

const SelfInfo = () => {
  const tool = useAppSelector(selectCurrentContent) as ToolType
  const { image, nameKr, nameEn, info, url } = useAppSelector(
    selectCurrentContent,
  ) as ToolType

  const dispatch = useAppDispatch()

  const [tmpImage, setTmpImage] = useState<string>(image)
  const [tmpNameKr, setTmpNameKr] = useState<string>(nameKr)
  const [tmpNameEn, setTmpNameEn] = useState<string>(nameEn)
  const [tmpInfo, setTmpInfo] = useState<string>(info)
  const [tmpUrl, setTmpUrl] = useState<string>(url)

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    const tmp = { ...tool }

    tmp.image = tmpImage
    tmp.nameKr = tmpNameKr
    tmp.nameEn = tmpNameEn
    tmp.info = tmpInfo
    tmp.url = tmpUrl

    dispatch(updateTool(tmp))
      .then(e => {
        console.log(e)
        setIsMofifed(false)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className={styles.section}>
      {isModified ? (
        <>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={tmpImage} alt={nameKr} />
            <ImageInput image={tmpImage} setImage={setTmpImage} />
          </div>
          <div className={styles.title}>
            <ModifyButton value={isModified} setValue={handleModify} />
            <input
              className={styles.mainTitle}
              value={tmpNameKr}
              onChange={e => setTmpNameKr(e.target.value)}
            />
            <input
              className={styles.subTitle}
              value={tmpNameEn}
              onChange={e => setTmpNameEn(e.target.value)}
            />
          </div>
          <input
            className={styles.info}
            value={tmpInfo}
            onChange={e => setTmpInfo(e.target.value)}
          />
          <input
            className={styles.url}
            value={tmpUrl}
            onChange={e => setTmpUrl(e.target.value)}
          />
        </>
      ) : (
        <>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={image} alt={nameKr} />
          </div>
          <div className={styles.title}>
            <ModifyButton value={isModified} setValue={setIsMofifed} />
            <p className={styles.mainTitle}>{nameKr}</p>
            <p className={styles.subTitle}>{nameEn}</p>
          </div>
          <div className={styles.info}>{info}</div>
          <a
            className={styles.url}
            href={url}
            target={'_blank'}
            rel={'noreferrer'}
          >
            웹페이지
            <BsArrowUpRight />
          </a>
        </>
      )}
    </div>
  )
}

export default SelfInfo
