import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { CorpType } from 'types/types'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import ModifyButton from './ModifyButton'
import { BsArrowUpRight } from 'react-icons/bs'

const WithInfo = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { image, nameKr, nameEn, info, teamNameKr, teamNameEn, url, content } =
    useAppSelector(selectCurrentContent) as CorpType

  const [isModified, setIsMofifed] = useState(false)

  return (
    <div className={styles.section}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={nameKr} />
      </div>
      <div className={styles.title}>
        <ModifyButton value={isModified} setValue={setIsMofifed} />
        <p className={styles.mainTitle}>{nameKr}</p>
        <p className={styles.subTitle}>{nameEn}</p>
      </div>
      <div className={styles.info}>{info}</div>
      <a className={styles.url} href={url} target={'_blank'} rel={'noreferrer'}>
        웹페이지
        <BsArrowUpRight />
      </a>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>{'기업소개'}</div>
        <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
      </div>
      <div className={styles.corpContent}>{content}</div>
      <div className={styles.title}>
        <p className={styles.subTitle}>- {teamNameKr}</p>
        <p className={styles.subTitle}>({teamNameEn}) -</p>
      </div>
    </div>
  )
}

export default WithInfo
