import React, { FormEvent, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Input from './Input'
import styles from '../styles/components/SearchForm.module.css'
import { useAppDispatch } from 'app/hooks'
import { setSearchValue } from 'reducers/commonReducer'

export type InputProps = {
  placeholder?: string
  submitEvent: () => void
}

const SearchForm = ({
  placeholder = 'placeholder',
  submitEvent,
}: InputProps) => {
  const [searchContent, setSearchContent] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSearchValue(searchContent))
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitEvent()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Input
        name={'search'}
        isOption={true}
        type='search'
        placeholder={placeholder}
        value={searchContent}
        onChange={ev => {
          setSearchContent(ev.target.value)
        }}
      />
      <button type='submit' className={styles.button}>
        <FiSearch />
      </button>
    </form>
  )
}

export default SearchForm
