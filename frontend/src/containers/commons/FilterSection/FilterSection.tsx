import { ChipProps } from 'components/Chip'
import SearchForm from 'components/SearchForm'
import React, { useState } from 'react'
import FilterGrid from '../FilterGrid'
import styles from './FilterSection.module.css'
import filterIcon from 'assets/filter_icon.svg'
import filterIconSelected from 'assets/filter_icon_selected.svg'
import Modal from 'components/Modal'

export type filterProps = {
  isFilterButton?: boolean
  items: Array<ChipProps>
  placeholder?: string
}

const isFilterButtonSelected = false

const modalController = () => {
  console.log('야호')
}

const FilterSection = ({
  isFilterButton = false,
  items = [],
  placeholder,
}: filterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <FilterGrid items={items}></FilterGrid>
      <Modal isModal={isModalOpen} setIsModal={modalController}>
        <div></div>
      </Modal>
      <div className={styles.rightSection}>
        {isFilterButton ? (
          <button
            className={
              isFilterButtonSelected ? styles.buttonSelected : styles.button
            }
            onClick={() => setIsModalOpen(true)}
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

const modal = () => <div></div>

export default FilterSection
