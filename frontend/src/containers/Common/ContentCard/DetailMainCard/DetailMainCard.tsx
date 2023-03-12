import Button from 'components/Button'
import React, { useState } from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './DetailMainCard.module.css'

type ÇardProps = {
  isSelf?: boolean
  image?: string
  nameKr?: string
  info?: string
  button1?: string
  button2?: string
  button3?: string
}

const DetailMainCard = ({
  isSelf = false,
  image,
  nameKr,
  info,
  button1,
  button2,
  button3,
}: ÇardProps) => {
  const [isScraped, setScraped] = useState(false)

  const handleScrap = () => {
    setScraped(!isScraped)
    // clickEvent
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
            color={'secondary'}
            size={'mdShort'}
            text={'웹페이지 ↗'}
          ></Button>
          <Button
            color={'secondary'}
            size={'mdShort'}
            text={isSelf ? '가이드 ↗' : '공유하기'}
          ></Button>
        </div>
        {isSelf ? (
          <Button color={'primary'} size={'mdLong'} text={'구독하기'} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default DetailMainCard
