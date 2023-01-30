import React from 'react'
import styles from 'styles/admin/components/AdminButton.module.css'

type buttonProps = {
  color: string
  size: string
  text: string
}

const colorHandler = (color: string) => {
  switch (color) {
    case 'primary':
      return styles.primary
    case 'secondary':
      return styles.secondary
    case 'white':
      return styles.white
  }
}

const sizeHandler = (size: string) => {
  switch (size) {
    case 'sm':
      return styles.sm
    case 'md':
      return styles.md
    // case 'lg':
    //   return styles.lg
  }
}
const AdminButton = ({ color, size, text, ...rest }: buttonProps) => {
  return (
    <button
      className={`${styles.commonStyle} ${colorHandler(color)} ${sizeHandler(
        size,
      )}`}
      {...rest}
    >
      {text}
    </button>
  )
}

export default AdminButton
