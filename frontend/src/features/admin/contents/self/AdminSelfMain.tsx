import { useAppDispatch } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import CategoryGroup from 'components/admin/CategoryGroup'
import DuplicatedCategoryGroup from 'components/admin/DuplicatedCategoryGroup'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbnailInput from 'components/admin/ThumbnailInput'
import React, { useRef, useState } from 'react'
import { BsTriangleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import { popToast, selfMainTmpSave } from '../adminContentsSlice'

const AdminSelfMain = () => {
  const koRef = useRef<HTMLInputElement | null>(null)
  const enRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const hoverMsgRef = useRef<HTMLInputElement | null>(null)
  const topicRef = useRef<HTMLSelectElement | null>(null)

  const categoryList = ['디자인', '개발', '마케팅', '기획', 'Other']
  const [categories, setCategories] = useState<string[]>(['Other'])
  const countryList = ['국내', '해외']
  const [country, setCountry] = useState('국내')

  const [thumbnail, setThumbnail] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()

    const data = {
      nameKr: '',
      nameEn: '',
      info: '',
      msg: '',
      topic: '',
      categories: [''],
      country: '',
      image: '',
    }

    if (koRef.current) {
      if (koRef.current.value.length === 0) {
        koRef.current.focus()
        popToast(false)
        return
      } else data.nameKr = koRef.current.value
    }
    if (enRef.current) {
      if (enRef.current.value.length === 0) {
        enRef.current.focus()
        popToast(false)
        return
      } else data.nameEn = enRef.current.value
    }
    if (descriptionRef.current) {
      if (descriptionRef.current.value.length === 0) {
        descriptionRef.current.focus()
        popToast(false)
        return
      } else data.info = descriptionRef.current.value
    }
    if (hoverMsgRef.current) {
      if (hoverMsgRef.current.value.length === 0) {
        hoverMsgRef.current.focus()
        popToast(false)
        return
      } else data.msg = hoverMsgRef.current.value
    }
    if (topicRef.current) {
      if (topicRef.current.value.length === 0) {
        topicRef.current.focus()
        popToast(false)
        return
      } else data.topic = topicRef.current.value
    }
    if (categories) data.categories = categories
    if (country) data.country = country
    if (thumbnail === '') {
      popToast('섬네일')
      return
    } else data.image = thumbnail

    dispatch(selfMainTmpSave(data))
    navigate('/admin/contents/self/specific')
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
          textRef={descriptionRef}
          title={'프로덕트 한 줄 소개'}
          placeholder={'예시: 프로젝트 관림 및 기록 소프트웨어'}
          required={true}
        />
        <TextInputBox
          textRef={hoverMsgRef}
          title={'프로덕트 호버 메세지'}
          placeholder={'예시: Better Togather'}
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
        <DuplicatedCategoryGroup
          title={'프로덕트 분류'}
          required={false}
          list={categoryList}
          categories={categories}
          setCategories={setCategories}
        />
        <CategoryGroup
          title={'프로덕트 국가'}
          required={false}
          list={countryList}
          category={country}
          setCategory={setCountry}
        />
        <h5 className={styles.label}>
          썸네일 이미지 <span className={styles.required}>{'*'}</span>
        </h5>
        <ThumbnailInput thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </div>
      {/* btn */}
      <div className={styles.btnGroup}>
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Cancel'}
          onClick={() => navigate('/admin/contents')}
        />
        <AdminButton
          color={'white'}
          size={'md'}
          text={'Save'}
          onClick={() => toast('임시 저장 구현 중')}
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
