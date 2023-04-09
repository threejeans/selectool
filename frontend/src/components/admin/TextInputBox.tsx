import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'

type TextInputBoxProps = {
  // 일반 입력, 배열 입력
  value?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  idx?: number
  values?: string[]
  setValues?: React.Dispatch<React.SetStateAction<string[]>>
  jdx?: number
  walues?: string[][]
  setWalues?: React.Dispatch<React.SetStateAction<string[][]>>
  // input 요소
  focusRef?: React.MutableRefObject<HTMLInputElement | null>
  focusesRef?: React.MutableRefObject<HTMLInputElement[] | null>
  focusesesRef?: React.MutableRefObject<HTMLInputElement[][] | null>
  title: string
  placeholder: string
  required: boolean
  disabled?: boolean
  nonFocus?: boolean
}

const TextInputBox = ({
  value,
  setValue,
  idx = -1,
  values,
  setValues,
  jdx = -1,
  walues,
  setWalues,
  focusRef,
  focusesRef,
  focusesesRef, // ㅋㅋ 아..
  title,
  placeholder,
  required,
  disabled = false,
  nonFocus = false,
}: TextInputBoxProps) => {
  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value)
    }
  }
  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValues) {
      values![idx] = e.target.value
      setValues([...values!])
    }
  }
  const handleWalues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setWalues) {
      walues![idx][jdx] = e.target.value
      setWalues([...walues!])
    }
  }
  return (
    <div>
      <h5 className={styles.label}>
        {title}
        {required && <span className={styles.required}>{'*'}</span>}
      </h5>
      {focusRef && (
        <input
          value={value || ''}
          onChange={handleValue}
          ref={el => (focusRef.current = el as HTMLInputElement)}
          type='text'
          placeholder={placeholder}
          className={styles.input}
          disabled={disabled}
        />
      )}
      {focusesRef && idx !== -1 && (
        <input
          value={values![idx] || ''}
          onChange={handleValues}
          ref={el => (focusesRef.current![idx] = el as HTMLInputElement)}
          type='text'
          placeholder={placeholder}
          className={styles.input}
          disabled={disabled}
        />
      )}
      {focusesesRef && idx !== -1 && jdx !== -1 && (
        <input
          value={walues![idx][jdx] || ''}
          onChange={handleWalues}
          ref={el => (focusesesRef.current![idx][jdx] = el as HTMLInputElement)}
          type='text'
          placeholder={placeholder}
          className={styles.input}
          disabled={disabled}
        />
      )}
      {nonFocus && (
        <input
          value={values![idx] || ''}
          onChange={handleValues}
          type='text'
          placeholder={placeholder}
          className={styles.input}
          disabled={disabled}
        />
      )}
    </div>
  )
}

export default TextInputBox
