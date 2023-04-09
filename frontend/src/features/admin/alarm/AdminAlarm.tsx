import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import styles from 'styles/admin/pages/alarm/AdminAlarm.module.css'
import { getSubscribeList, selectSubscribeList } from './adminAlarmSlice'
import { checkValiableToken, selectAccessToken } from '../auth/adminAuthSlice'
import { useNavigate } from 'react-router-dom'

const AdminAlarm = () => {
  const accessToken = useAppSelector(selectAccessToken)
  const subscribeList = useAppSelector(selectSubscribeList)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) dispatch(getSubscribeList())
    else dispatch(checkValiableToken()).catch(() => navigate('/admin'))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.subscribeItem}>
          <span className={styles.itemId}>번호</span>
          <span className={styles.itemEmail}>아이디</span>
          <span className={styles.itemDate}>구독신청일자</span>
          <span
            className={styles.itemTools}
            style={{ justifyContent: 'center' }}
          >
            구독 툴
          </span>
          <span className={styles.itemType}>수신경로</span>
          <span className={styles.itemButton}>처리</span>
        </div>
        {subscribeList.map(item => {
          const {
            id,
            email,
            createdAt,
            tools,
            subscribeEmail,
            subscribeActive,
          } = item
          return (
            <div key={id} className={styles.subscribeItem}>
              <span className={styles.itemId}>{id}</span>
              <span className={styles.itemEmail}>{email}</span>
              <span className={styles.itemDate}>
                {new Date(createdAt).toLocaleString('ko-KR')}
              </span>
              <span className={styles.itemTools}>
                {tools.map((item, index) => {
                  return (
                    <span key={index} className={styles.itemTool}>
                      {item.nameKr}
                    </span>
                  )
                })}
              </span>
              <span className={styles.itemType}>{subscribeEmail}</span>
              <span className={styles.itemButton}>
                {subscribeActive ? (
                  <>
                    <button className={styles.sendButton}>발송</button>
                    <button className={styles.stopButton}>중지</button>
                  </>
                ) : (
                  '중단'
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminAlarm
