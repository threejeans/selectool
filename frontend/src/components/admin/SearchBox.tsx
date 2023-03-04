import { useAppDispatch } from 'app/hooks'
import Spinner from 'components/Spinner'
import { searchTool } from 'features/admin/contents/adminContentsSlice'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import styles from 'styles/admin/pages/contents/AdminSelfMain.module.css'
import { ToolType } from 'types/dataTypes'

type SearchBoxProps = {
  title: string
  placeholder: string
  required: boolean
  idx: number
  datas: ToolType[]
  setDatas: React.Dispatch<React.SetStateAction<ToolType[]>>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  sites: string[]
  setSites: React.Dispatch<React.SetStateAction<string[]>>
}
const SearchInputBox = ({
  title,
  placeholder,
  required,
  idx,
  datas,
  setDatas,
  images,
  setImages,
  sites,
  setSites,
}: SearchBoxProps) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [isDrop, setIsDrop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [itemList, setItemList] = useState<ToolType[]>([])

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      if (value && isLoading) {
        resetData()
        dispatch(searchTool(value)).then(data => {
          setIsDrop(true)
          setIsLoading(false)
          if (data.meta.requestStatus === 'fulfilled') {
            setItemList(data.payload)
            if (data.payload.length === 0) setIsDrop(false)
          }
        })
      } else {
        setIsDrop(false)
      }
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  const resetData = () => {
    const tmp: ToolType = {
      nameKr: '',
      nameEn: '',
      info: '',
      msg: '',
      topic: '',
      categories: [],
      country: '',
      image: '',
      url: '',
      toolFunctions: [],
      clients: [],
      plans: [],
      aos: '',
      ios: '',
    }
    datas[idx] = tmp
    setDatas([...datas])
    images[idx] = tmp.image
    setImages([...images])
    sites[idx] = tmp.url
    setSites([...sites])
  }
  const handleData = (index: number) => {
    const item = itemList[index]
    console.log(item)
    setValue(item.nameKr)
    datas[idx] = item
    setDatas([...datas])
    images[idx] = item.image
    setImages([...images])
    sites[idx] = item.url
    setSites([...sites])
    setIsDrop(false)
    setDisabled(true)
  }

  return (
    <div className={styles.searchBox}>
      <h5 className={styles.label}>
        {title}
        {required && <span className={styles.required}>{'*'}</span>}
      </h5>
      <div className={styles.searchBox}>
        <input
          className={styles.input}
          type='text'
          placeholder={placeholder}
          value={value || ''}
          onChange={e => {
            setValue(e.target.value)
          }}
          onBlur={() => {
            setTimeout(() => setIsDrop(false), 500)
          }}
          disabled={disabled}
        />
        {disabled && (
          <button
            className={styles.resetBtn}
            onClick={() => {
              resetData()
              setDisabled(false)
            }}
          >
            <IoMdClose />
          </button>
        )}
      </div>
      <div className={isDrop ? styles.drop : styles.none}>
        {itemList.map((item, index) => {
          return (
            <button
              key={index}
              className={styles.item}
              onClick={() => {
                console.log(index)
                handleData(index)
              }}
            >
              {`${item.nameKr} / ${item.nameEn} / ${item.info}`}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SearchInputBox
