import React from 'react'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import AdminButton from './AdminButton'

type CategoryGroupProps = {
  title: string
  required: boolean
  list: string[]
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoryGroup = ({
  title,
  required = false,
  list,
  category,
  setCategory,
}: CategoryGroupProps) => {
  return (
    <div>
      <h5 className={styles.label}>
        {title}
        {required && <span className={styles.required}>{'*'}</span>}
      </h5>
      <div className={styles.categoryGroup}>
        {list.map((item, index) => {
          return (
            <AdminButton
              key={index}
              color={category == item ? 'primary' : 'white'}
              size={'tag'}
              text={item}
              onClick={() => setCategory(item)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CategoryGroup
