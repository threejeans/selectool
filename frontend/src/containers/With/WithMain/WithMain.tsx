import { FilterSection } from 'containers/commons'
import React from 'react'

const WithMain = () => {
  const contents = [
    '금융',
    '커뮤니티',
    '모빌리티',
    '여행/레저',
    '커머스',
    'Other',
  ]
  const filterData = [...new Array(contents.length)].map(
    (data, idx) => (data = { isSelected: false, content: contents[idx] }),
  )

  return (
    <div>
      <FilterSection items={filterData} placeholder={'기업명을 입력해주세요'} />
    </div>
  )
}

export default WithMain
