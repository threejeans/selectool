import React, { useEffect, useState } from 'react'

import styles from 'styles/admin/components/SearchBox.module.css'

type SearchBoxProps = {
  value?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  idx?: number
  values?: string[]
  setValues?: React.Dispatch<React.SetStateAction<string[]>>
}
const SearchBox = ({
  value,
  setValue,
  idx,
  values = [],
  setValues,
}: SearchBoxProps) => {
  const searchKey = idx ? values[idx] : value
  console.log(searchKey)

  useEffect(() => {
    console.log(idx)
    console.log(searchKey)
    console.log(idx ? values[idx] : value)
  }, [searchKey, value, values[idx || 0]])

  return (
    <div className={styles.container}>
      <div className={styles.item}>{'검색된 목록 map 출력'}</div>
      <div className={styles.item}>{'검색된 목록 map 출력'}</div>
      <div className={styles.item}>{'검색된 목록 map 출력'}</div>
    </div>
  )
}

export default SearchBox
