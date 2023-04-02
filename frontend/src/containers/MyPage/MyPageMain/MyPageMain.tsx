import React from 'react'
import { Sidebar } from '../CommonComponent'
import styles from './MyPageMain.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectContent, setSelectContent } from 'reducers/settingReducer'
import {
  GuideScrapContent,
  SelfScrapContent,
  SettingComponent,
  WithScrapContent,
} from '../ContentComponent'

const MyPageMain = () => {
  const content = useAppSelector(selectContent)

  return (
    <div className={styles.layout}>
      <Sidebar />
      {(() => {
        switch (content) {
          case '혼자써요':
            return <SelfScrapContent />
          case '함께써요':
            return <WithScrapContent />
          case '가이드':
            return <GuideScrapContent />
          default:
            return <SettingComponent />
        }
      })()}
    </div>
  )
}

export default MyPageMain
