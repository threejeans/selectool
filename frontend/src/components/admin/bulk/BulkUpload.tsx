import React, { ChangeEventHandler, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { MdOutlineUpload } from 'react-icons/md'

import styles from 'styles/admin/components/Bulk.module.css'
import { toast } from 'react-toastify'
import { BulkToolType, ToolType } from 'types/types'
import { useAppDispatch } from 'app/hooks'
import { createTool } from 'features/admin/contents/adminContentsSlice'

const BulkUpload = () => {
  const dispatch = useAppDispatch()
  const fileInputInfo = useRef<HTMLInputElement | null>(null)

  const handleUpload: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    console.log(reader)
    reader.onload = e => {
      if (!e.target) return
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const result = XLSX.read(data, { type: 'array' })
      const sheetName = result.SheetNames[0]
      const worksheet = result.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as BulkToolType[]
      console.log(jsonData)
      createToolBulk(jsonData)
    }
    reader.readAsArrayBuffer(file)
  }

  const createToolBulk = (json: BulkToolType[]) => {
    const cnt = json.length
    for (let i = 0; i < cnt; i++) {
      const { categories, toolFunctions, clients, plans } = json[i]

      const tmpCategories = categories.split(',')
      const tmpToolFunctions = toolFunctions.split(',')
      const tmpClients = clients.split(',')
      const tmpPlans = plans.split(',')

      const tmp: ToolType = {
        nameKr: json[i].nameKr.replace(/\b/g, ' '),
        nameEn: json[i].nameEn.replace(/\b/g, ' '),
        info: json[i].info.replace(/\b/g, ' '),
        msg: json[i].msg.replace(/\b/g, ' '),
        topic: json[i].topic.replace(/\b/g, ' '),
        categories: tmpCategories.map(i => ({ name: i.replace(/\b/g, ' ') })),
        country: json[i].country.replace(/\b/g, ' '),
        image: json[i].image,
        url: json[i].url,
        toolFunctions: tmpToolFunctions.map(i => {
          const t = i.split('&&')
          return {
            name: t[0].replace(/\b/g, ' '),
            content: t[1].replace(/\b/g, ' '),
          }
        }),
        clients: tmpClients.map(i => {
          const t = i.split('&&')
          return {
            id: '',
            name: t[0].replace(/\b/g, ' '),
            image: t[1],
            url: t[2],
          }
        }),
        trial: json[i].trial,
        plans: tmpPlans.map(i => {
          const t = i.split('&&')
          return {
            title: t[0].replace(/\b/g, ' '),
            volume: t[1].replace(/\b/g, ' '),
            cost: t[2].replace(/\b/g, ' '),
            planFunctions: t[3]
              .replace(/\b/g, ' ')
              .replace(/{|}/g, '')
              .split('$$')
              .map(i => {
                return { func: i }
              }),
          }
        }),
        aos: json[i].aos,
        ios: json[i].ios,
      }
      console.log(tmp)
      continue
      dispatch(createTool(tmp)).then(() => {
        toast(`${cnt}개 중 ${i}번째 항목 등록완료.`)
      })
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
