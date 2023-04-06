import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'
import { getRequestList, selectRequestList } from '../adminDataSlice'

import styles from 'styles/admin/pages/data/AdminData.module.css'

type TabType = 'request' | 'complete' | 'delete'

const AdminRequestList = () => {
  const requestList = useAppSelector(selectRequestList)
  const tabArr = [
    { tab: 'request', name: 'Request' },
    { tab: 'complete', name: 'Completed' },
    { tab: 'delete', name: 'Deleted' },
  ]
  const [tab, setTab] = useState<TabType>('request')

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getRequestList())
  }, [])
  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value as TabType)
  }
  const getPos = (tab: TabType) => {
    console.log(tab)
    switch (tab) {
      case 'request':
        return `${styles.pos1}`
      case 'complete':
        return `${styles.pos2}`
      case 'delete':
        return `${styles.pos3}`
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.dataTabs}>
          <span className={`${styles.glider} ${getPos(tab)}`}></span>
          {tabArr.map((item, index) => {
            return (
              <span key={index} className={styles.tabWrap}>
                <input
                  id={item.tab}
                  type={'radio'}
                  value={item.tab}
                  name={'dataTabs'}
                  checked={tab === item.tab}
                  onChange={handleTabChange}
                />
                <label className={styles.dataTab} htmlFor={item.tab}>
                  {item.name}
                </label>
              </span>
            )
          })}
        </div>
        {requestList.map((item, index) => {
          return <div key={index}>{JSON.stringify(item)}</div>
        })}
      </div>
    </div>
  )
}

export default AdminRequestList
