import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateGuide,
} from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'

import { GuideType } from 'types/types'
import ImageInput from '../ImageInput'
import ModifyButton from './ModifyButton'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'

const GuideThumb = () => {
  const guide = useAppSelector(selectCurrentContent) as GuideType
  const { image, toolImage } = guide

  const dispatch = useAppDispatch()
  const [tmpImage, setTmpImage] = useState<string>(image)
  const [tmpToolImage, setTmpToolImage] = useState<string>(toolImage)

  const [isModified, setIsModifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...guide }
      tmp.image = tmpImage
      tmp.toolImage = tmpToolImage
      dispatch(updateGuide(tmp)).then(e => {
        console.log(e)
        const gd = e.payload as GuideType
        setTmpImage(gd.image)
        setTmpToolImage(gd.toolImage)
        setIsModifed(false)
      })
    } else setIsModifed(true)
  }
  return (
    <div className={styles.section}>
      <div
        className={styles.guideImageWrap}
        style={{ background: `url(${tmpImage}) no-repeat center center/cover` }}
      >
        <ModifyButton value={isModified} setValue={handleModify} />
        {isModified && <ImageInput image={tmpImage} setImage={setTmpImage} />}
        <div
          className={styles.guideToolImageWrap}
          style={{
            background: `url(${tmpToolImage}) no-repeat center center/contain`,
          }}
        >
          {isModified && (
            <ImageInput image={tmpToolImage} setImage={setTmpToolImage} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GuideThumb
