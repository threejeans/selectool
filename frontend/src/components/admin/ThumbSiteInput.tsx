import React from 'react'
import { BsImage } from 'react-icons/bs'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import { s3Config } from 'util/s3Config'
import TextInputBox from './TextInputBox'
import S3 from 'react-aws-s3-typescript'

type ThumbSiteInputProps = {
  idx: number
  subName?: string
  subTitle?: string
  required: boolean
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
  siteRefs?: React.MutableRefObject<HTMLInputElement[]>
  nameRefs?: React.MutableRefObject<HTMLInputElement[]>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  names?: string[]
  setNames?: React.Dispatch<React.SetStateAction<string[]>>
  values?: string[]
  setValues?: React.Dispatch<React.SetStateAction<string[]>>
  disabled?: boolean
}

const ThumbSiteInput = ({
  idx,
  subName,
  subTitle,
  required,
  inputRefs,
  siteRefs,
  nameRefs,
  images,
  setImages,
  names,
  setNames,
  values,
  setValues,
  disabled = false,
}: ThumbSiteInputProps) => {
  const iRef = inputRefs

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
    ReactS3Client.uploadFile(
      file,
      'mainClient/' +
        file.name.split('.')[0] +
        `_${Math.floor(Math.random() * 12345 + 1)}`,
    )
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
            {disabled ? '직접 업로드가 불가합니다.' : '이미지 업로드 하기'}
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
            disabled={disabled}
          />
        </div>
      </div>
      {subName && setNames && (
        <TextInputBox
          idx={idx}
          values={names}
          setValues={setNames}
          title={subName}
          placeholder={
            disabled
              ? '직접 입력이 불가합니다.'
              : '예시: https://www.apgroup.com/int/ko'
          }
          required={required}
          disabled={disabled}
          nonFocus={true}
        />
      )}
      {subTitle &&
        setValues && ( // state 입력방식
          <TextInputBox
            idx={idx}
            values={values}
            setValues={setValues}
            title={subTitle}
            placeholder={
              disabled
                ? '직접 입력이 불가합니다.'
                : '예시: https://www.apgroup.com/int/ko'
            }
            required={required}
            disabled={disabled}
            nonFocus={true}
          />
        )}
    </div>
  )
}

export default ThumbSiteInput
