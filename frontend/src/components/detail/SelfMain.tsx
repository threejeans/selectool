import { useAppSelector } from 'app/hooks'
import { selectCurrentContent } from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import { ToolType } from 'types/types'
import ModifyButton from './ModifyButton'

const SelfMain = () => {
  const { image, nameKr, nameEn, info, url } = useAppSelector(
    selectCurrentContent,
  ) as ToolType
  const [isModified, setIsMofifed] = useState(false)
  return (
    <div className={styles.section}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={nameKr} />
      </div>
      <div className={styles.title}>
        <ModifyButton value={isModified} setValue={setIsMofifed} />
        {nameKr}
        <p className={styles.subTitle}>{nameEn}</p>
      </div>
      <div className={styles.info}>{info}</div>
      <a className={styles.url} href={url} target={'_blank'} rel={'noreferrer'}>
        웹페이지
        <BsArrowUpRight />
      </a>
    </div>
  )
}

export default SelfMain
