import { useAppSelector } from 'app/hooks'
import Button from 'components/Button'
import { loginModalOpen, selectAccessToken } from 'features/auth/authSlice'
import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './DetailMainCard.module.css'

type ÇardProps = {
  isSelf?: boolean
  image?: string
  nameKr?: string
  info?: string
  button1ClickEvent: () => void
  button2ClickEvent: () => void
  button3ClickEvent: () => void
}

const DetailMainCard = ({
  isSelf = false,
  image,
  nameKr,
  info,
  button1ClickEvent,
  button2ClickEvent,
  button3ClickEvent,
}: ÇardProps) => {
  const [isScraped, setScraped] = useState(false)
  const isLogon = useAppSelector(selectAccessToken) !== undefined

  const handleScrap = () => {
    if (isLogon) {
      setScraped(!isScraped)
    } else {
      dispatcth(loginModalOpen())
    }
  }

  return (
    <div
      className={`${styles.cardLayout} ${
        isSelf ? null : styles.withCardLayout
      }`}
    >
      <BsFillBookmarkFill
        className={`${styles.bookmark} ${
          isScraped ? styles.bookmarkScraped : null
        }`}
        onClick={handleScrap}
      ></BsFillBookmarkFill>
      <div className={styles.topSection}>
        <img src={image} className={styles.image}></img>
        <div className={styles.infoSection}>
          <div className={styles.name}>{nameKr}</div>
          <div className={styles.info}>{info}</div>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <div className={styles.smallButtons}>
          <Button
            color={isSelf ? 'secondary' : 'primary'}
            size={'mdShort'}
            text={'웹페이지 ↗'}
            clickEvent={button1ClickEvent}
          ></Button>
          <Button
            color={'secondary'}
            size={'mdShort'}
            text={isSelf ? '가이드 ↗' : '공유하기'}
            clickEvent={button2ClickEvent}
          ></Button>
        </div>
        {isSelf ? (
          <Button
            color={'primary'}
            size={'mdLong'}
            text={'구독하기'}
            clickEvent={button3ClickEvent}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default DetailMainCard
function dispatcth(arg0: { payload: undefined; type: 'auth/loginModalOpen' }) {
  throw new Error('Function not implemented.')
}
