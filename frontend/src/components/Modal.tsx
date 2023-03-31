import React from 'react'
import { IoMdClose } from 'react-icons/io'
import styles from 'styles/components/Modal.module.css'

type ModelProps = {
  isModal: boolean
  setIsModal: () => void
  children: React.ReactNode
}

const Modal = ({ isModal, setIsModal, children, ...rest }: ModelProps) => {
  return (
    <>
      {isModal ? (
        <div className={styles.container}>
          <div className={styles.background} onClick={setIsModal} />
          <div className={styles.block} {...rest}>
            <button className={styles.close} onClick={setIsModal}>
              <IoMdClose />
            </button>
            <div className={styles.contents}>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
