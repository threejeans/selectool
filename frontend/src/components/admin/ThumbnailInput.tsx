import { useAppDispatch } from 'app/hooks'
import S3 from 'react-aws-s3-typescript'
import { useRef, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import { s3Config } from 'util/s3Config'

type ThumbnailInputProps = {
  thumbnail: string
  setThumbnail: React.Dispatch<React.SetStateAction<string>>
}

const ThumbnailInput = ({ thumbnail, setThumbnail }: ThumbnailInputProps) => {
  const thumbnailRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useAppDispatch()

  const handleUpload = () => {
    if (thumbnailRef.current) thumbnailRef.current.click()
  }

  const handlePhoto = (e: any) => {
    const photo = e.target.files
    if (!photo[0]) return
    uploadFile(photo[0])
  }

  const uploadFile = async (file: any) => {
    const ReactS3Client = new S3(s3Config)
    ReactS3Client.uploadFile(
      file,
      'thumbnails/' +
        file.name.split('.')[0] +
        `_${Math.floor(Math.random() * 12345 + 1)}`,
    )
      .then(data => {
        console.log(data.location)
        setThumbnail(data.location)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className={styles.thumbnail}>
      {thumbnail ? (
        <img src={thumbnail} alt='섬네일 이미지' onClick={handleUpload} />
      ) : (
        <span onClick={handleUpload}>
          <BsImage />
        </span>
      )}
      <div>
        <h5>추천 사이즈 50 x 50</h5>
        <h5>JPG, PNG, GIF 등</h5>
        <a href='#' onClick={handleUpload}>
          이미지 업로드 하기
        </a>
        <input
          ref={thumbnailRef}
          type='file'
          accept='image/jpg, image/jpeg, image/png'
          multiple
          onChange={handlePhoto}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default ThumbnailInput
