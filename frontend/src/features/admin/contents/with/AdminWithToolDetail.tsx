import { useAppDispatch, useAppSelector } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import CategoryGroup from 'components/admin/CategoryGroup'
import DuplicatedCategoryGroup from 'components/admin/DuplicatedCategoryGroup'
import SearchClient from 'components/admin/SearchClient'
import SectionPlusBtn from 'components/admin/SectionPlusBtn'
import TextInputBox from 'components/admin/TextInputBox'
import ThumbnailInput from 'components/admin/ThumbnailInput'
import ThumbSiteInput from 'components/admin/ThumbSiteInput'
import { useEffect, useRef, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { BsTriangleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import swal from 'sweetalert'
import {
  ClientType,
  PlanFunctionType,
  PlanType,
  AdminSelfComponent,
  ToolFuncType,
  ToolType,
  AdminWithComponent,
} from 'types/types'
import {
  getTmpStorage,
  removeTmpStorage,
  setTmpStorage,
} from 'util/localStorage'
import {
  createTool,
  popToast,
  resetTmpTool,
  selectTmpTool,
  withToolSave,
} from '../adminContentsSlice'

const AdminWithToolDetail = ({ setIsModal }: any) => {
  const tmpTool = useAppSelector(selectTmpTool)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // main
  const [nameKr, setNameKr] = useState<string>('')
  const nameKrRef = useRef<HTMLInputElement | null>(null)
  const [nameEn, setNameEn] = useState<string>('')
  const nameEnRef = useRef<HTMLInputElement | null>(null)
  const [info, setInfo] = useState<string>('')
  const infoRef = useRef<HTMLInputElement | null>(null)
  const [msg, setMsg] = useState<string>('')
  const msgRef = useRef<HTMLInputElement | null>(null)
  const [topic, setTopic] = useState<string>('')
  const topicRef = useRef<HTMLSelectElement | null>(null)

  const categoryList = ['디자인', '개발', '마케팅', '기획', 'Other']
  const [categories, setCategories] = useState<string[]>(['Other'])
  const countryList = ['국내', '해외']
  const [country, setCountry] = useState('국내')

  const [image, setImage] = useState<string>('')

  // specific
  const [url, setUrl] = useState('')
  const urlRef = useRef<HTMLInputElement | null>(null)

  // 핵심 기능 관련
  const [toolFunction, setToolFunction] = useState(1)
  const [toolFunctionNames, setToolFunctionNames] = useState<string[]>([])
  const toolFunctionNameRefs = useRef<HTMLInputElement[]>([])
  const [toolFunctionContents, setToolFunctionContents] = useState<string[]>([])
  const toolFunctionContentRefs = useRef<HTMLInputElement[]>([])

  const CoreFuncSectionGroup = () => {
    if (toolFunctionNameRefs.current && toolFunctionContentRefs.current)
      return [...Array(toolFunction)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={8}
              value={toolFunction}
              setValue={setToolFunction}
            />
            <TextInputBox
              idx={index}
              values={toolFunctionNames}
              setValues={setToolFunctionNames}
              focusesRef={toolFunctionNameRefs}
              title={`프로덕트 핵심 기능 ${index + 1}`}
              placeholder={'예시: 주제별 대화방'}
              required={false}
            />
            <TextInputBox
              idx={index}
              values={toolFunctionContents}
              setValues={setToolFunctionContents}
              focusesRef={toolFunctionContentRefs}
              title={'프로덕트 상세 설명'}
              placeholder={
                '예시: 조직 구성과 업무 문화에 맞게 주제별 대화방을 개설해 효율적으로 소통할 수 있습니다.'
              }
              required={false}
            />
          </div>
        )
      })
  }

  // 주요 고객사 이미지 섹션 관련
  const [mainClient, setMainClient] = useState(1)
  const mainClientInputRefs = useRef<HTMLInputElement[]>([])
  const [mainClientImages, setMainClientImages] = useState<string[]>([])
  const [mainClientNames, setMainClientNames] = useState<string[]>([])
  const [mainClientSites, setMainClientSites] = useState<string[]>([])
  const [mainClients, setMainClients] = useState<ClientType[]>([])

  const MainClientSectionGroup = () => {
    if (mainClientInputRefs.current)
      return [...Array(mainClient)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={16}
              value={mainClient}
              setValue={setMainClient}
            />
            <SearchClient
              idx={index}
              images={mainClientImages}
              setImages={setMainClientImages}
              names={mainClientNames}
              setNames={setMainClientNames}
              sites={mainClientSites}
              setSites={setMainClientSites}
              clients={mainClients}
              setClients={setMainClients}
            />
            <ThumbSiteInput
              idx={index}
              subName={'주요 고객사 이름'}
              subTitle={'주요 고객사 사이트'}
              required={true}
              inputRefs={mainClientInputRefs}
              images={mainClientImages}
              setImages={setMainClientImages}
              names={mainClientNames}
              setNames={setMainClientNames}
              values={mainClientSites}
              setValues={setMainClientSites}
            />
          </div>
        )
      })
  }
  // 가격 플랜 관련
  const [planTitles, setPlanTitles] = useState<string[]>([])
  const planTitleRefs = useRef<HTMLInputElement[]>([])
  const [planVolumes, setPlanVolumes] = useState<string[]>([])
  const planVolumeRefs = useRef<HTMLInputElement[]>([])
  const [planCosts, setPlanCosts] = useState<string[]>([]) // costs?!?!
  const planCostRefs = useRef<HTMLInputElement[]>([])
  const [planFunctions, setPlanFunctions] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ])
  const planFuncRefs = useRef<[][]>([[], [], [], [], [], [], [], []])
  const [costPlan, setCostPlan] = useState(1)
  const [planInfo, setPlanInfo] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1])

  const CostPlanGroup = () => {
    if (planTitleRefs.current && planVolumeRefs.current && planCostRefs.current)
      return [...Array(costPlan)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={8}
              value={costPlan}
              setValue={setCostPlan}
            />
            <TextInputBox
              idx={index}
              values={planTitles}
              setValues={setPlanTitles}
              focusesRef={planTitleRefs}
              title={`가격 플랜 이름 ${index + 1}`}
              placeholder={'예시: Basic'}
              required={false}
            />
            <div className={styles.halfSection}>
              <TextInputBox
                idx={index}
                values={planVolumes}
                setValues={setPlanVolumes}
                focusesRef={planVolumeRefs}
                title={'가격 플랜 용량'}
                placeholder={'예시: 멤버당 1GB'}
                required={false}
              />
              <TextInputBox
                idx={index}
                values={planCosts}
                setValues={setPlanCosts}
                focusesRef={planCostRefs}
                title={'가격 플랜 가격'}
                placeholder={'예시: 멤버당 0원'}
                required={false}
              />
            </div>
            <div className={styles.infoSection}>
              {[...Array(planInfo[index])].map((_, jndex) => {
                return (
                  <div key={jndex}>
                    <span className={styles.infoSetcionBtnGroup}>
                      <BiPlus
                        className={styles.sectionPlus}
                        onClick={() => {
                          if (planInfo[index] < 10) {
                            planInfo[index] = planInfo[index] + 1
                            setPlanInfo([...planInfo])
                          } else
                            toast('플랜 별 기능은 10개까지 입력가능합니다.')
                        }}
                      />
                      <BiMinus
                        className={styles.sectionMinus}
                        onClick={() => {
                          if (planInfo[index] > 1) {
                            planInfo[index] = planInfo[index] - 1
                            setPlanInfo([...planInfo])
                          }
                        }}
                      />
                    </span>
                    <TextInputBox
                      idx={index}
                      jdx={jndex}
                      walues={planFunctions}
                      setWalues={setPlanFunctions}
                      focusesesRef={planFuncRefs}
                      title={`가격 플랜 기능 ${index + 1} - ${jndex + 1}`}
                      placeholder={'예시: 무제한 대화방 개설'}
                      required={false}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })
  }

  // AOS, IOS 정보
  const [aos, setAos] = useState<string>('')
  const aosRef = useRef<HTMLInputElement | null>(null)
  const [ios, setIos] = useState<string>('')
  const iosRef = useRef<HTMLInputElement | null>(null)

  // 작성된 데이터 정제
  const handleComplete = () => {
    const data: ToolType = {
      nameKr: '',
      nameEn: '',
      info: '',
      msg: '',
      topic: '',
      categories: [],
      country: '',
      image: '',
      url: '',
      toolFunctions: [],
      clients: [],
      plans: [],
      aos: '',
      ios: '',
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
    if (msgRef.current) {
      if (!msg) {
        msgRef.current.focus()
        popToast(false)
        return
      } else data.msg = msg
    }
    if (topicRef.current) {
      if (!topic) {
        topicRef.current.focus()
        popToast(false)
        return
      } else data.topic = topic
    }
    if (categories)
      data.categories = categories.map(item => {
        return { name: item }
      })
    if (country) data.country = country
    if (image === '') {
      popToast('섬네일')
      return
    } else data.image = image

    // 프로덕트 사이트
    if (urlRef.current)
      if (!url) {
        urlRef.current.focus()
        toast('프로덕트 사이트를 입력해주세요.')
        return
      } else data.url = url

    // 핵심 기능
    if (toolFunctionNameRefs.current && toolFunctionContentRefs.current) {
      for (let i = 0; i < toolFunction; i++) {
        const tmp: ToolFuncType = {
          name: toolFunctionNames[i],
          content: toolFunctionContents[i],
        }
        data.toolFunctions.push(tmp)
      }
    }

    // 주요고객사
    if (mainClientInputRefs.current && mainClientSites && mainClientNames) {
      // 여기만 값 참조
      for (let i = 0; i < mainClient; i++) {
        if (mainClientImages[i]) {
          if (!mainClientNames[i]) {
            toast('주요 고객사 이름를 입력해주세요.')
            return
          }
          if (!mainClientSites[i]) {
            toast('주요 고객사 주소를 입력해주세요.')
            return
          }
          const tmp: ClientType = {
            id: 0,
            name: mainClientNames[i],
            image: mainClientImages[i],
            url: mainClientSites[i],
          }
          if (
            mainClients[i] &&
            tmp.name == mainClients[i].name &&
            tmp.image == mainClients[i].image &&
            tmp.url == mainClients[i].url
          )
            tmp.id = mainClients[i].id
          data.clients.push(tmp)
        } else {
          mainClientInputRefs.current[i].focus()
          toast(`${i + 1}번 고객사 이미지를 첨부해주세요.`)
          return
        }
      }
    }

    // 가격 플랜 별 기능
    if (
      planTitleRefs.current &&
      planVolumeRefs.current &&
      planCostRefs.current &&
      planFuncRefs.current
    ) {
      for (let i = 0; i < costPlan; i++) {
        if (planTitles[i]) {
          const t: PlanFunctionType[] = []
          if (planFuncRefs.current[i]) {
            for (let j = 0; j < planInfo[i]; j++) {
              t.push({ func: planFunctions[i][j] })
            }
          }
          const tmp: PlanType = {
            title: planTitles[i],
            volume: planVolumes[i],
            cost: planCosts[i],
            planFunctions: t,
          }
          data.plans.push(tmp)
        } else {
          planTitleRefs.current[i].focus()
          toast('제목이 입력되지 않은 플랜은 저장되지 않습니다.')
          return
        }
      }
    }

    // 스토어 점수
    data.aos = aos
    data.ios = ios

    dispatch(withToolSave(data))
  }
  useEffect(() => {
    if (
      tmpTool.nameKr &&
      tmpTool.nameEn &&
      tmpTool.info &&
      tmpTool.msg &&
      tmpTool.topic &&
      tmpTool.image &&
      tmpTool.url &&
      tmpTool.clients &&
      tmpTool.plans
    ) {
      console.log('Specific complate', tmpTool)
      swal({
        title: '저장 하시겠습니까?',
        icon: 'info',
        buttons: ['취소', '저장'],
      }).then(willSave => {
        if (willSave) {
          dispatch(createTool(tmpTool))
            .then(data => {
              console.log(data)
              swal('저장이 완료되었습니다.', { icon: 'success' })
              dispatch(resetTmpTool())
              setIsModal()
            })
            .catch(err => {
              swal('저장이 실패하였습니다.', { icon: 'warning' })
              console.error(err)
            })
        } else {
          toast('🥕 저장이 취소되었습니다.', { autoClose: 1000 })
        }
      })
    }
  }, [tmpTool])

  const handleCancel = () => {
    swal({
      title: '돌아가시겠습니까?',
      icon: 'warning',
      text: '저장하지 않은 내용은 삭제됩니다.',
      buttons: ['머무르기', '팝업 닫기'],
      dangerMode: true,
    }).then(willCancel => {
      if (willCancel) {
        toast('🥕 작성이 취소되었습니다.', { autoClose: 1000 })
        setIsModal()
      }
    })
  }

  useEffect(() => {
    const data = getTmpStorage({ key: 'self' }) as AdminSelfComponent | false
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
          setMsg(data.msg)
          setTopic(data.topic)
          setCategories(data.categories)
          setCountry(data.country)
          setImage(data.image)
          setUrl(data.url)
          setToolFunction(data.toolFunction)
          setToolFunctionNames(data.toolFunctionNames)
          setToolFunctionContents(data.toolFunctionContents)
          setMainClient(data.mainClient)
          setMainClientImages(data.mainClientImages)
          setMainClientNames(data.mainClientNames)
          setMainClientSites(data.mainClientSites)
          setMainClients(data.mainClients)
          setPlanTitles(data.planTitles)
          setPlanVolumes(data.planVolumes)
          setPlanCosts(data.planCosts)
          setPlanFunctions(data.planFunctions)
          setCostPlan(data.costPlan)
          setPlanInfo(data.planInfo)
          setAos(data.aos)
          setIos(data.ios)
          swal('임시 저장된 데이터를 불러왔습니다.', { icon: 'success' })
        } else {
          removeTmpStorage({ key: 'self' })
          toast('🥕 임시 데이터가 삭제되었습니다.', { autoClose: 1000 })
        }
      })
    }
  }, [])

  const tmpSave = () => {
    const data: AdminSelfComponent = {
      nameKr: nameKr,
      nameEn: nameEn,
      info: info,
      msg: msg,
      topic: topic,
      categories: categories,
      country: country,
      image: image,
      url: url,
      toolFunction: toolFunction,
      toolFunctionNames: toolFunctionNames,
      toolFunctionContents: toolFunctionContents,
      mainClient: mainClient,
      mainClientImages: mainClientImages,
      mainClientNames: mainClientNames,
      mainClientSites: mainClientSites,
      mainClients: mainClients,
      planTitles: planTitles,
      planVolumes: planVolumes,
      planCosts: planCosts,
      planFunctions: planFunctions,
      costPlan: costPlan,
      planInfo: planInfo,
      aos: aos,
      ios: ios,
    }
    swal({
      title: '임시 저장 하시겠습니까?',
      icon: 'info',
      buttons: ['취소', '저장'],
    }).then(willSave => {
      if (willSave) {
        setTmpStorage({ key: 'self', data: data })
        swal('저장이 완료되었습니다.', { icon: 'success' })
      } else {
        toast('🥕 저장이 취소되었습니다.', { autoClose: 1000 })
      }
    })
  }
  return (
    <div className={styles.modalContainer}>
      <div className={styles.wrap}>
        <h3 className={styles.title}>사내 협업툴 상세정보</h3>
        {/* main */}
        <div className={styles.section}>
          <TextInputBox
            value={nameKr}
            setValue={setNameKr}
            focusRef={nameKrRef}
            title={'프로덕트 이름'}
            placeholder={'예시: 노션, 피그마'}
            required={true}
          />
          <TextInputBox
            value={nameEn}
            setValue={setNameEn}
            focusRef={nameEnRef}
            title={'프로덕트 영문명'}
            placeholder={'예시: Notion, Figma'}
            required={true}
          />
          <TextInputBox
            value={info}
            setValue={setInfo}
            focusRef={infoRef}
            title={'프로덕트 한 줄 소개'}
            placeholder={'예시: 프로젝트 관림 및 기록 소프트웨어'}
            required={true}
          />
          <TextInputBox
            value={msg}
            setValue={setMsg}
            focusRef={msgRef}
            title={'프로덕트 호버 메세지'}
            placeholder={'예시: Better Togather'}
            required={true}
          />
          <div>
            <h5 className={styles.label}>
              프로덕트 토픽{<span className={styles.required}>{'*'}</span>}
            </h5>
            <div className={styles.selectBox}>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                ref={topicRef}
                className={styles.select}
              >
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
          <ThumbnailInput thumbnail={image} setThumbnail={setImage} />
        </div>
        {/* specific */}
        <div className={styles.section}>
          <TextInputBox
            value={url}
            setValue={setUrl}
            focusRef={urlRef}
            title={'프로덕트 사이트'}
            placeholder={'예시: https://www.jandi.com/landing/kr'}
            required={true}
          />
        </div>
        {CoreFuncSectionGroup()}
        {MainClientSectionGroup()}
        {CostPlanGroup()}
        <div className={styles.section}>
          <div className={styles.halfSection}>
            <TextInputBox
              value={aos}
              setValue={setAos}
              focusRef={aosRef}
              title={'플레이스토어 평점'}
              placeholder={''}
              required={false}
            />
            <TextInputBox
              value={ios}
              setValue={setIos}
              focusRef={iosRef}
              title={'앱스토어 평점'}
              placeholder={''}
              required={false}
            />
          </div>
        </div>
        <div className={styles.btnGroup}>
          <AdminButton
            color={'white'}
            size={'md'}
            text={'Close'}
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
  )
}

export default AdminWithToolDetail
