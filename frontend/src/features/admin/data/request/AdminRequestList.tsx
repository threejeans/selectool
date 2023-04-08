import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs'
import {
  changeRequestStatus,
  deleteRequest,
  getRequestList,
  selectRequestList,
} from '../adminDataSlice'

import { selectAccessToken } from 'features/admin/auth/adminAuthSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from 'styles/admin/pages/data/AdminData.module.css'
import { DemandType } from 'types/userTypes'

type TabType = 'demand' | 'done' | 'hold'

const AdminRequestList = () => {
  const accessToken = useAppSelector(selectAccessToken)
  const requestList = useAppSelector(selectRequestList)
  const tabArr = [
    { tab: 'demand', name: '요청사항' },
    { tab: 'done', name: '등록접수' },
    { tab: 'hold', name: '일시보류' },
  ]
  const [tab, setTab] = useState<TabType>('demand')
  const [orderBy, setOrderBy] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) dispatch(getRequestList())
    else navigate('/admin/data')
  }, [tab])

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
  type change = {
    func: 'hold' | 'done' | 'undo' | 'delete'
    id: number
    type: string
  }
  const handleStatusChange = ({ func, id, type }: change) => {
    switch (func) {
      case 'hold':
        dispatch(changeRequestStatus({ id, status: null })).then(() =>
          dispatch(getRequestList()),
        )
        break
      case 'done':
        if (type === '툴' || type === '기업')
          dispatch(changeRequestStatus({ id, status: true })).then(() => {
            dispatch(getRequestList())
            navigate(`/admin/contents/${type === '툴' ? 'self' : 'with'}`)
            toast(`${type} 등록이 접수되었습니다. 등록창으로 이동합니다.`)
          })
        else toast(`해당 요청에 적절한 타입이 기입되어있지 않습니다.:${type}`)
        break
      case 'undo':
        dispatch(changeRequestStatus({ id, status: false })).then(() =>
          dispatch(getRequestList()),
        )
        break
      case 'delete':
        dispatch(deleteRequest({ id, status: null })).then(() =>
          dispatch(getRequestList()),
        )
        break
    }
  }

  type btn = { id: number; type: string; status: boolean | null }
  const getButton = ({ id, type, status }: btn) => {
    switch (status) {
      case false:
        return (
          <>
            <button
              className={styles.holdButton}
              onClick={() => handleStatusChange({ func: 'hold', id, type })}
            >
              보류하기
            </button>
            <button
              className={styles.doneButton}
              onClick={() => handleStatusChange({ func: 'done', id, type })}
            >
              접수하기
            </button>
          </>
        )
      case true:
        return (
          <>
            <button
              className={styles.undoButton}
              onClick={() => handleStatusChange({ func: 'undo', id, type })}
            >
              되돌리기
            </button>
            <button
              className={styles.holdButton}
              onClick={() => handleStatusChange({ func: 'hold', id, type })}
            >
              보류하기
            </button>
          </>
        )
      case null:
        return (
          <>
            <button
              className={styles.undoButton}
              onClick={() => handleStatusChange({ func: 'undo', id, type })}
            >
              되돌리기
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleStatusChange({ func: 'delete', id, type })}
            >
              삭제하기
            </button>
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
        <div className={styles.requestListWrap}>
          <div className={styles.requestList}>
            {getFilterList().map(item => {
              const { id, type, content, userEmail, createdAt, status } = item
              return (
                <div key={id} className={styles.requestItem}>
                  <span className={styles.itemId}>{id}</span>
                  <div>{type || '타입 미기입'}</div>
                  <div>{content || '요청사항 미기입'}</div>
                  <div className={styles.buttonGroup}>
                    {getButton({ id, type, status })}
                  </div>
                  <div className={styles.requesterInfo}>
                    <p>{userEmail || '미기입'}</p>
                    <p>{`${createdAt}` || ''}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRequestList
