import { BiMinus, BiPlus } from 'react-icons/bi'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'

type SectionPlusBtnProps = {
  idx: number
  max: number
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const SectionPlusBtn = ({ idx, max, value, setValue }: SectionPlusBtnProps) => {
  const isLast = idx == value - 1
  const onlyOnce = value == 1
  const fullSection = value == max
  return (
    <>
      {isLast && (
        <span className={styles.sectionBtnGroup}>
          {!fullSection && (
            <BiPlus
              className={styles.sectionPlus}
              onClick={() => {
                if (value < 4) setValue(value + 1)
              }}
            />
          )}
          {!onlyOnce && (
            <BiMinus
              className={styles.sectionMinus}
              onClick={() => {
                if (value > 0) setValue(value - 1)
              }}
            />
          )}
        </span>
      )}
    </>
  )
}

export default SectionPlusBtn
