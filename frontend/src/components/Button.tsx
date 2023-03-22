import React from 'react'
import styles from 'styles/components/Button.module.css'

type buttonProps = {
  color: string
  size: string
  text: string
  clickEvent: () => void
}

const colorHandler = (color: string) => {
  switch (color) {
    case 'primary':
      return styles.primary
    case 'secondary':
      return styles.secondary
    case 'outlined':
      return styles.outlined
  }
}

const sizeHandler = (size: string) => {
  switch (size) {
    case 'sm':
      return styles.sm
    case 'mdLong':
      return styles.mdLong
    case 'mdShort':
      return styles.mdShort
    case 'md':
      return styles.md
    case 'lg':
      return styles.lg
  }
}

const Button = ({ color, size, text, clickEvent }: buttonProps) => {
  return (
    <button
      className={`${styles.commonStyle} ${colorHandler(color)} ${sizeHandler(
        size,
      )}`}
      onClick={clickEvent}
    >
      {text}
    </button>
  )
}

export default Button
