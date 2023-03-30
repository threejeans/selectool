import { useAppDispatch } from 'app/hooks'
import S3 from 'react-aws-s3-typescript'
import { useRef, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { s3Config } from 'util/s3Config'

type ImageInputProps = {
  image?: string
  setImage?: React.Dispatch<React.SetStateAction<string>>
  idx?: number
  images?: string[]
  setImages?: React.Dispatch<React.SetStateAction<string[]>>
}

const ImageInput = ({
  image,
  setImage,
  idx = -1,
  images,
  setImages,
}: ImageInputProps) => {
  const thumbnailRef = useRef<HTMLInputElement | null>(null)

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
        if (setImage) setImage(data.location)
        if (setImages && images && idx !== -1) {
          images[idx] = data.location
          setImages([...images])
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <div className={styles.svgWrap}>
        <BsImage onClick={handleUpload} />
      </div>
      <input
        ref={thumbnailRef}
        type='file'
        accept='image/jpg, image/jpeg, image/png'
        multiple
        onChange={handlePhoto}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default ImageInput
