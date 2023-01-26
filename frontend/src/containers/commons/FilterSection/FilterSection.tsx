import { ChipProps } from 'components/Chip'
import SearchForm from 'components/SearchForm'
import React from 'react'
import FilterGrid from '../FilterGrid'
import styles from './FilterSection.module.css'
import filterIcon from 'assets/filter_icon.svg'
import filterIconSelected from 'assets/filter_icon_selected.svg'

export type filterProps = {
  isFilterButton?: boolean
  items: Array<ChipProps>
  placeholder?: string
}

const FilterSection = ({
  isFilterButton = false,
  items = [],
  placeholder,
}: filterProps) => {
  return (
    <div className={styles.layout}>
      <FilterGrid items={items}></FilterGrid>
      <div className={styles.rightSection}>
        {isFilterButton ? (
          <button className={styles.button}>
            <img />
          </button>
        ) : null}
        <SearchForm placeholder={placeholder} />
      </div>
    </div>
  )
}

export default FilterSection
