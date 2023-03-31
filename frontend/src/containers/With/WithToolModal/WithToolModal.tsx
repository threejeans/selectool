import { useAppDispatch, useAppSelector } from 'app/hooks'
import Modal from 'components/Modal'
import { CommonCardSection, DetailContentCard } from 'containers/Common'
import PlanComponent from 'containers/Self/SelfDetailComponent/PlanComponent'
import React from 'react'
import { selfSpecificInfo } from 'reducers/selfReducer'
import {
  changeToolSpecificModalStatus,
  toolSpecificModalState,
} from 'reducers/withReducer'
import detailStyles from '../../Self/SelfDetailMain/SelfDetailMain.module.css'
import styles from './WithToolModal.module.css'

const WithToolModal = () => {
  const modalStatus = useAppSelector(toolSpecificModalState)
  const dispatch = useAppDispatch()
  const closemodal = () => dispatch(changeToolSpecificModalStatus())
  const specificInfo = useAppSelector(selfSpecificInfo)

  const clientsDescription =
    '* 상위 ' + specificInfo.clients.length + '개 고객사 기준'
  const planDescription = '* 총 ' + specificInfo.plans.length + '가지 요금 플랜'

  return (
    <Modal isModal={modalStatus} setIsModal={closemodal}>
      <div className={styles.modalLayout}>
        <div className={styles.basicInfoSection}>
          <img src={specificInfo.image} className={styles.image}></img>
          <div className={styles.textSection}>
            <div className={styles.name}>{specificInfo.nameKr}</div>
            <div className={styles.info}>{specificInfo.info}</div>
          </div>
          <a href={specificInfo.url} className={styles.url}>
            웹페이지 ↗
          </a>
        </div>
        <DetailContentCard
          isWith
          title='핵심 기능'
          description='* 공식 홈페이지 기준'
        >
          <div className={detailStyles.toolFunctionsLayout}>
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
          isWith
          title='주요 고객사'
          description={clientsDescription}
        >
          <div className={detailStyles.clientsLayout}>
            {specificInfo.clients.map((client, index) => (
              <a href={client.url} key={index}>
                <img src={client.image} className={detailStyles.client}></img>
              </a>
            ))}
          </div>
        </DetailContentCard>
        <DetailContentCard
          isWith
          title='요금안내'
          description={planDescription}
        >
          <div className={detailStyles.plansLayout}>
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
      </div>
    </Modal>
  )
}

export default WithToolModal
