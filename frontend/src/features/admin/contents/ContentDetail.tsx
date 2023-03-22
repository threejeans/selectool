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

import SelfInfo from 'components/admin/detail/SelfInfo'
import SelfCore from 'components/admin/detail/SelfCore'
import SelfClients from 'components/admin/detail/SelfClients'
import SelfPlans from 'components/admin/detail/SelfPlans'

import WithInfo from 'components/admin/detail/WithInfo'
import WithBranches from 'components/admin/detail/WithBranches'
import WithCultures from 'components/admin/detail/WithCultures'
import WithTools from 'components/admin/detail/WithTools'

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
            <SelfInfo />
            <SelfCore />
            <SelfClients />
            <SelfPlans />
          </>
        )
      case 'with':
        return (
          <>
            <WithInfo />
            <WithBranches />
            <WithCultures />
            <WithTools />
          </>
        )
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
