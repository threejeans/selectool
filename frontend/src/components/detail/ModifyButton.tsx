import React from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectIsModified,
  startModify,
  stopModify,
} from 'features/admin/contents/adminContentsSlice'

import { RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri'
import styles from 'styles/admin/pages/contents/ContentDetail.module.css'
import AdminButton from 'components/admin/AdminButton'

type ModifyButtonProps = {
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const ModifyButton = ({ value, setValue }: ModifyButtonProps) => {
  const isModified = useAppSelector(selectIsModified)
  const dispatch = useAppDispatch()
  const handleSwitch = () => {
    setValue(!value)
    if (isModified) dispatch(stopModify())
    else dispatch(startModify())
  }
  return (
    <span className={styles.modify} onClick={handleSwitch}>
      {value ? (
        <>
          <RiEditBoxFill />
          <AdminButton
            color={'primary'}
            size={'tag'}
            text={'편집완료'}
            onClick={undefined}
          />
        </>
      ) : (
        <RiEditBoxLine />
      )}
    </span>
  )
}

export default ModifyButton
