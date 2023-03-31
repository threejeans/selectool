import React, { useState } from 'react'
import styles from './Sidebar.module.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContent, setSelectContent } from 'reducers/settingReducer'

const Sidebar = () => {
  const [setting, setSetting] = useState(false)
  const selectedContent = useAppSelector(selectContent)
  const dispatch = useAppDispatch()
  const subSection = ['혼자써요', '함께써요', '가이드']

  return (
    <div className={styles.layout}>
      <div className={styles.title}>내 정보</div>
      <div
        className={
          !setting ? styles.sectionContainerActive : styles.sectionContainer
        }
      >
        <div
          className={`${
            !setting ? styles.mainSectionActive : styles.mainSection
          } ${styles.mainSectionWithSub}`}
          onClick={() => {
            setSetting(!setting)
            dispatch(setSelectContent('혼자써요'))
          }}
        >
          <div>북마크 컨텐츠</div>
          {!setting ? (
            <BsChevronUp className={styles.chevron} />
          ) : (
            <BsChevronDown className={styles.chevron} />
          )}
        </div>
        {!setting ? (
          <div className={styles.subSectionContainer}>
            {subSection.map((item, index) => (
              <div
                className={
                  selectedContent === item
                    ? styles.subSectionActive
                    : styles.subSection
                }
                key={index}
                onClick={() => dispatch(setSelectContent(item))}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <div
        className={setting ? styles.mainSectionActive : styles.mainSection}
        onClick={() => {
          setSetting(!setting)
          dispatch(setSelectContent('설정'))
        }}
      >
        설정
      </div>
    </div>
  )
}

export default Sidebar
