import { getSelfSpecificInfoAPI } from 'api/self'
import { useAppDispatch } from 'app/hooks'
import { SelfDetailMain } from 'containers/Self'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelfSpecificInfo } from 'reducers/selfReducer'
import styles from 'styles/pages/commons/Content.module.css'

const SelfDetail = () => {
  const { toolId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getSelfSpecificInfo = async () => {
    const response = await getSelfSpecificInfoAPI(toolId)
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
