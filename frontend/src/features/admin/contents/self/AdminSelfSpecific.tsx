import { useAppDispatch } from 'app/hooks'
import AdminButton from 'components/admin/AdminButton'
import React, { useRef, useState } from 'react'
import S3 from 'react-aws-s3-typescript'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { BsImage } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toast'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import { s3Config } from 'util/s3Config'
import {
  ClientInfoType,
  CoreFuncType,
  createSelfSpecificTmpInfo,
  PlanInfoType,
  SelfSpecificTmpInfo,
} from '../adminContentsSlice'
import { TextInputBox } from './AdminSelfMain'

const AdminSelfSpecific = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const siteRef = useRef<HTMLInputElement | null>(null)
  // 핵심 기능 관련
  const coreFuncNameRefs = useRef<HTMLInputElement[]>([])
  const coreFuncDetailRefs = useRef<HTMLInputElement[]>([])
  const [coreFunc, setCoreFunc] = useState(1)

  const CoreFuncSectionGroup = () => {
    if (coreFuncNameRefs.current && coreFuncDetailRefs.current)
      return [...Array(coreFunc)].map((_, index) => {
        const isLast = index == coreFunc - 1
        const onlyOnce = coreFunc == 1
        const fullSection = coreFunc == 4
        return (
          <div key={index} className={styles.section}>
            {isLast && (
              <span className={styles.sectionBtnGroup}>
                {!fullSection && (
                  <BiPlus
                    className={styles.sectionPlus}
                    onClick={() => {
                      if (coreFunc < 4) setCoreFunc(coreFunc + 1)
                    }}
                  />
                )}
                {!onlyOnce && (
                  <BiMinus
                    className={styles.sectionMinus}
                    onClick={() => {
                      if (coreFunc > 0) setCoreFunc(coreFunc - 1)
                    }}
                  />
                )}
              </span>
            )}
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
  const [mainClientImages, setMainClientImages] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const mainClientInputRefs = useRef<any>([])
  const mainClientSiteRefs = useRef<any>([])
  const [mainClient, setMainClient] = useState(1)

  const handleUpload = (index: number) => {
    if (mainClientInputRefs.current[index])
      mainClientInputRefs.current[index].click()
  }
  const handlePhoto = (e: any, index: number) => {
    const photo = e.target.files
    if (!photo[0]) return
    uploadFile(photo[0], index)
  }
  const uploadFile = async (file: any, index: number) => {
    const ReactS3Client = new S3(s3Config)
    ReactS3Client.uploadFile(file, 'mainClient/' + file.name)
      .then(data => {
        console.log(data.location)
        mainClientImages[index] = data.location
        setMainClientImages([...mainClientImages])
      })
      .catch(err => {
        console.error(err)
      })
  }
  const MainClientSectionGroup = () => {
    if (mainClientInputRefs.current && mainClientSiteRefs.current)
      return [...Array(mainClient)].map((_, index) => {
        const isLast = index == mainClient - 1
        const onlyOnce = mainClient == 1
        const fullSection = mainClient == 8
        return (
          <div key={index} className={styles.section}>
            {isLast && (
              <span className={styles.sectionBtnGroup}>
                {!fullSection && (
                  <BiPlus
                    className={styles.sectionPlus}
                    onClick={() => {
                      if (mainClient < 8) setMainClient(mainClient + 1)
                    }}
                  />
                )}
                {!onlyOnce && (
                  <BiMinus
                    className={styles.sectionMinus}
                    onClick={() => {
                      if (mainClient > 0) {
                        setMainClient(mainClient - 1)
                        mainClientImages[index] = ''
                        setMainClientImages([...mainClientImages])
                      }
                    }}
                  />
                )}
              </span>
            )}
            <h5 className={styles.label}>주요 고객사 이미지 {index + 1}</h5>
            <div className={styles.halfSection}>
              <div className={styles.mainClient}>
                {mainClientImages[index] ? (
                  <img
                    src={mainClientImages[index]}
                    alt='고객사 이미지'
                    onClick={() => handleUpload(index)}
                  />
                ) : (
                  <span onClick={() => handleUpload(index)}>
                    <BsImage />
                  </span>
                )}
                <div>
                  <h5>추천 사이즈 50 x 50</h5>
                  <h5>JPG, PNG, GIF 등</h5>
                  <a href='#' onClick={() => handleUpload(index)}>
                    이미지 업로드 하기
                  </a>
                  <input
                    ref={el => (mainClientInputRefs.current[index] = el)}
                    type='file'
                    accept='image/jpg, image/jpeg, image/png'
                    multiple
                    onChange={e => {
                      handlePhoto(e, index)
                    }}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              <TextInputBox
                textRef={(el: any) => (mainClientSiteRefs.current[index] = el)}
                title={'주요 고객사 사이트'}
                placeholder={'예시: https://www.apgroup.com/int/ko'}
                required={true}
              />
            </div>
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
        const isLast = index == costPlan - 1
        const onlyOnce = costPlan == 1
        const fullSection = costPlan == 4
        return (
          <div key={index} className={styles.section}>
            {isLast && (
              <span className={styles.sectionBtnGroup}>
                {!fullSection && (
                  <BiPlus
                    className={styles.sectionPlus}
                    onClick={() => {
                      if (costPlan < 4) setCostPlan(costPlan + 1)
                    }}
                  />
                )}
                {!onlyOnce && (
                  <BiMinus
                    className={styles.sectionMinus}
                    onClick={() => {
                      if (costPlan > 0) setCostPlan(costPlan - 1)
                    }}
                  />
                )}
              </span>
            )}
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
    // 프로덕트 사이트
    let siteData = ''
    if (siteRef.current)
      if (!siteRef.current.value) {
        siteRef.current.focus()
        toast('프로덕트 사이트를 입력해주세요.')
        return
      } else siteData = siteRef.current.value
    console.log('siteData', siteData)

    // 핵심 기능
    const coreFuncData: Array<CoreFuncType> = []
    if (coreFuncNameRefs.current && coreFuncDetailRefs.current) {
      for (let i = 0; i < coreFuncNameRefs.current.length; i++) {
        const tmp: CoreFuncType = {
          CoreFuncSubTitle: coreFuncNameRefs.current[i].value,
          CoreFuncContent: coreFuncDetailRefs.current[i].value,
        }
        coreFuncData.push(tmp)
      }
    }
    console.log('coreFuncData', coreFuncData)

    // 주요고객사
    const mainClientData: ClientInfoType[] = []
    if (mainClientSiteRefs.current) {
      // 여기만 값 참조
      for (let i = 0; i < mainClient; i++) {
        if (mainClientImages[i] !== '') {
          if (!mainClientSiteRefs.current[i].value) {
            mainClientSiteRefs.current[i].focus()
            toast('고객사 주소를 입력해주세요.')
            return
          }
          const tmp: ClientInfoType = {
            ClientImage: mainClientImages[i],
            ClientSiteUrl: mainClientSiteRefs.current[i].value,
          }
          mainClientData.push(tmp)
        } else {
          handleUpload(i)
          return
        }
      }
    }
    console.log('mainClientData', mainClientData)

    // 가격 플랜 별 기능
    const planCostData: PlanInfoType[] = []
    if (
      planTitleRef.current &&
      planVolumeRef.current &&
      planCostRef.current &&
      planFuncRef.current
    ) {
      for (let i = 0; i < planTitleRef.current.length; i++) {
        if (planTitleRef.current[i].value) {
          const t: string[] = []
          if (planFuncRef.current[i]) {
            planFuncRef.current[i].map((item: any, _) => {
              t.push(item.value)
            })
          }
          const tmp: PlanInfoType = {
            PlanName: planTitleRef.current[i].value,
            PlanVolume: planVolumeRef.current[i].value,
            PlanPricing: planCostRef.current[i].value,
            PlanFunc: t,
          }
          planCostData.push(tmp)
        } else {
          toast('제목이 입력되지 않은 플랜은 저장되지 않습니다.')
          planTitleRef.current[i].focus()
          return
        }
      }
    }
    console.log('planCostData', planCostData)

    // 스토어 점수
    if (!aosRef.current) return
    if (!iosRef.current) return

    console.log(aosRef.current.value)
    console.log(iosRef.current.value)

    const data: SelfSpecificTmpInfo = {
      individualDetailToolUrl: siteData,
      individualDetailCoreFunc: coreFuncData,
      individualDetailClient: mainClientData,
      individualDetailPlan: planCostData,
      individualDetailAosReviewRate: aosRef.current.value ?? '',
      individualDetailiosReviewRate: iosRef.current.value ?? '',
    }
    dispatch(createSelfSpecificTmpInfo(data))
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <h3 className={styles.title}>혼자써요 specific</h3>
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
            text={'Previous'}
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
            text={'Complete'}
            onClick={handleComplete}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminSelfSpecific
