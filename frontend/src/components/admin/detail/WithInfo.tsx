import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateCorp,
} from 'features/admin/contents/adminContentsSlice'
import { useState } from 'react'
import { CorpType } from 'types/types'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import ModifyButton from './ModifyButton'
import { BsArrowUpRight } from 'react-icons/bs'
import ImageInput from '../ImageInput'

const WithInfo = () => {
  const corp = useAppSelector(selectCurrentContent) as CorpType
  const { image, nameKr, nameEn, info, teamNameKr, teamNameEn, url, content } =
    useAppSelector(selectCurrentContent) as CorpType

  const dispatch = useAppDispatch()

  const [tmpImage, setTmpImage] = useState<string>(image)
  const [tmpNameKr, setTmpNameKr] = useState<string>(nameKr)
  const [tmpNameEn, setTmpNameEn] = useState<string>(nameEn)
  const [tmpInfo, setTmpInfo] = useState<string>(info)
  const [tmpUrl, setTmpUrl] = useState<string>(url)
  const [tmpContent, setTmpContent] = useState<string>(content)
  const [tmpTeamNameKr, setTmpTeamNameKr] = useState<string>(teamNameKr)
  const [tmpTeamNameEn, setTmpTeamNameEn] = useState<string>(teamNameEn)

  const [isModified, setIsMofifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    const tmp = { ...corp }
    tmp.image = tmpImage
    tmp.nameKr = tmpNameKr
    tmp.nameEn = tmpNameEn
    tmp.info = tmpInfo
    tmp.url = tmpUrl
    tmp.content = tmpContent
    tmp.teamNameKr = tmpTeamNameKr
    tmp.teamNameEn = tmpTeamNameEn
    dispatch(updateCorp(tmp))
      .then(e => {
        console.log(e)
        setIsMofifed(false)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className={styles.section}>
      {isModified ? (
        <>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={tmpImage} alt={nameKr} />
            <ImageInput image={tmpImage} setImage={setTmpImage} />
          </div>
          <div className={styles.title}>
            <ModifyButton value={isModified} setValue={handleModify} />
            <input
              className={styles.mainTitle}
              value={tmpNameKr}
              onChange={e => setTmpNameKr(e.target.value)}
            />
            <input
              className={styles.subTitle}
              value={tmpNameEn}
              onChange={e => setTmpNameEn(e.target.value)}
            />
          </div>
          <input
            className={styles.info}
            value={tmpInfo}
            onChange={e => setTmpInfo(e.target.value)}
          />
          <input
            className={styles.url}
            value={tmpUrl}
            onChange={e => setTmpUrl(e.target.value)}
          />
          <div className={styles.sectionHeader}>
            <div className={styles.title}>
              {'기업소개'}
              <ModifyButton value={isModified} setValue={handleModify} />
            </div>
            <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
          </div>
          <input
            className={styles.corpContent}
            value={tmpContent}
            onChange={e => setTmpContent(e.target.value)}
          />
          <div className={styles.title}>
            <input
              className={styles.subTitle}
              value={tmpTeamNameKr}
              onChange={e => setTmpTeamNameKr(e.target.value)}
            />
            <input
              className={styles.subTitle}
              value={tmpTeamNameEn}
              onChange={e => setTmpTeamNameEn(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={image} alt={nameKr} />
          </div>
          <div className={styles.title}>
            <ModifyButton value={isModified} setValue={setIsMofifed} />
            <p className={styles.mainTitle}>{nameKr}</p>
            <p className={styles.subTitle}>{nameEn}</p>
          </div>
          <div className={styles.info}>{info}</div>
          <a
            className={styles.url}
            href={url}
            target={'_blank'}
            rel={'noreferrer'}
          >
            웹페이지
            <BsArrowUpRight />
          </a>
          <div className={styles.sectionHeader}>
            <div className={styles.title}>
              {'기업소개'}
              <ModifyButton value={isModified} setValue={setIsMofifed} />
            </div>
            <p className={styles.subTitle}>{'* 공식홈페이지 기준'}</p>
          </div>
          <div className={styles.corpContent}>{content}</div>
          <div className={styles.title}>
            <p className={styles.subTitle}>- {teamNameKr}</p>
            <p className={styles.subTitle}>({teamNameEn}) -</p>
          </div>
        </>
      )}
    </div>
  )
}

export default WithInfo
