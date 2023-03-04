import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'

type TextInputBoxProps = {
  textRef?: any
  title: string
  placeholder: string
  required: boolean
  idx?: number
  value?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  values?: string[]
  setValues?: React.Dispatch<React.SetStateAction<string[]>>
  disabled?: boolean
}

const TextInputBox = ({
  textRef,
  title,
  placeholder,
  required,
  idx,
  value,
  setValue,
  values = [],
  setValues,
  disabled = false,
}: TextInputBoxProps) => {
  return (
    <div>
      <h5 className={styles.label}>
        {title}
        {required && <span className={styles.required}>{'*'}</span>}
      </h5>
      <input
        ref={textRef}
        className={styles.input}
        type='text'
        placeholder={placeholder}
        value={idx ? values[idx] : value}
        onChange={e => {
          if (idx) {
            values[idx] = e.target.value
            if (setValues) setValues([...values])
          } else {
            if (setValue) setValue(e.target.value)
          }
        }}
        disabled={disabled}
      />
    </div>
  )
}

export default TextInputBox
