import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'

type TextInputBoxProps = {
  textRef: any
  title: string
  placeholder: string
  required: boolean
}

const TextInputBox = ({
  textRef,
  title,
  placeholder,
  required,
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
      />
    </div>
  )
}

export default TextInputBox
