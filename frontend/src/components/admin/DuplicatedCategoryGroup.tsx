import React from 'react'
import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import AdminButton from './AdminButton'

type DuplicatedCategoryGroupProps = {
  title: string
  required: boolean
  list: string[]
  categories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
}

const DuplicatedCategoryGroup = ({
  title,
  required = false,
  list,
  categories,
  setCategories,
}: DuplicatedCategoryGroupProps) => {
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
              color={categories.includes(item) ? 'primary' : 'white'}
              size={'tag'}
              text={item}
              onClick={() => {
                if (categories.includes(item)) {
                  const tmp: string[] = []
                  categories.map(i => {
                    if (i !== item) tmp.push(i)
                  })
                  setCategories(tmp)
                } else {
                  categories.push(item)
                  setCategories([...categories])
                }
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DuplicatedCategoryGroup
