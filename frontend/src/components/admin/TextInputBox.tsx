import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'

type TextInputBoxProps = {
  textRef?: any
  title: string
  placeholder: string
  required: boolean
  idx?: number
  values?: string[]
  setValues?: React.Dispatch<React.SetStateAction<string[]>>
  disabled?: boolean
}

const TextInputBox = ({
  textRef,
  title,
  placeholder,
  required,
  idx = -1,
  values,
  setValues,
  disabled = false,
}: TextInputBoxProps) => {
  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (values && setValues) {
      values[idx] = e.target.value
      setValues([...values])
    }
  }
  return (
    <div>
      <h5 className={styles.label}>
        {title}
        {required && <span className={styles.required}>{'*'}</span>}
      </h5>
      {textRef && (
        <input
          ref={textRef}
          className={styles.input}
          type='text'
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {values && (
        <input
          className={styles.input}
          type='text'
          placeholder={placeholder}
          value={values[idx] || ''}
          onChange={handleValues}
          disabled={disabled}
        />
      )}
    </div>
  )
}

export default TextInputBox
