import React, { useState } from 'react'
import styles from 'styles/components/Chip.module.css'

export type ChipProps = {
  isSelected: boolean
  content: string
}

const Chip = ({ isSelected = false, content }: ChipProps) => {
  const [selected, setSelected] = useState(isSelected)

  const handleChip = () => {
    setSelected(!selected)
  }

  return (
    <span
      className={selected ? styles.selectedContainer : styles.container}
      onClick={handleChip}
    >
      {content}
    </span>
  )
}

export default Chip
