import { FilterSection } from 'containers/Common'
import React from 'react'

const WithMain = () => {
  const filterTypes = [
    '금융',
    '커뮤니티',
    '모빌리티',
    '여행/레저',
    '커머스',
    'Other',
  ]

  return (
    <div>
      <FilterSection
        filterTypes={filterTypes}
        placeholder={'기업명을 입력해주세요'}
      />
    </div>
  )
}

export default WithMain
