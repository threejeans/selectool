import { useAppDispatch } from 'app/hooks'
import { getContent } from 'features/admin/contents/adminContentsSlice'
import { useEffect, useState } from 'react'
import { TypeId } from 'types/dataTypes'

const ContentsDetail = ({ type, id }: TypeId) => {
  const dispatch = useAppDispatch()

  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    dispatch(getContent({ type, id })).then(data => {
      console.log(data.payload)
      setData(data.payload)
    })
  }, [])
  return (
    <div>
      <div>{`${JSON.stringify(data)}` || ''}</div>
    </div>
  )
}

export default ContentsDetail
