import Chip from 'components/Chip'
import React, { useState } from 'react'
import { filterProps } from '../FilterSection/FilterSection'
import styles from './FilterGrid.module.css'

const FilterGrid = ({ items = [] }: filterProps) => {
  return (
    <div className={styles.layout}>
      {items.map((item, idx) => (
        <Chip key={idx} isSelected={item.isSelected} content={item.content} />
      ))}
    </div>
  )
}

export default FilterGrid
