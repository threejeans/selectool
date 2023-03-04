import { useAppDispatch } from 'app/hooks'
import Spinner from 'components/Spinner'
import { searchClient } from 'features/admin/contents/adminContentsSlice'
import React, { useEffect, useState } from 'react'
import styles from 'styles/admin/pages/contents/AdminSelfSpecific.module.css'
import { ClientType } from 'types/types'

type SearchClientProp = {
  idx: number
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  names: string[]
  setNames: React.Dispatch<React.SetStateAction<string[]>>
  sites: string[]
  setSites: React.Dispatch<React.SetStateAction<string[]>>
  clients: ClientType[]
  setClients: React.Dispatch<React.SetStateAction<ClientType[]>>
}

const SearchClient = ({
  idx,
  images,
  setImages,
  names,
  setNames,
  sites,
  setSites,
  clients,
  setClients,
}: SearchClientProp) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [isDrop, setIsDrop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [itemList, setItemList] = useState<ClientType[]>([])

  const handleItem = (item: ClientType) => {
    images[idx] = item.image
    setImages([...images])
    names[idx] = item.name
    setNames([...names])
    sites[idx] = item.url
    setSites([...sites])
    resetData()
  }

  const resetData = () => {
    setSearch('')
    setIsDrop(false)
    setIsLoading(false)
    setItemList([])
  }

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      if (search && isLoading) {
        resetData()
        dispatch(searchClient(search))
          .then(data => {
            setIsDrop(true)
            setIsLoading(false)
            if (data.meta.requestStatus === 'fulfilled') {
              setItemList(data.payload)
              if (data.payload.length === 0) setIsDrop(false)
            }
          })
          .catch(() => {
            setIsDrop(false)
            setIsLoading(false)
          })
      } else {
        setIsDrop(false)
      }
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [search])

  return (
    <div className={styles.searchContainer}>
      <h5 className={styles.label}>주요 고객사 이미지 {idx + 1}</h5>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={'연동할 기업 이름을 입력해주세요.'}
        />
        <div className={isDrop ? styles.drop : styles.invisible}>
          {itemList.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  handleItem(item)
                }}
              >
                {item.name}
              </button>
            )
          })}
          {!isLoading && (
            <div className={styles.loadingSpinner}>
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchClient
