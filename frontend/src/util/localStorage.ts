import {
  AdminGuideComponent,
  AdminSelfComponent,
  AdminWithComponent,
  TYPE_GUIDE,
  TYPE_SELF,
  TYPE_WITH,
} from 'types/types'

type StorageType = {
  key: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
  data?: any
}
export const setTmpStorage = ({ key, data }: StorageType) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getTmpStorage = ({ key }: StorageType) => {
  const result = localStorage.getItem(key)
  if (result) {
    switch (key) {
      case 'self':
        return JSON.parse(result) as AdminSelfComponent
      case 'with':
        return JSON.parse(result) as AdminWithComponent
      case 'guide':
        return JSON.parse(result) as AdminGuideComponent
    }
  } else return false
}

export const setStorageToken = (accessToken: string) => {
  localStorage.setItem('access-token', accessToken)
}

export const getStorageToken = () => {
  return localStorage.getItem('access-token') || false
}

export const removeTmpStorage = ({ key }: StorageType) => {
  localStorage.removeItem(key)
}
