import { ChipProps } from 'components/Chip'
import SearchForm from 'components/SearchForm'
import React from 'react'
import FilterGrid from '../FilterGrid'
import styles from './FilterSection.module.css'
import filterIcon from 'assets/filter_icon.svg'
import filterIconSelected from 'assets/filter_icon_selected.svg'
import { useAppDispatch } from 'app/hooks'
import { changeFilterModalStatus } from 'reducers/selfReducer'
import SelfFilterModal from 'containers/Self/SelfFilterModal/SelfFilterModal'

export type filterProps = {
  isFilterButton?: boolean
  filterTypes: Array<string>
  placeholder?: string
}

export type filterDataProps = {
  items: Array<ChipProps>
}

const isFilterButtonSelected = false

const FilterSection = ({
  isFilterButton = false,
  filterTypes = [],
  placeholder,
}: filterProps) => {
  const dispatcth = useAppDispatch()
  const openModal = () => {
    dispatcth(changeFilterModalStatus())
  }

  const items = [...new Array(filterTypes.length)].map(
    (data, idx) =>
      (data = { type: 'basic', isSelected: false, content: filterTypes[idx] }),
  )

  return (
    <div className={styles.layout}>
      <SelfFilterModal />
      <FilterGrid items={items}></FilterGrid>
      <div className={styles.rightSection}>
        {isFilterButton ? (
          <button
            className={
              isFilterButtonSelected ? styles.buttonSelected : styles.button
            }
            onClick={openModal}
          >
            <img
              src={isFilterButtonSelected ? filterIconSelected : filterIcon}
              alt=''
              className={styles.iconImage}
            />
          </button>
        ) : null}
        <SearchForm placeholder={placeholder} />
      </div>
    </div>
  )
}

export default FilterSection
