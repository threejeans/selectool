import { useAppDispatch } from 'app/hooks'
import GuideControl from 'containers/Guide/GuideControl'
import GuideListResult from 'containers/Guide/GuideListResult'
import GuideNotice from 'containers/Guide/GuideNotice'
import { useEffect } from 'react'
import { getGuideList, setRandomList } from 'reducers/guideReducer'
import styles from 'styles/pages/commons/Content.module.css'

const Guide = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getGuideList()).then(() => {
      dispatch(setRandomList())
    })
  }, [])
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <GuideNotice />
        <GuideControl />
        <GuideListResult />
      </div>
    </div>
  )
}

export default Guide
