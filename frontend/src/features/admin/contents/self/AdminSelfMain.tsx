import { useAppDispatch } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import React, { useRef, useState } from 'react'
import S3 from 'react-aws-s3-typescript'
import { BsImage, BsTriangleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toast'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import { s3Config } from 'util/s3Config'
import { createSelfMainTmpInfo, SelfMainTmpInfo } from '../adminContentsSlice'

type TextInputBoxProps = {
  textRef: any
  title: string
  placeholder: string
  required: boolean
}

export const TextInputBox = ({
  textRef,
  title,
  placeholder,
  required,
}: TextInputBoxProps) => {
  return (
    <div>
      <h5 className={styles.label}>
        {title}
        {required && <span className={styles.required}>{'*'}</span>}
      </h5>
      <input
        ref={textRef}
        className={styles.input}
        type='text'
        placeholder={placeholder}
      />
    </div>
  )
}

const AdminSelfMain = () => {
  const koRef = useRef<HTMLInputElement | null>(null)
  const enRef = useRef<HTMLInputElement | null>(null)
  const discriptionRef = useRef<HTMLInputElement | null>(null)
  const topicRef = useRef<HTMLSelectElement | null>(null)
  const [category, setCategory] = useState('Other')
  const [country, setContry] = useState('국내')
  const thumbnailRef = useRef<HTMLInputElement | null>(null)
  const [thumbnail, setThumbnail] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()

    const data: SelfMainTmpInfo = {
      individualToolNameKr: '',
      individualToolNameEn: '',
      individualToolInfo: '',
      individualToolTopic: '',
      individualToolTag: '',
      individualToolCountry: '',
      individualToolLogo: '',
    }

    if (koRef.current) {
      if (koRef.current.value.length === 0) {
        koRef.current.focus()
        popToast()
        return
      } else data.individualToolNameKr = koRef.current.value
    }
    if (enRef.current) {
      if (enRef.current.value.length === 0) {
        enRef.current.focus()
        popToast()
        return
      } else data.individualToolNameEn = enRef.current.value
    }
    if (discriptionRef.current) {
      if (discriptionRef.current.value.length === 0) {
        discriptionRef.current.focus()
        popToast()
        return
      } else data.individualToolInfo = discriptionRef.current.value
    }
    if (topicRef.current) {
      if (topicRef.current.value.length === 0) {
        topicRef.current.focus()
        return
      } else data.individualToolTopic = topicRef.current.value
    }
    if (category) data.individualToolTag = category
    if (country) data.individualToolCountry = country
    if (thumbnail === '') {
      popToast()
      handleUpload()
      return
    } else data.individualToolLogo = thumbnail

    dispatch(createSelfMainTmpInfo(data))
      .then(e => {
        if (e.meta.requestStatus === 'fulfilled')
          navigate('/admin/contents/self/specific')
        else
          toast('🚨저장이 실패했어요!', {
            backgroundColor: '#f59892',
            color: 'white',
          })
      })
      .catch(err => toast.error(err))
  }

  const popToast = () => {
    toast('🚨콘텐츠 내용이 모두 입력되지 않았어요!', {
      backgroundColor: '#f59892',
      color: 'white',
    })
  }

  const handleUpload = () => {
    if (thumbnailRef.current) thumbnailRef.current.click()
  }

  const handlePhoto = (e: any) => {
    const photo = e.target.files
    if (!photo[0]) return
    uploadFile(photo[0])
    // setThumbnail(URL.createObjectURL(photo[0]))
  }

  const uploadFile = async (file: any) => {
    const ReactS3Client = new S3(s3Config)
    ReactS3Client.uploadFile(file, 'thumbnails/' + file.name)
      .then(data => {
        console.log(data.location)
        setThumbnail(data.location)
      })
      .catch(err => console.error(err))
  }

  const CategoryGroup = () => {
    const list = ['디자인', '개발', '마케팅', '기획', 'Other']
    return list.map((item, index) => {
      return (
        <AdminButton
          key={index}
          color={category == item ? 'primary' : 'white'}
          size={'tag'}
          text={item}
          onClick={() => setCategory(item)}
        />
      )
    })
  }

  const CountryGroup = () => {
    const list = ['국내', '해외']
    return list.map((item, index) => {
      return (
        <AdminButton
          key={index}
          color={country == item ? 'primary' : 'white'}
          size={'tag'}
          text={item}
          onClick={() => setContry(item)}
        />
      )
    })
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>혼자써요 main</h3>
      <div className={styles.section}>
        <TextInputBox
          textRef={koRef}
          title={'프로덕트 이름'}
          placeholder={'예시: 노션, 피그마'}
          required={true}
        />
        <TextInputBox
          textRef={enRef}
          title={'프로덕트 영문명'}
          placeholder={'예시: Notion, Figma'}
          required={true}
        />
        <TextInputBox
          textRef={discriptionRef}
          title={'프로덕트 한 줄 소개'}
          placeholder={'예시: 프로젝트 관림 및 기록 소프트웨어'}
          required={true}
        />
        <div>
          <h5 className={styles.label}>
            프로덕트 토픽{<span className={styles.required}>{'*'}</span>}
          </h5>
          <div className={styles.selectBox}>
            <select ref={topicRef} className={styles.select}>
              <option value=''>선택</option>
              <option value='디자인'>디자인</option>
              <option value='화상회의'>화상회의</option>
              <option value='개발'>개발</option>
              <option value='아카이빙'>아카이빙</option>
              <option value='화이트보드'>화이트보드</option>
              <option value='기타'>기타</option>
            </select>
            <BsTriangleFill className={styles.arrowDown} />
          </div>
        </div>
        <div>
          <h5 className={styles.label}>프로덕트 분류</h5>
          <div className={styles.categoryGroup}>{CategoryGroup()}</div>
        </div>
        <div>
          <h5 className={styles.label}>프로덕트 국가</h5>
          <div className={styles.countryGroup}>{CountryGroup()}</div>
        </div>
        <div>
          <h5 className={styles.label}>
            섬네일 이미지{<span className={styles.required}>{'*'}</span>}
          </h5>
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
        </div>
      </div>
      {/* btn */}
      <div className={styles.btnGroup}>
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Cancel'}
          onClick={(e: React.MouseEvent) => console.log(e.target)}
        />
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Save'}
          onClick={(e: React.MouseEvent) => console.log(e.target)}
        />
        <AdminButton
          color={'next'}
          size={'md'}
          text={'Next'}
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default AdminSelfMain
