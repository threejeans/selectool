import { getWithSpecificInfoAPI } from 'api/with'
import { useAppDispatch } from 'app/hooks'
import { WithDetailMain } from 'containers/With'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setWithSpecificInfo } from 'reducers/withReducer'
import styles from 'styles/pages/commons/Content.module.css'

const WithDetail = () => {
  const { corpId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getWithSpecificInfo = async () => {
    const response = await getWithSpecificInfoAPI(corpId)
    if (response.isNotFound404) {
      navigate('/error')
    } else {
      dispatch(setWithSpecificInfo(response.data))
    }
  }

  useEffect(() => {
    getWithSpecificInfo()
  })

  return (
    <div className={`${styles.layout} ${styles.detailLayout}`}>
      <div className={styles.container}>
        <div className={styles.contentLayout}>
          <WithDetailMain />
        </div>
      </div>
    </div>
  )
}

export default WithDetail
