import { getSelfSpecificInfoAPI } from 'api/self'
import { useAppDispatch } from 'app/hooks'
import { SelfDetailMain } from 'containers/Self'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setSelfSpecificInfo } from 'reducers/selfReducer'
import styles from 'styles/pages/commons/Content.module.css'

const SelfDetail = () => {
  const { toolId } = useParams()
  const dispatch = useAppDispatch()

  const getSelfSpecificInfo = async () => {
    dispatch(setSelfSpecificInfo(await getSelfSpecificInfoAPI(toolId)))
  }

  useEffect(() => {
    getSelfSpecificInfo()
  }, [])

  return (
    <div className={`${styles.layout} ${styles.detailLayout}`}>
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          <SelfDetailMain />
        </div>
      </div>
    </div>
  )
}

export default SelfDetail
