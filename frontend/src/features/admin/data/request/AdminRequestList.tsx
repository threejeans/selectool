import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'
import { getRequestList, selectRequestList } from '../adminDataSlice'
import { BsArrowDownUp } from 'react-icons/bs'

import styles from 'styles/admin/pages/data/AdminData.module.css'
import { DemandType } from 'types/userTypes'

type TabType = 'demand' | 'done' | 'hold'

const AdminRequestList = () => {
  const requestList = useAppSelector(selectRequestList)
  const tabArr = [
    { tab: 'demand', name: '요청사항' },
    { tab: 'done', name: '등록완료' },
    { tab: 'hold', name: '일시보류' },
  ]
  const [tab, setTab] = useState<TabType>('demand')
  const [orderBy, setOrderBy] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getRequestList())
  }, [])
  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tab !== e.target.value) setTab(e.target.value as TabType)
    else console.log(e.target.value)
  }
  const getPos = (tab: TabType) => {
    switch (tab) {
      case 'demand':
        return `${styles.pos1}`
      case 'done':
        return `${styles.pos2}`
      case 'hold':
        return `${styles.pos3}`
    }
  }
  const getFilterList: () => DemandType[] = () => {
    const tmp: DemandType[] = []
    if (orderBy) requestList.map(item => tmp.push(item))
    else
      requestList
        .slice(0)
        .reverse()
        .map(item => tmp.push(item))
    switch (tab) {
      case 'demand':
        return tmp.filter(item => item.status === false) as DemandType[]
      case 'done':
        return tmp.filter(item => item.status === true) as DemandType[]
      case 'hold':
        return tmp.filter(item => item.status === null) as DemandType[]
      default:
        return tmp
    }
  }
  type btn = { id: number; type: string; status: boolean | null }
  const getButton = ({ id, type, status }: btn) => {
    switch (status) {
      case false:
        return (
          <>
            <button>보류하기</button>
            <button>등록하기</button>
          </>
        )
      case true:
        return (
          <>
            <button>되돌리기</button>
            <button>보류하기</button>
          </>
        )
      case null:
        return (
          <>
            <button>되돌리기</button>
            <button>삭제하기</button>
          </>
        )
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
                  {tab === item.tab && (
                    <BsArrowDownUp
                      className={`${styles.downUp} ${
                        orderBy ? styles.asc : styles.desc
                      }`}
                      onClick={() => setOrderBy(!orderBy)}
                    />
                  )}
                </label>
              </span>
            )
          })}
        </div>
        <div className={styles.requestList}>
          {getFilterList().map((item, index) => {
            const {
              id,
              type,
              content,
              userType,
              userEmail,
              createdAt,
              status,
            } = item
            return (
              <div key={index} className={styles.requestItem}>
                <span>{id}</span>
                <div>요청자: {userEmail || '미기입'}</div>
                <div>사용자: {userType || '미기입'}</div>
                <div>유형: {type || '미기입'}</div>
                <div>이름: {content || '미기입'}</div>
                <div>{getButton({ id, type, status })}</div>
                <div>요청일자: {`${createdAt}` || ''}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminRequestList
