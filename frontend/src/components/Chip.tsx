import styles from 'styles/components/Chip.module.css'

export type ChipProps = {
  type: string
  clickEvent: () => void
  isSelected: boolean
  content: string
  isMobile?: boolean
}

// type
// 메인 콘텐츠에 있는 chip => basic
// modal 안에 있는 chip => modalBasic, modalIcon(체크 표시 있는 것)
const Chip = ({
  type,
  clickEvent,
  isMobile = false,
  isSelected = false,
  content,
}: ChipProps) => {
  const handleChip = () => {
    clickEvent()
  }

  const chipStyleHandler = (type: string) => {
    let chipStyle
    switch (type) {
      case 'basic':
        chipStyle = isSelected ? styles.basicChecked : styles.basic
        return chipStyle
      case 'modalBasic':
        chipStyle = isSelected ? styles.modalBasicChecked : styles.modalBasic
        return chipStyle
      case 'modalIcon':
        chipStyle = isSelected ? styles.modalIconChecked : styles.modalIcon
        return chipStyle
    }
  }

  return (
    <div
      className={`${chipStyleHandler(type)} ${
        isMobile ? styles.chipMobile : ''
      }`}
      onClick={handleChip}
    >
      {content}
    </div>
  )
}

export default Chip
