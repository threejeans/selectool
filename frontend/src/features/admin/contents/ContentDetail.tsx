import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { TYPE_GUIDE, TYPE_SELF, TYPE_WITH } from 'types/types'
import {
  getContent,
  resetCurrent,
  selectCurrentContent,
  selectCurrentType,
  selectIsModified,
} from './adminContentsSlice'

import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import SelfMain from 'components/detail/SelfMain'
import SelfCore from 'components/detail/SelfCore'
import SelfClients from 'components/detail/SelfClients'
import SelfPlans from 'components/detail/SelfPlans'

type ContentDetailProps = {
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
  id: number
}

const ContentDetail = ({ type, id }: ContentDetailProps) => {
  const content = useAppSelector(selectCurrentContent)
  const currType = useAppSelector(selectCurrentType)
  const isModified = useAppSelector(selectIsModified)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getContent({ type, id }))
      .then(data => console.log(data))
      .catch(error => console.error(error))
    return () => {
      dispatch(resetCurrent())
    }
  }, [])

  useEffect(() => {
    if (!isModified) console.log(content)
  }, [isModified])

  const sectionType = () => {
    switch (currType) {
      case 'self':
        return (
          <>
            <SelfMain />
            <SelfCore />
            <SelfClients />
            <SelfPlans />
          </>
        )
      case 'with':
        return <></>
      case 'guide':
        return <></>
      default:
        return null
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>{sectionType()}</div>
    </div>
  )
}

export default ContentDetail
