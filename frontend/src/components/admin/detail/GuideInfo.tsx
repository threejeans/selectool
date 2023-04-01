import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCurrentContent,
  updateGuide,
} from 'features/admin/contents/adminContentsSlice'
import React, { useState } from 'react'
import { GuideType } from 'types/types'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import ModifyButton from './ModifyButton'
import CustomDatePicker from '../CustomDatePicker'

type InfoItemProps = {
  isModified: boolean
  string: string
  setString: React.Dispatch<React.SetStateAction<string>>
}

const InfoItem = ({ isModified, string, setString }: InfoItemProps) => {
  return (
    <>
      {isModified ? (
        <td>
          <input
            className={styles.infoItemInput}
            value={string || ''}
            onChange={e => setString(e.target.value)}
          />
        </td>
      ) : (
        <td>{string}</td>
      )}
    </>
  )
}

const GuideInfo = () => {
  const guide = useAppSelector(selectCurrentContent) as GuideType
  const { title, date, content, source, url } = guide

  const dispatch = useAppDispatch()
  const [tmpTitle, setTmpTitle] = useState<string>(title)
  const [tmpDate, setTmpDate] = useState<Date>(new Date(date?.toString() || ''))
  const [tmpContent, setTmpContent] = useState<string>(content)
  const [tmpSource, setTmpSource] = useState<string>(source)
  const [tmpUrl, setTmpUrl] = useState<string>(url)

  const [isModified, setIsModifed] = useState(false)

  const handleModify: React.Dispatch<React.SetStateAction<boolean>> = () => {
    if (isModified) {
      const tmp = { ...guide }
      tmp.title = tmpTitle
      tmp.date = tmpDate
      tmp.content = tmpContent
      tmp.source = tmpSource
      tmp.url = tmpUrl
      dispatch(updateGuide(tmp)).then(e => {
        console.log(e)
        const gd = e.payload as GuideType
        setTmpTitle(gd.title)
        setTmpDate(new Date(gd.date?.toString() || ''))
        setTmpContent(gd.content)
        setTmpSource(gd.source)
        setTmpUrl(gd.url)
        setIsModifed(false)
      })
    } else setIsModifed(true)
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.title}>
          <ModifyButton value={isModified} setValue={handleModify} />
          {'가이드 상세정보'}
        </div>
      </div>
      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <td>가이드 이름</td>
            <InfoItem
              isModified={isModified}
              string={tmpTitle}
              setString={setTmpTitle}
            />
          </tr>
          <tr>
            <td>콘텐츠 일자</td>
            {isModified ? (
              <CustomDatePicker
                date={new Date(`${tmpDate}`)}
                setDate={setTmpDate}
              />
            ) : (
              <td>{tmpDate.toLocaleDateString()}</td>
            )}
          </tr>
          <tr>
            <td>콘텐츠 내용</td>
            <InfoItem
              isModified={isModified}
              string={tmpContent}
              setString={setTmpContent}
            />
          </tr>
          <tr>
            <td>콘텐츠 소스</td>
            <InfoItem
              isModified={isModified}
              string={tmpSource}
              setString={setTmpSource}
            />
          </tr>
          <tr>
            <td>콘텐츠 링크</td>
            <InfoItem
              isModified={isModified}
              string={tmpUrl}
              setString={setTmpUrl}
            />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GuideInfo
