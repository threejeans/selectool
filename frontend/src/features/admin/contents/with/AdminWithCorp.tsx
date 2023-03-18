import { useAppDispatch, useAppSelector } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import AdminModal from 'components/admin/AdminModal'
import DuplicatedCategoryGroup from 'components/admin/DuplicatedCategoryGroup'
import SearchInputBox from 'components/admin/SearchBox'
import SectionPlusBtn from 'components/admin/SectionPlusBtn'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbnailInput from 'components/admin/ThumbnailInput'
import ThumbSiteInput from 'components/admin/ThumbSiteInput'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import swal from 'sweetalert'

import {
  AdminWithComponent,
  BranchType,
  CorpType,
  CultureType,
  ToolType,
} from 'types/types'
import {
  getTmpStorage,
  removeTmpStorage,
  setTmpStorage,
} from 'util/localStorage'
import {
  createCorp,
  popToast,
  resetTmpCorp,
  selectTmpCorp,
  withCorpSave,
} from '../adminContentsSlice'
import AdminWithToolDetail from './AdminWithToolDetail'

const AdminWithCorp = () => {
  const tmpCorp = useAppSelector(selectTmpCorp)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // main
  const [nameKr, setNameKr] = useState<string>('')
  const nameKrRef = useRef<HTMLInputElement | null>(null)
  const [nameEn, setNameEn] = useState<string>('')
  const nameEnRef = useRef<HTMLInputElement | null>(null)
  const [info, setInfo] = useState<string>('')
  const infoRef = useRef<HTMLInputElement | null>(null)
  const [teamNameKr, setTeamNameKr] = useState<string>('')
  const teamNameKrRef = useRef<HTMLInputElement | null>(null)
  const [teamNameEn, setTeamNameEn] = useState<string>('')
  const teamNameEnRef = useRef<HTMLInputElement | null>(null)

  const list = ['금융', '커뮤니티', '모빌리티', '여행/레져', '커머스', 'Other']
  const [categories, setCategories] = useState(['Other'])

  const [image, setImage] = useState('')

  // specific
  const [url, setUrl] = useState<string>('')
  const urlRef = useRef<HTMLInputElement | null>(null)
  const [content, setContent] = useState<string>('')
  const contentRef = useRef<HTMLInputElement | null>(null)

  // 조직문화 관련
  const [corpCulture, setCorpCulture] = useState(1)
  const [cultureTitles, setCultureTitles] = useState<string[]>([])
  const cultureTitleRefs = useRef<HTMLInputElement[]>([])
  const [cultureContents, setCultureContents] = useState<string[]>([])
  const cultureContentRefs = useRef<HTMLInputElement[]>([])

  const CorpCultureSectionGroup = () => {
    if (cultureTitleRefs.current && cultureContentRefs.current)
      return [...Array(corpCulture)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={8}
              value={corpCulture}
              setValue={setCorpCulture}
            />
            <TextInputBox
              idx={index}
              values={cultureTitles}
              setValues={setCultureTitles}
              focusesRef={cultureTitleRefs}
              title={`조직문화 소제목 ${index + 1}`}
              placeholder={'예시: 주제별 대화방'}
              required={false}
            />
            <TextInputBox
              idx={index}
              values={cultureContents}
              setValues={setCultureContents}
              focusesRef={cultureContentRefs}
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
  const [branch, setBranch] = useState(1)
  const subsidiaryInputRefs = useRef<HTMLInputElement[]>([])
  const [branchImages, setBranchImages] = useState<string[]>([])
  const [branchNames, setBranchNames] = useState<string[]>([])

  const SubsidiarySectionGroup = () => {
    if (subsidiaryInputRefs.current)
      return [...Array(branch)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={8}
              value={branch}
              setValue={setBranch}
            />
            <h5 className={styles.label}>자회사 사이트 {index + 1}</h5>
            <ThumbSiteInput
              idx={index}
              subName={'자회사 이름'}
              required={false}
              inputRefs={subsidiaryInputRefs}
              images={branchImages}
              setImages={setBranchImages}
              names={branchNames}
              setNames={setBranchNames}
            />
          </div>
        )
      })
  }

  // 사내 협업툴 관련
  const [inCorpTool, setInCorpTool] = useState(1)
  const inCorpToolInputRefs = useRef<HTMLInputElement[]>([])
  const [inCorpToolImages, setInCorpToolImages] = useState<string[]>([])
  const [inCorpToolSites, setInCorpToolSites] = useState<string[]>([])
  const [tools, setTools] = useState<ToolType[]>([])

  const InCorpToolSectionGroup = () => {
    if (inCorpToolInputRefs.current)
      return [...Array(inCorpTool)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={16}
              value={inCorpTool}
              setValue={setInCorpTool}
            />
            <SearchInputBox
              idx={index}
              title={`사내 협업툴 이름 ${index + 1}`}
              placeholder={'예시: 슬랙'}
              required={false}
              // 검색 반영
              datas={tools}
              setDatas={setTools}
              images={inCorpToolImages}
              setImages={setInCorpToolImages}
              sites={inCorpToolSites}
              setSites={setInCorpToolSites}
            />
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

    if (nameKrRef.current) {
      if (!nameKr) {
        nameKrRef.current.focus()
        popToast(false)
        return
      } else data.nameKr = nameKr
    }
    if (nameEnRef.current) {
      if (!nameEn) {
        nameEnRef.current.focus()
        popToast(false)
        return
      } else data.nameEn = nameEn
    }
    if (infoRef.current) {
      if (!info) {
        infoRef.current.focus()
        popToast(false)
        return
      } else data.info = info
    }
    if (teamNameKrRef.current) {
      if (!teamNameKr) {
        teamNameKrRef.current.focus()
        popToast(false)
        return
      } else data.teamNameKr = teamNameKr
    }
    if (teamNameEnRef.current) {
      if (!teamNameEn) {
        teamNameEnRef.current.focus()
        popToast(false)
        return
      } else data.teamNameEn = teamNameEn
    }
    if (categories)
      data.categories = categories.map(item => {
        return {
          name: item,
        }
      })
    if (image === '') {
      popToast('섬네일')
      return
    } else data.image = image

    if (urlRef.current) {
      if (!url) {
        urlRef.current.focus()
        popToast(false)
        return
      } else data.url = url
    }
    if (contentRef.current) {
      if (!content) {
        contentRef.current.focus()
        popToast(false)
        return
      } else data.content = content
    }

    if (cultureTitleRefs.current && cultureContentRefs.current) {
      const tmp: CultureType[] = []
      for (let i = 0; i < corpCulture; i++) {
        const t: CultureType = {
          title: cultureTitles[i],
          content: cultureContents[i],
        }
        tmp.push(t)
      }
      data.cultures = tmp
    }
    if (branch) {
      const tmp: BranchType[] = []
      for (let i = 0; i < corpCulture; i++) {
        const t: BranchType = {
          image: branchImages[i],
          name: branchNames[i],
        }
        tmp.push(t)
      }
      data.branches = tmp
    }
    if (tools) {
      const tmp: ToolType[] = []
      for (let i = 0; i < inCorpTool; i++) {
        if (tools[i].id) tmp.push(tools[i])
      }
      data.tools = tmp
    }
    dispatch(withCorpSave(data))
  }

  useEffect(() => {
    if (
      tmpCorp.nameKr &&
      tmpCorp.nameEn &&
      tmpCorp.info &&
      tmpCorp.teamNameKr &&
      tmpCorp.teamNameEn &&
      tmpCorp.image &&
      tmpCorp.url &&
      tmpCorp.content
    ) {
      console.log('Corp complate', tmpCorp)
      swal({
        title: '저장 하시겠습니까?',
        icon: 'info',
        buttons: ['취소', '저장'],
      }).then(willSave => {
        if (willSave) {
          dispatch(createCorp(tmpCorp))
            .then(data => {
              if (data.meta.requestStatus === 'fulfilled') {
                swal('저장이 완료되었습니다.', { icon: 'success' }).then(_ => {
                  dispatch(resetTmpCorp())
                  navigate('/admin/contents/with/list')
                })
              } else toast('등록중 에러가 발생했어요.')
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          toast('🥕 저장이 취소되었습니다.', { autoClose: 1000 })
        }
      })
    }
  }, [tmpCorp])

  const handleCancel = () => {
    swal({
      title: '돌아가시겠습니까?',
      icon: 'warning',
      text: '저장하지 않은 내용은 삭제됩니다.',
      buttons: ['머무르기', '메인으로'],
      dangerMode: true,
    }).then(willCancel => {
      if (willCancel) {
        toast('🥕 작성이 취소되었습니다.', { autoClose: 1000 })
        navigate('/admin/contents')
      }
    })
  }

  useEffect(() => {
    const data = getTmpStorage({ key: 'with' }) as AdminWithComponent | false
    if (data) {
      swal({
        title: '임시 저장된 데이터가 있습니다.',
        text: '임시 데이터를 불러오겠습니까?',
        icon: 'info',
        buttons: ['임시 데이터 삭제', '불러오기'],
      }).then(willSave => {
        if (willSave) {
          setNameKr(data.nameKr)
          setNameEn(data.nameEn)
          setInfo(data.info)
          setTeamNameKr(data.teamNameKr)
          setTeamNameEn(data.teamNameEn)
          setCategories(data.categories)
          setImage(data.image)
          setUrl(data.url)
          setContent(data.content)
          setCorpCulture(data.corpCulture)
          setCultureTitles(data.cultureTitles)
          setCultureContents(data.cultureContents)
          setBranch(data.branch)
          setBranchImages(data.branchImages)
          setBranchNames(data.branchNames)
          setInCorpTool(data.inCorpTool)
          setInCorpToolImages(data.inCorpToolImages)
          setInCorpToolSites(data.inCorpToolSites)
          setTools(data.tools)
          swal('임시 저장된 데이터를 불러왔습니다.', { icon: 'success' })
        } else {
          removeTmpStorage({ key: 'with' })
          toast('🥕 임시 데이터가 삭제되었습니다.', { autoClose: 1000 })
        }
      })
    }
  }, [])

  const tmpSave = () => {
    const data: AdminWithComponent = {
      nameKr,
      nameEn,
      info,
      teamNameKr,
      teamNameEn,
      categories,
      image,
      url,
      content,
      corpCulture,
      cultureTitles,
      cultureContents,
      branch,
      branchImages,
      branchNames,
      inCorpTool,
      inCorpToolImages,
      inCorpToolSites,
      tools,
    }
    swal({
      title: '임시 저장 하시겠습니까?',
      icon: 'info',
      buttons: ['취소', '저장'],
    }).then(willSave => {
      if (willSave) {
        setTmpStorage({ key: 'with', data: data })
        swal('저장이 완료되었습니다.', { icon: 'success' })
      } else {
        toast('🥕 저장이 취소되었습니다.', { autoClose: 1000 })
      }
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h3 className={styles.title}>함께써요 main/specific</h3>
          <div className={styles.section}>
            <TextInputBox
              value={nameKr}
              setValue={setNameKr}
              focusRef={nameKrRef}
              title={'회사 이름'}
              placeholder={'예시: 토스, 야놀자'}
              required={true}
            />
            <TextInputBox
              value={nameEn}
              setValue={setNameEn}
              focusRef={nameEnRef}
              title={'회사 영문명'}
              placeholder={'예시: Toss, Baemin'}
              required={true}
            />
            <TextInputBox
              value={info}
              setValue={setInfo}
              focusRef={infoRef}
              title={'회사 한 줄 소개'}
              placeholder={
                '예시: 숙박, 여행, 레저, 액티비티 정보제공 및 예약 서비스 플랫폼 [야놀자]를 운영하는 기업'
              }
              required={true}
            />
            <TextInputBox
              value={teamNameKr}
              setValue={setTeamNameKr}
              focusRef={teamNameKrRef}
              title={'팀 이름'}
              placeholder={'예시: (주)비바 리퍼블리카'}
              required={true}
            />
            <TextInputBox
              value={teamNameEn}
              setValue={setTeamNameEn}
              focusRef={teamNameEnRef}
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
            <ThumbnailInput thumbnail={image} setThumbnail={setImage} />{' '}
          </div>
          <div className={styles.section}>
            <TextInputBox
              value={url}
              setValue={setUrl}
              focusRef={urlRef}
              title={'회사 사이트'}
              placeholder={'예시: https://www.jandi.com/landing/kr'}
              required={true}
            />
          </div>
          <div className={styles.section}>
            <TextInputBox
              value={content}
              setValue={setContent}
              focusRef={contentRef}
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
              onClick={handleCancel}
            />
            <AdminButton
              color={'white'}
              size={'md'}
              text={'Save'}
              onClick={tmpSave}
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
