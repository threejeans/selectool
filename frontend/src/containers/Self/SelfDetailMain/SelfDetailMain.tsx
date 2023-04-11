import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  CommonCardSection,
  DetailContentCard,
  DetailMainCard,
} from 'containers/Common'
import React, { useEffect } from 'react'
import {
  changeSubscribeModalStatus,
  selfSpecificInfo,
  setSelfSpecificInfo,
} from 'reducers/selfReducer'
import styles from './SelfDetailMain.module.css'
import RatingComponent from '../SelfDetailComponent/RatingComponent'
import PlanComponent from '../SelfDetailComponent/PlanComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import {
  getAuthSelfSpecificInfoAPI,
  selfSubscribeToolAPI,
  selfUnsubscribeToolAPI,
} from 'api/authSelf'
import { getSelfSpecificInfoAPI } from 'api/self'
import ContentSpinner from 'components/ContentSpinner'
import { setSearchKey } from 'reducers/guideReducer'
import { setUserInfo, userInfo } from 'reducers/settingReducer'
import { editUserInfoAPI, getUserInfoAPI } from 'api/setting'
import SubscribeModal from '../SubscribeModal/SubscribeModal'
import { Mobile, MobileWide, Pc, Tablet } from 'components/Layout'

const SelfDetailMain = () => {
  const { toolId } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const specificInfo = useAppSelector(selfSpecificInfo)
  const isLogon = useAppSelector(selectAccessToken)
  const userInfoForSubscribe = useAppSelector(userInfo)

  const clientsDescription =
    '* 상위 ' + specificInfo.clients.length + '개 고객사 기준'
  const planDescription = '* 총 ' + specificInfo.plans.length + '가지 요금 플랜'

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

  const getUserInfo = async () => {
    const response = await dispatch(getUserInfoAPI()).unwrap()

    if (response.statusCode === 404) {
      navigate('/error')
    } else {
      dispatch(setUserInfo(response.data))
    }
  }

  const alarmEvent = async () => {
    const response = await dispatch(
      editUserInfoAPI({ subscribeActive: true }),
    ).unwrap()

    if (response === 200 || response === 201) {
      console.log(response)
      const newUserInfo = { ...userInfoForSubscribe }
      newUserInfo.subscribeActive = true
      dispatch(setUserInfo(newUserInfo))
    } else {
      console.log(response)
    }
  }

  const subscribeEvent = async () => {
    if (isLogon) {
      if (
        !userInfoForSubscribe.subscribeEmail ||
        (userInfoForSubscribe.subscribeEmail &&
          !userInfoForSubscribe.emailVerified)
      ) {
        dispatch(changeSubscribeModalStatus())
      } else {
        const id = toolId ? parseInt(toolId) : 0
        const subscribeResponse = specificInfo.isSubscribed
          ? await dispatch(selfUnsubscribeToolAPI(id)).unwrap()
          : await dispatch(selfSubscribeToolAPI(id)).unwrap()

        if (
          subscribeResponse.statusCode === 200 ||
          subscribeResponse.statusCode === 201
        ) {
          const newInfo = { ...specificInfo }
          newInfo.isSubscribed = !newInfo.isSubscribed
          if (!userInfoForSubscribe.subscribeActive) {
            alarmEvent()
          }
          dispatch(setSelfSpecificInfo(newInfo))
        } else {
          console.log('error', subscribeResponse.statusCode)
        }
      }
    } else {
      dispatch(loginModalOpen())
    }
  }

  useEffect(() => {
    getSelfSpecificInfo()
    if (!userInfoForSubscribe.email && isLogon) {
      getUserInfo()
    }
  }, [])

  return (
    <>
      <SubscribeModal toolId={toolId} />
      {specificInfo.nameKr === '' ? (
        <div className={styles.spinnerLayout}>
          <ContentSpinner />
        </div>
      ) : (
        <>
          <Pc>
            <div className={styles.contentLayout}>
              <DetailMainCard
                isSelf
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
                isSubscribed={specificInfo.isSubscribed}
                image={specificInfo.image}
                nameKr={specificInfo.nameKr}
                info={specificInfo.info}
                button1ClickEvent={() => {
                  document.location.href = specificInfo.url
                }}
                button2ClickEvent={() => {
                  dispatch(setSearchKey(specificInfo.nameKr))
                  navigate('/guide')
                }}
                button3ClickEvent={subscribeEvent}
              />
              <div className={styles.rightSection}>
                <DetailContentCard
                  title='핵심 기능'
                  description='* 공식 홈페이지 기준'
                >
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
                <DetailContentCard
                  title='주요 고객사'
                  description={clientsDescription}
                >
                  <div className={styles.clientsLayout}>
                    {specificInfo.clients.map((client, index) => (
                      <a href={client.url} key={index}>
                        <img src={client.image} className={styles.client}></img>
                      </a>
                    ))}
                  </div>
                </DetailContentCard>
                <DetailContentCard
                  title='요금안내'
                  description={planDescription}
                >
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
                <DetailContentCard
                  title='평점'
                  description='* IOS/Android 사용자 기준'
                >
                  <div className={styles.ratingsLayout}>
                    <RatingComponent
                      isAppstore
                      ratingScore={specificInfo.ios}
                    />
                    <div className={styles.ratingLine}></div>
                    <RatingComponent ratingScore={specificInfo.aos} />
                  </div>
                </DetailContentCard>
              </div>
            </div>
          </Pc>
          <Tablet>
            <div className={styles.contentLayoutTablet}>
              <DetailMainCard
                isSelf
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
                isSubscribed={specificInfo.isSubscribed}
                image={specificInfo.image}
                nameKr={specificInfo.nameKr}
                info={specificInfo.info}
                button1ClickEvent={() => {
                  document.location.href = specificInfo.url
                }}
                button2ClickEvent={() => {
                  dispatch(setSearchKey(specificInfo.nameKr))
                  navigate('/guide')
                }}
                button3ClickEvent={subscribeEvent}
              />

              <DetailContentCard
                title='핵심 기능'
                description='* 공식 홈페이지 기준'
              >
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
              <DetailContentCard
                title='주요 고객사'
                description={clientsDescription}
              >
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
              <DetailContentCard
                title='평점'
                description='* IOS/Android 사용자 기준'
              >
                <div className={styles.ratingsLayout}>
                  <RatingComponent isAppstore ratingScore={specificInfo.ios} />
                  <div className={styles.ratingLine}></div>
                  <RatingComponent ratingScore={specificInfo.aos} />
                </div>
              </DetailContentCard>
            </div>
          </Tablet>
          <MobileWide>
            <div className={styles.contentLayoutTablet}>
              <DetailMainCard
                isSelf
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
                isSubscribed={specificInfo.isSubscribed}
                image={specificInfo.image}
                nameKr={specificInfo.nameKr}
                info={specificInfo.info}
                button1ClickEvent={() => {
                  document.location.href = specificInfo.url
                }}
                button2ClickEvent={() => {
                  dispatch(setSearchKey(specificInfo.nameKr))
                  navigate('/guide')
                }}
                button3ClickEvent={subscribeEvent}
              />

              <DetailContentCard
                title='핵심 기능'
                description='* 공식 홈페이지 기준'
              >
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
              <DetailContentCard
                title='주요 고객사'
                description={clientsDescription}
              >
                <div className={styles.clientsLayoutMobile}>
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
              <DetailContentCard
                title='평점'
                description='* IOS/Android 사용자 기준'
              >
                <div className={styles.ratingsLayout}>
                  <RatingComponent isAppstore ratingScore={specificInfo.ios} />
                  <RatingComponent ratingScore={specificInfo.aos} />
                </div>
              </DetailContentCard>
            </div>
          </MobileWide>
          <Mobile>
            <div className={styles.contentLayoutTablet}>
              <DetailMainCard
                isSelf
                id={specificInfo.id}
                isBookmarked={specificInfo.isBookmarked}
                isSubscribed={specificInfo.isSubscribed}
                image={specificInfo.image}
                nameKr={specificInfo.nameKr}
                info={specificInfo.info}
                button1ClickEvent={() => {
                  document.location.href = specificInfo.url
                }}
                button2ClickEvent={() => {
                  dispatch(setSearchKey(specificInfo.nameKr))
                  navigate('/guide')
                }}
                button3ClickEvent={subscribeEvent}
              />

              <DetailContentCard
                title='핵심 기능'
                description='* 공식 홈페이지 기준'
              >
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
              <DetailContentCard
                title='주요 고객사'
                description={clientsDescription}
              >
                <div className={styles.clientsLayoutMobile}>
                  {specificInfo.clients.map((client, index) => (
                    <a href={client.url} key={index}>
                      <img
                        src={client.image}
                        className={styles.clientMobile}
                      ></img>
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
              <DetailContentCard
                title='평점'
                description='* IOS/Android 사용자 기준'
              >
                <div className={styles.ratingsLayout}>
                  <RatingComponent isAppstore ratingScore={specificInfo.ios} />
                  <RatingComponent ratingScore={specificInfo.aos} />
                </div>
              </DetailContentCard>
            </div>
          </Mobile>
        </>
      )}
    </>
  )
}

export default SelfDetailMain
