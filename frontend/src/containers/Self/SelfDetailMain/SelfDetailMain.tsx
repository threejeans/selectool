import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  CommonCardSection,
  DetailContentCard,
  DetailMainCard,
} from 'containers/Common'
import React, { useEffect } from 'react'
import { selfSpecificInfo, setSelfSpecificInfo } from 'reducers/selfReducer'
import styles from './SelfDetailMain.module.css'
import RatingComponent from '../SelfDetailComponent/RatingComponent'
import PlanComponent from '../SelfDetailComponent/PlanComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAccessToken } from 'features/auth/authSlice'
import { getAuthSelfSpecificInfoAPI } from 'api/authSelf'
import { getSelfSpecificInfoAPI } from 'api/self'

const SelfDetailMain = () => {
  const specificInfo = useAppSelector(selfSpecificInfo)
  const clientsDescription =
    '* 상위 ' + specificInfo.clients.length + '개 고객사 기준'
  const planDescription = '* 총 ' + specificInfo.plans.length + '가지 요금 플랜'

  const { toolId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogon = useAppSelector(selectAccessToken)

  const getSelfSpecificInfo = async () => {
    const response = isLogon
      ? await dispatch(getAuthSelfSpecificInfoAPI(toolId)).unwrap()
      : await getSelfSpecificInfoAPI(toolId)
    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setSelfSpecificInfo(response.data))
    }
  }

  useEffect(() => {
    getSelfSpecificInfo()
  }, [])

  return (
    <>
      <DetailMainCard
        isSelf
        id={specificInfo.id}
        isBookmarked={specificInfo.isBookmarked}
        image={specificInfo.image}
        nameKr={specificInfo.nameKr}
        info={specificInfo.info}
        button1ClickEvent={() => {
          document.location.href = specificInfo.url
        }}
        button2ClickEvent={() => {
          alert('서비스 준비중입니다.')
        }}
        button3ClickEvent={() => {
          alert('서비스 준비중입니다.')
        }}
      />
      <div className={styles.rightSection}>
        <DetailContentCard title='핵심 기능' description='* 공식 홈페이지 기준'>
          <div className={styles.toolFunctionsLayout}>
            {specificInfo.toolFunctions.map((toolFunction, index) => (
              <CommonCardSection
                key={index}
                name={toolFunction.name}
                content={toolFunction.content}
              />
            ))}
          </div>
        </DetailContentCard>
        <DetailContentCard title='주요 고객사' description={clientsDescription}>
          <div className={styles.clientsLayout}>
            {specificInfo.clients.map((client, index) => (
              <a href={client.url} key={index}>
                <img src={client.image} className={styles.client}></img>
              </a>
            ))}
          </div>
        </DetailContentCard>
        <DetailContentCard title='요금안내' description={planDescription}>
          <div className={styles.plansLayout}>
            {specificInfo.plans.map((plan, index) => (
              <PlanComponent
                key={index}
                idx={index}
                title={plan.title}
                volume={plan.volume}
                cost={plan.cost}
                planFunc={plan.planFunctions}
              ></PlanComponent>
            ))}
          </div>
        </DetailContentCard>
        <DetailContentCard title='평점' description='* IOS/Android 사용자 기준'>
          <div className={styles.ratingsLayout}>
            <RatingComponent isAppstore ratingScore={specificInfo.ios} />
            <div className={styles.ratingLine}></div>
            <RatingComponent ratingScore={specificInfo.aos} />
          </div>
        </DetailContentCard>
      </div>
    </>
  )
}

export default SelfDetailMain
