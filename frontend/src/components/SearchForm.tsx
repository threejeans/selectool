import React, { FormEvent, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Input from './Input'
import styles from '../styles/components/SearchForm.module.css'

export type InputProps = {
  placeholder?: string
}

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

const SearchForm = ({ placeholder = 'placeholder' }: InputProps) => {
  const [searchContent, setSearchContent] = useState<string>('')

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Input
        name={'search'}
        isOption={true}
        type='search'
        placeholder={placeholder}
        value={searchContent}
        onChange={ev => setSearchContent(ev.target.value)}
      />
      <button type='submit' className={styles.button}>
        <FiSearch />
      </button>
    </form>
  )
}

export default SearchForm
