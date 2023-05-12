import React, { ChangeEventHandler, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { MdOutlineUpload } from 'react-icons/md'

import styles from 'styles/admin/components/Bulk.module.css'
import { toast } from 'react-toastify'

const BulkUpload = () => {
  const [isFile, setIsfile] = useState(false)
  const fileInputInfo = useRef<HTMLInputElement | null>(null)

  const handleUpload: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      if (!e.target) return
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const result = XLSX.read(data, { type: 'array' })
      const sheetName = result.SheetNames[0]
      const worksheet = result.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)
      console.log(jsonData)
      toast('콘솔로 찍혀요..')
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{'BulkUpload'}</div>
      <input
        type='file'
        ref={fileInputInfo}
        accept={'.xls, .xlsx'}
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <div className={styles.section}>
        {fileInputInfo?.current?.value ? (
          <></>
        ) : (
          <button
            className={styles.uploadButton}
            onClick={() => {
              toast('.xls, .xlsx 첨부할 수 있어요..')
              fileInputInfo.current?.click()
            }}
          >
            <MdOutlineUpload />
          </button>
        )}
      </div>
    </div>
  )
}

export default BulkUpload
