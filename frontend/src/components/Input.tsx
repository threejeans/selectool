import React, { ChangeEvent, useState } from 'react'
import styles from 'styles/components/Input.module.css'

export type InputValue = string | number | ReadonlyArray<string>
export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>

interface Props {
  isOption?: boolean
  name: string
  label?: string
  type?: string
  value?: InputValue
  placeholder?: string
  onChange?: (ev: InputChangeEvent) => void
  onChangeForTextArea?: (ev: TextAreaChangeEvent) => void
}

// functional component part
const Input: React.FC<Props> = ({
  isOption = false,
  name,
  label,
  type = 'text',
  value = '',
  placeholder = 'placeholder',
  onChange,
  onChangeForTextArea,
}) => {
  const [inputValue, setInputValue] = useState<InputValue>(value)

  const changeHandler = (ev: InputChangeEvent) => {
    setInputValue(ev.target.value)
    onChange && onChange(ev)
  }

  const changeHandlerForTextArea = (ev: TextAreaChangeEvent) => {
    setInputValue(ev.target.value)
    onChangeForTextArea && onChangeForTextArea(ev)
  }

  return (
    <div className={styles.InputCover}>
      {label ? (
        <div className={styles.label}>
          <label htmlFor={label}>{label}</label>
          {isOption ? null : <span className={styles.labelOption}>*</span>}
        </div>
      ) : null}
      {type === 'textarea' ? (
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          name={name}
          id={label}
          placeholder={placeholder}
          value={value}
          onChange={changeHandlerForTextArea}
        />
      ) : (
        <input
          className={type === 'search' ? styles.search : styles.input}
          name={name}
          id={label}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      )}
    </div>
  )
}

// export part
export default Input
