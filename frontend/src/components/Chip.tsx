import React, { useState } from 'react'
import styles from 'styles/components/Chip.module.css'

export type ChipProps = {
  type: string
  // clickEvent: () => void
  isSelected: boolean
  content: string
}

// type
// 메인 콘텐츠에 있는 chip => basic
// modal 안에 있는 chip => modalBasic, modalIcon(체크 표시 있는 것)
const Chip = ({
  type,
  // clickEvent,
  isSelected = false,
  content,
}: ChipProps) => {
  const [selected, setSelected] = useState(isSelected)

  const handleChip = () => {
    setSelected(!selected)
    // clickEvent
  }

  const chipStyleHandler = (type: string) => {
    let chipStyle
    switch (type) {
      case 'basic':
        chipStyle = selected ? styles.basicChecked : styles.basic
        return chipStyle
      case 'modalBasic':
        chipStyle = selected ? styles.modalBasicChecked : styles.modalBasic
        return chipStyle
      case 'modalIcon':
        chipStyle = selected ? styles.modalIconChecked : styles.modalIcon
        return chipStyle
    }
  }

  return (
    <div className={chipStyleHandler(type)} onClick={handleChip}>
      {content}
    </div>
  )
}

export default Chip
