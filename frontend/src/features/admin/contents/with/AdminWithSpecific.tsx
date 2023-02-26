import { useAppDispatch } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import AdminModal from 'components/admin/AdminModal'
import SectionPlusBtn from 'components/admin/SectionPlusBtn'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbSiteInput from 'components/admin/ThumbSiteInput'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import AdminWithToolDetail from './AdminWithToolDetail'

const AdminWithSpecific = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const siteRef = useRef<HTMLInputElement | null>(null)
  const infoRef = useRef<HTMLInputElement | null>(null)

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
              subTitle={'자회사 사이트'}
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
  const inCorpToolRefs = useRef<HTMLInputElement[]>([])
  const inCorpToolInputRefs = useRef<HTMLInputElement[]>([])
  const inCorpToolNameRefs = useRef<HTMLInputElement[]>([])
  const inCorpToolSiteRefs = useRef<HTMLInputElement[]>([])
  const [inCorpToolImages, setInCorpToolImages] = useState<string[]>([])

  const InCorpToolSectionGroup = () => {
    if (
      inCorpToolRefs.current &&
      inCorpToolInputRefs.current &&
      inCorpToolSiteRefs.current
    )
      return [...Array(inCorpTool)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={8}
              value={inCorpTool}
              setValue={setInCorpTool}
            />
            <TextInputBox
              textRef={(el: HTMLInputElement) =>
                (inCorpToolRefs.current[index] = el)
              }
              title={`사내 협업툴 이름 ${index + 1}`}
              placeholder={'예시: 슬랙'}
              required={false}
            />
            <h5 className={styles.label}>사내 협업툴 이미지</h5>
            <ThumbSiteInput
              idx={index}
              subName={'사내 협업툴 이름'}
              subTitle={'사내 협업툴 사이트'}
              required={false}
              inputRefs={inCorpToolInputRefs}
              nameRefs={inCorpToolNameRefs}
              siteRefs={inCorpToolSiteRefs}
              images={inCorpToolImages}
              setImages={setInCorpToolImages}
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

  const handleComplete = () => {
    console.log('')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h3 className={styles.title}>함께써요 specific</h3>
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
              textRef={infoRef}
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
              onClick={() => navigate('/admin/contents/with/main')}
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

export default AdminWithSpecific
