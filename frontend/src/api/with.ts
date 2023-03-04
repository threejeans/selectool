import { WithMainInfo } from 'types/dataTypes'

// api 대신 임시 더미 데이터 불러옴
export const getWithMainInfoAPI = async () => {
  let withMainInfoList: WithMainInfo[] = []

  await fetch('/data/withMainInfo.json')
    .then(res => res.json())
    .then(res => {
      withMainInfoList = res.withMainInfoList
    })
    .catch(err => {
      console.log(err)
    })

  return withMainInfoList
}
