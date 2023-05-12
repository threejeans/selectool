import { useState } from 'react'

import { MdOutlineUpload } from 'react-icons/md'

import AdminModal from './AdminModal'
import BulkUpload from './bulk/BulkUpload'

import styles from 'styles/admin/components/Bulk.module.css'

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
