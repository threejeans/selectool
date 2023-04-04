import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { getRequestList, selectRequestList } from '../adminDataSlice'

import styles from 'styles/admin/pages/data/AdminData.module.css'

const AdminRequestList = () => {
  const requestList = useAppSelector(selectRequestList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getRequestList())
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {requestList.map((item, index) => {
          return <div key={index}>{JSON.stringify(item)}</div>
        })}
      </div>
    </div>
  )
}

export default AdminRequestList
