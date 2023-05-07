import { useState } from 'react'

import { MdOutlineUpload } from 'react-icons/md'

import styles from 'styles/admin/components/BulkButton.module.css'
import AdminModal from './AdminModal'
import BulkUpload from './bulk/BulkUpload'

const BulkButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        className={`${styles.button} ${isOpen ? styles.none : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MdOutlineUpload />
        <p>{'BULK'}</p>
      </button>
      <AdminModal
        isModal={isOpen}
        setIsModal={() => setIsOpen(false)}
        outer={true}
      >
        <BulkUpload />
      </AdminModal>
    </>
  )
}

export default BulkButton
