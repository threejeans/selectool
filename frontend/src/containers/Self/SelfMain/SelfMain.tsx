import Modal from 'components/Modal'
import { FilterSection } from 'containers/commons'
import React from 'react'

const SelfMain = () => {
  const contents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']

  return (
    <div>
      <FilterSection
        isFilterButton
        filterTypes={contents}
        placeholder={'툴 이름을 입력해주세요'}
      />
    </div>
  )
}

export default SelfMain
