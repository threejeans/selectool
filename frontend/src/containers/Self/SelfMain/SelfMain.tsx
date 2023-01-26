import { FilterSection } from 'containers/commons'
import React from 'react'

const SelfMain = () => {
  const contents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']
  const filterData = [...new Array(contents.length)].map(
    (data, idx) => (data = { isSelected: false, content: contents[idx] }),
  )

  return (
    <div>
      <FilterSection
        isFilterButton
        items={filterData}
        placeholder={'툴 이름을 입력해주세요'}
      />
    </div>
  )
}

export default SelfMain
