import { useAppDispatch } from 'app/hooks'
import { DetailContentCard, DetailMainCard } from 'containers/Common'
import { getContent } from 'features/admin/contents/adminContentsSlice'
import { useEffect, useState } from 'react'
import { TypeId } from 'types/types'

import selfStyles from 'containers/Self/SelfDetailMain/SelfDetailMain.module.css'

const ContentDetail = ({ type, id }: TypeId) => {
  const dispatch = useAppDispatch()

  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    dispatch(getContent({ type, id })).then(data => {
      console.log(data.payload)
      setData(data.payload)
    })
  }, [])
  if (type === 'self')
    return (
      <div className={selfStyles.rightSection}>
        <DetailContentCard title='핵심기능' description='* 공식 홈페이지 기준'>
          <div className={selfStyles.toolFunctionsLayout}></div>
        </DetailContentCard>
      </div>
    )
  else
    return (
      <div>
        <div>{`${JSON.stringify(data)}` || ''}</div>
      </div>
    )
}

export default ContentDetail
