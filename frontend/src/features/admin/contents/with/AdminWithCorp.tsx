import { useAppDispatch } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import AdminModal from 'components/admin/AdminModal'
import CategoryGroup from 'components/admin/CategoryGroup'
import DuplicatedCategoryGroup from 'components/admin/DuplicatedCategoryGroup'
import SearchBox from 'components/admin/SearchBox'
import SectionPlusBtn from 'components/admin/SectionPlusBtn'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbnailInput from 'components/admin/ThumbnailInput'
import ThumbSiteInput from 'components/admin/ThumbSiteInput'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import { CorpType, ToolType } from 'types/dataTypes'
import { popToast } from '../adminContentsSlice'
import AdminWithToolDetail from './AdminWithToolDetail'

const AdminWithCorp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // main
  const koRef = useRef<HTMLInputElement | null>(null)
  const enRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLInputElement | null>(null)
  const teamKoRef = useRef<HTMLInputElement | null>(null)
  const teamEnRef = useRef<HTMLInputElement | null>(null)

  const list = ['금융', '커뮤니티', '모빌리티', '여행/레져', '커머스', 'Other']
  const [categories, setCategories] = useState(['Other'])

  const [thumbnail, setThumbnail] = useState('')

  // specific
  const siteRef = useRef<HTMLInputElement | null>(null)
  const contentRef = useRef<HTMLInputElement | null>(null)

  // 조직문화 관련
  const corpCultureSubTitleRefs = useRef<HTMLInputElement[]>([])
  const corpCultureDescriptionRefs = useRef<HTMLInputElement[]>([])
  const [corpCulture, setCorpCulture] = useState(1)
  const CorpCultureSectionGroup = () => {
    if (corpCultureSubTitleRefs.current && corpCultureDescriptionRefs.current)
      return [...Array(corpCulture)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={4}
              value={corpCulture}
              setValue={setCorpCulture}
            />
            <TextInputBox
              textRef={(el: HTMLInputElement) =>
                (corpCultureSubTitleRefs.current[index] = el)
              }
              title={`조직문화 소제목 ${index + 1}`}
              placeholder={'예시: 주제별 대화방'}
              required={false}
            />
            <TextInputBox
              textRef={(el: HTMLInputElement) =>
                (corpCultureDescriptionRefs.current[index] = el)
              }
              title={'조직문화 상세 설명'}
              placeholder={
                '예시: 조직 구성과 업무 문화에 맞게 주제별 대화방을 개설해 효율적으로 소통할 수 있습니다.'
              }
              required={false}
            />
          </div>
        )
      })
  }

  // 자회사 사이트 관련
  const [subsidiary, setSubsidiary] = useState(1)
  const subsidiaryInputRefs = useRef<HTMLInputElement[]>([])
  const subsidiaryNameRefs = useRef<HTMLInputElement[]>([])
  const subsidiarySiteRefs = useRef<HTMLInputElement[]>([])
  const [subsidiaryImages, setSubsidiaryImages] = useState<string[]>([])

  const SubsidiarySectionGroup = () => {
    if (subsidiaryInputRefs.current && subsidiarySiteRefs.current)
      return [...Array(subsidiary)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={4}
              value={subsidiary}
              setValue={setSubsidiary}
            />
            <h5 className={styles.label}>자회사 사이트 {index + 1}</h5>
            <ThumbSiteInput
              idx={index}
              subName={'자회사 이름'}
              // subTitle={'자회사 사이트'}
              required={false}
              inputRefs={subsidiaryInputRefs}
              nameRefs={subsidiaryNameRefs}
              siteRefs={subsidiarySiteRefs}
              images={subsidiaryImages}
              setImages={setSubsidiaryImages}
            />
          </div>
        )
      })
  }

  // 사내 협업툴 관련
  const [inCorpTool, setInCorpTool] = useState(1)
  const inCorpToolInputRefs = useRef<HTMLInputElement[]>([])
  const [inCorpToolNames, setInCorpToolNames] = useState<string[]>([])
  const [inCorpToolSites, setInCorpToolSites] = useState<string[]>([])
  const [inCorpToolImages, setInCorpToolImages] = useState<string[]>([])
  const [tools, setTools] = useState<ToolType[]>([])

  const InCorpToolSectionGroup = () => {
    if (inCorpToolInputRefs.current)
      return [...Array(inCorpTool)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={8}
              value={inCorpTool}
              setValue={setInCorpTool}
            />
            <div style={{ position: 'relative' }}>
              <TextInputBox
                idx={index}
                values={inCorpToolNames}
                setValues={setInCorpToolNames}
                title={`사내 협업툴 이름 ${index + 1}`}
                placeholder={'예시: 슬랙'}
                required={false}
              />
              <SearchBox
                idx={index}
                values={inCorpToolNames}
                setValues={setInCorpToolNames}
              />
            </div>
            <h5 className={styles.label}>
              사내 협업툴 이미지
              <span className={styles.required}>
                * 등록되지 않은 툴은 상세 등록해주세요.
              </span>
            </h5>
            <ThumbSiteInput
              idx={index}
              subTitle={'사내 협업툴 사이트'}
              required={false}
              inputRefs={inCorpToolInputRefs}
              values={inCorpToolSites}
              setValues={setInCorpToolSites}
              images={inCorpToolImages}
              setImages={setInCorpToolImages}
              disabled={true}
            />
            <div className={styles.tabBtn}>
              <AdminButton
                color={'primaryVariant'}
                size={'lgTab'}
                text={'상세 정보 등록하러 가기'}
                onClick={() => {
                  setIsModal(true)
                }}
              />
            </div>
          </div>
        )
      })
  }

  // 협업 툴 모달 관련
  const [isModal, setIsModal] = useState(false)

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()

    const data: CorpType = {
      nameKr: '',
      nameEn: '',
      info: '',
      teamNameKr: '',
      teamNameEn: '',
      categories: [],
      image: '',
      url: '',
      content: '',
      cultures: [],
      branches: [],
      tools: [],
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
    if (teamKoRef.current) {
      if (teamKoRef.current.value.length === 0) {
        teamKoRef.current.focus()
        popToast(false)
        return
      } else data.teamNameKr = teamKoRef.current.value
    }
    if (teamEnRef.current) {
      if (teamEnRef.current.value.length === 0) {
        teamEnRef.current.focus()
        popToast(false)
        return
      } else data.teamNameEn = teamEnRef.current.value
    }
    if (categories)
      data.categories = categories.map(item => {
        return {
          name: item,
        }
      })
    if (thumbnail === '') {
      popToast('섬네일')
      return
    } else data.image = thumbnail

    if (siteRef.current) {
      if (siteRef.current.value.length === 0) {
        siteRef.current.focus()
        popToast(false)
        return
      } else data.url = siteRef.current.value
    }

    // dispatch(createWithMainTmpInfo(data))
    //   .then(e => {
    //     if (e.meta.requestStatus === 'fulfilled')
    //       navigate('/admin/contents/with/specific')
    //     else
    //       toast('🚨저장이 실패했어요!', {
    //         type: 'error',
    //         theme: 'colored',
    //       })
    //   })
    //   .catch(err => toast.error(err))
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h3 className={styles.title}>함께써요 main/specific</h3>
          <div className={styles.section}>
            <TextInputBox
              textRef={koRef}
              title={'회사 이름'}
              placeholder={'예시: 토스, 야놀자'}
              required={true}
            />
            <TextInputBox
              textRef={enRef}
              title={'회사 영문명'}
              placeholder={'예시: Toss, Baemin'}
              required={true}
            />
            <TextInputBox
              textRef={descriptionRef}
              title={'회사 한 줄 소개'}
              placeholder={
                '예시: 숙박, 여행, 레저, 액티비티 정보제공 및 예약 서비스 플랫폼 [야놀자]를 운영하는 기업'
              }
              required={true}
            />
            <TextInputBox
              textRef={teamKoRef}
              title={'팀 이름'}
              placeholder={'예시: (주)비바 리퍼블리카'}
              required={true}
            />
            <TextInputBox
              textRef={teamEnRef}
              title={'팀 영문명'}
              placeholder={'예시: Viva Republica'}
              required={true}
            />
            <DuplicatedCategoryGroup
              title={'회사 분류'}
              required={false}
              list={list}
              categories={categories}
              setCategories={setCategories}
            />
            <h5 className={styles.label}>
              썸네일 이미지 <span className={styles.required}>{'*'}</span>
            </h5>
            <ThumbnailInput thumbnail={thumbnail} setThumbnail={setThumbnail} />{' '}
          </div>
          <div className={styles.section}>
            <TextInputBox
              textRef={siteRef}
              title={'회사 사이트'}
              placeholder={'예시: https://www.jandi.com/landing/kr'}
              required={true}
            />
          </div>
          <div className={styles.section}>
            <TextInputBox
              textRef={contentRef}
              title={'기업소개'}
              placeholder={
                '예시: 토스팀은 바꾸고 싶은 세상의 모습이 있고, 생각만 해도 가슴 뛰는 목표가 있는 조직입니다.'
              }
              required={true}
            />
          </div>
          {CorpCultureSectionGroup()}
          {SubsidiarySectionGroup()}
          {InCorpToolSectionGroup()}
          <div className={styles.btnGroup}>
            <AdminButton
              color={'white'}
              size={'md'}
              text={'Previous'}
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
              text={'Complete'}
              onClick={handleComplete}
            />
          </div>
        </div>
      </div>
      <AdminModal
        isModal={isModal}
        setIsModal={() => setIsModal(false)}
        outer={false}
      >
        <AdminWithToolDetail setIsModal={() => setIsModal(false)} />
      </AdminModal>
    </>
  )
}

export default AdminWithCorp
