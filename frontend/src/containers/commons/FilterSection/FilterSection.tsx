import SearchForm from 'components/SearchForm';
import React from 'react';
import styles from './FilterSection.module.css'

type FormProps = {
  placeholder: string;
}

const FilterSection = ({placeholder}: FormProps) => {
  return (
    <div className={ styles.layout }>
      <SearchForm placeholder={placeholder} />
    </div>
  );
};

export default FilterSection;