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
import {
  ClientType,
  PlanFunctionType,
  PlanType,
  ToolFuncType,
  ToolType,
} from 'types/types'
import {
  createTool,
  popToast,
  resetTmpTool,
  selectTmpTool,
  withToolSave,
} from '../adminContentsSlice'

const AdminSelfTool = () => {
  const tmpTool = useAppSelector(selectTmpTool)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // main
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

  // specific
  const siteRef = useRef<HTMLInputElement | null>(null)
  // 핵심 기능 관련
  const coreFuncNameRefs = useRef<HTMLInputElement[]>([])
  const coreFuncDetailRefs = useRef<HTMLInputElement[]>([])
  const [coreFunc, setCoreFunc] = useState(1)

  const CoreFuncSectionGroup = () => {
    if (coreFuncNameRefs.current && coreFuncDetailRefs.current)
      return [...Array(coreFunc)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={4}
              value={coreFunc}
              setValue={setCoreFunc}
            />
            <TextInputBox
              textRef={(el: HTMLInputElement) =>
                (coreFuncNameRefs.current[index] = el)
              }
              title={`프로덕트 핵심 기능 ${index + 1}`}
              placeholder={'예시: 주제별 대화방'}
              required={false}
            />
            <TextInputBox
              textRef={(el: HTMLInputElement) =>
                (coreFuncDetailRefs.current[index] = el)
              }
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
              max={8}
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
  const planTitleRef = useRef<any>([])
  const planVolumeRef = useRef<any>([])
  const planCostRef = useRef<any>([])
  const planFuncRef = useRef<any[][]>([[], [], [], []])
  const [costPlan, setCostPlan] = useState(1)
  const [planInfo, setPlanInfo] = useState<number[]>([1, 1, 1, 1])

  const CostPlanGroup = () => {
    if (planTitleRef.current && planVolumeRef.current && planCostRef.current)
      return [...Array(costPlan)].map((_, index) => {
        return (
          <div key={index} className={styles.section}>
            <SectionPlusBtn
              idx={index}
              max={4}
              value={costPlan}
              setValue={setCostPlan}
            />
            <TextInputBox
              textRef={(el: any) => (planTitleRef.current[index] = el)}
              title={`가격 플랜 이름 ${index + 1}`}
              placeholder={'예시: Basic'}
              required={false}
            />
            <div className={styles.halfSection}>
              <TextInputBox
                textRef={(el: any) => (planVolumeRef.current[index] = el)}
                title={'가격 플랜 용량'}
                placeholder={'예시: 멤버당 1GB'}
                required={false}
              />
              <TextInputBox
                textRef={(el: any) => (planCostRef.current[index] = el)}
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
                      textRef={(el: any) =>
                        (planFuncRef.current[index][jndex] = el)
                      }
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
  const aosRef = useRef<HTMLInputElement | null>(null)
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
    if (categories)
      data.categories = categories.map(item => {
        return { name: item }
      })
    if (country) data.country = country
    if (thumbnail === '') {
      popToast('섬네일')
      return
    } else data.image = thumbnail

    // 프로덕트 사이트
    if (siteRef.current)
      if (!siteRef.current.value) {
        siteRef.current.focus()
        toast('프로덕트 사이트를 입력해주세요.')
        return
      } else data.url = siteRef.current.value

    // 핵심 기능
    if (coreFuncNameRefs.current && coreFuncDetailRefs.current) {
      for (let i = 0; i < coreFuncNameRefs.current.length; i++) {
        const tmp: ToolFuncType = {
          name: coreFuncNameRefs.current[i].value,
          content: coreFuncDetailRefs.current[i].value,
        }
        data.toolFunctions.push(tmp)
      }
    }

    // 주요고객사
    if (mainClientSites && mainClientNames) {
      // 여기만 값 참조
      for (let i = 0; i < mainClient; i++) {
        console.log(mainClientImages[i])
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
            tmp.name == mainClients[i].name &&
            tmp.image == mainClients[i].image &&
            tmp.url == mainClients[i].url
          )
            tmp.id = mainClients[i].id
          data.clients.push(tmp)
        } else {
          toast(`${i + 1}번 고객사 이미지를 첨부해주세요.`)
          return
        }
      }
    }

    // 가격 플랜 별 기능
    if (
      planTitleRef.current &&
      planVolumeRef.current &&
      planCostRef.current &&
      planFuncRef.current
    ) {
      for (let i = 0; i < planTitleRef.current.length; i++) {
        if (planTitleRef.current[i].value) {
          const t: PlanFunctionType[] = []
          if (planFuncRef.current[i]) {
            planFuncRef.current[i].map((item, _) => {
              t.push(item.value)
            })
          }
          const tmp: PlanType = {
            title: planTitleRef.current[i].value,
            volume: planVolumeRef.current[i].value,
            cost: planCostRef.current[i].value,
            planFunctions: t,
          }
          data.plans.push(tmp)
        } else {
          toast('제목이 입력되지 않은 플랜은 저장되지 않습니다.')
          planTitleRef.current[i].focus()
          return
        }
      }
    }

    // 스토어 점수
    if (!aosRef.current) return
    if (!iosRef.current) return
    data.aos = aosRef.current.value
    data.ios = iosRef.current.value

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
      dispatch(createTool(tmpTool))
        .then(data => {
          console.log(data)
          dispatch(resetTmpTool())
          navigate('/admin/contents/self/list')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [tmpTool])
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <h3 className={styles.title}>혼자써요 main/specific</h3>
        {/* main */}
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
        {/* specific */}
        <div className={styles.section}>
          <TextInputBox
            textRef={siteRef}
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
              textRef={aosRef}
              title={'플레이스토어 평점'}
              placeholder={''}
              required={false}
            />
            <TextInputBox
              textRef={iosRef}
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
  )
}

export default AdminSelfTool
