import { useAppSelector } from 'app/hooks'
import { DetailContentCard, DetailMainCard } from 'containers/Common'
import React from 'react'
import { selfSpecificInfo } from 'reducers/selfReducer'
import styles from './SelfDetailMain.module.css'

const SelfDetailMain = () => {
  const specipicInfo = useAppSelector(selfSpecificInfo)

  return (
    <>
      <DetailMainCard
        isSelf
        image={specipicInfo.image}
        nameKr={specipicInfo.nameKr}
        info={specipicInfo.info}
        button1={specipicInfo.url}
        button2=''
        button3=''
      />
      <div className={styles.rightSection}>
        <DetailContentCard>
          <div></div>
        </DetailContentCard>
      </div>
    </>
  )
}

export default SelfDetailMain
