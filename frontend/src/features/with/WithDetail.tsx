import { getWithSpecificInfoAPI } from 'api/with'
import { useAppDispatch } from 'app/hooks'
import { WithDetailMain } from 'containers/With'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setWithSpecificInfo } from 'reducers/withReducer'
import styles from 'styles/pages/commons/Content.module.css'

const WithDetail = () => {
  const { corpId } = useParams()
  const dispatch = useAppDispatch()

  const getWithSpecificInfo = async () => {
    dispatch(setWithSpecificInfo(await getWithSpecificInfoAPI(corpId)))
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
