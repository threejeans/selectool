import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { MdOutlineUpload, MdSave } from 'react-icons/md'

import styles from 'styles/admin/components/Bulk.module.css'
import { toast } from 'react-toastify'
import { BulkToolType, ToolType } from 'types/types'
import { useAppDispatch } from 'app/hooks'
import { createTool } from 'features/admin/contents/adminContentsSlice'

const BulkUpload = () => {
  const dispatch = useAppDispatch()
  const [tmpToolBulk, setTmpToolBulk] = useState<ToolType[]>([])
  const fileInputInfo = useRef<HTMLInputElement | null>(null)

  const handleUpload: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0]
    if (!file) return
    fileRead(file)
  }

  const fileRead = (file: File) => {
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
    const bulk: ToolType[] = []
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
      bulk.push(tmp)
    }
    setTmpToolBulk(bulk)
    toast('🙆🏻‍♀️ 파일이 준비되었습니다.')
    toast('파일을 변경하시려면 드래그 앤 드랍으로 파일을 재업로드 하세요.', {
      delay: 400,
    })
  }
  const handleSave = () => {
    const cnt = tmpToolBulk.length
    tmpToolBulk.map(i => {
      dispatch(createTool(i)).then(() => {
        toast(`${cnt}개 중 ${i}번째 항목 등록완료.`)
      })
    })
  }
  //
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    const file = Array.from(event.dataTransfer?.files)[0]
    if (!file) return
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (extension !== 'xlsx' && extension !== 'xls') {
      toast('🙅🏻‍♂️ .xls, .xlsx 파일이 아닙니다.')
      toast('올바른 확장자로 올려주세요.', { delay: 200 })
      return
    }
    fileRead(file)
  }
  useEffect(() => {
    toast('👇🏼 버튼을 누르거나')
    toast('🕹️ 드래그 앤 드랍', { delay: 200 })
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {`혼자써요 Tool ${
          tmpToolBulk.length > 0 ? '서버에 저장하기' : ' 엑셀 파일 올리기'
        }`}
      </div>
      <input
        type='file'
        ref={fileInputInfo}
        accept={'.xls, .xlsx'}
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <div
        className={
          isDragOver ? `${styles.section} ${styles.dragOver}` : styles.section
        }
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
      >
        {tmpToolBulk.length > 0 ? (
          <button className={styles.uploadButton} onClick={handleSave}>
            <MdSave />
          </button>
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
