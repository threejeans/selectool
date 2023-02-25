import { SelfMainInfo } from 'types/DataTypes'

// api 대신 임시 더미 데이터 불러옴
export const getSelfMainInfoAPI = async () => {
  let selfMainInfoList: SelfMainInfo[] = []

  await fetch('/data/selfMainInfo.json')
    .then((res) => res.json())
    .then((res) => {
      selfMainInfoList = res.selfMainInfoList
      console.log(selfMainInfoList)
    })
    .catch(err => {console.log(err)})

  return selfMainInfoList

}