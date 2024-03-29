import React from 'react'
import styles from 'styles/admin/components/AdminButton.module.css'

type buttonProps = {
  color: string
  size: string
  text: string
  onClick: any
  disabled?: boolean
}

const colorHandler = (color: string) => {
  switch (color) {
    case 'primary':
      return styles.primary
    case 'primaryVariant':
      return styles.primaryVariant
    case 'secondary':
      return styles.secondary
    case 'white':
      return styles.white
    case 'next':
      return styles.next
  }
}

const sizeHandler = (size: string) => {
  switch (size) {
    case 'tag':
      return styles.tag
    case 'sm':
      return styles.sm
    case 'md':
      return styles.md
    case 'lg':
      return styles.lg
    case 'lgTab':
      return styles.lgTab
  }
}
const AdminButton = ({
  color,
  size,
  text,
  onClick,
  disabled = false,
  ...rest
}: buttonProps) => {
  return (
    <button
      className={`${styles.commonStyle} ${colorHandler(color)} ${sizeHandler(
        size,
      )}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  )
}

export default AdminButton
