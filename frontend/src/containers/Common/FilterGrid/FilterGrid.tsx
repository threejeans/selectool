import Chip from 'components/Chip'
import React, { useState } from 'react'
import { filterDataProps } from '../FilterSection/FilterSection'
import styles from './FilterGrid.module.css'

const FilterGrid = ({ items = [] }: filterDataProps) => {
  return (
    <div className={styles.layout}>
      {items.map((item, idx) => (
        <Chip
          key={idx}
          type={item.type}
          isSelected={item.isSelected}
          content={item.content}
        />
      ))}
    </div>
  )
}

export default FilterGrid
