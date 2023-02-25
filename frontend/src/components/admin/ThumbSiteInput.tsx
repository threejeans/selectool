import React from 'react'
import { BsImage } from 'react-icons/bs'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import { s3Config } from 'util/s3Config'
import TextInputBox from './TextInputBox'
import S3 from 'react-aws-s3-typescript'

type ThumbSiteInputProps = {
  idx: number
  subTitle: string
  required: boolean
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
  siteRefs: React.MutableRefObject<HTMLInputElement[]>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const ThumbSiteInput = ({
  idx,
  subTitle,
  required,
  inputRefs,
  siteRefs,
  images,
  setImages,
}: ThumbSiteInputProps) => {
  const iRef = inputRefs
  const sRef = siteRefs

  const handleUpload = (index: number) => {
    if (inputRefs.current[index]) inputRefs.current[index].click()
  }
  const handlePhoto = (e: any, index: number) => {
    const photo = e.target.files
    if (!photo[0]) return
    uploadFile(photo[0], index)
  }
  const uploadFile = async (file: any, index: number) => {
    const ReactS3Client = new S3(s3Config)
    ReactS3Client.uploadFile(file, 'mainClient/' + file.name)
      .then(data => {
        console.log(data.location)
        images[index] = data.location
        setImages([...images])
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <div className={styles.halfSection}>
      <div className={styles.mainClient}>
        {images[idx] ? (
          <img
            src={images[idx]}
            alt='고객사 이미지'
            onClick={() => handleUpload(idx)}
          />
        ) : (
          <span onClick={() => handleUpload(idx)}>
            <BsImage />
          </span>
        )}
        <div>
          <h5>추천 사이즈 50 x 50</h5>
          <h5>JPG, PNG, GIF 등</h5>
          <a href='#' onClick={() => handleUpload(idx)}>
            이미지 업로드 하기
          </a>
          <input
            ref={(el: any) => {
              iRef.current[idx] = el
            }}
            type='file'
            accept='image/jpg, image/jpeg, image/png'
            multiple
            onChange={e => {
              handlePhoto(e, idx)
            }}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <TextInputBox
        textRef={(el: any) => (sRef.current[idx] = el)}
        title={subTitle}
        placeholder={'예시: https://www.apgroup.com/int/ko'}
        required={required}
      />
    </div>
  )
}

export default ThumbSiteInput