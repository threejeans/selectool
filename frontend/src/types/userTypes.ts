// 유저 정보 type
export type UserInfoType = {
  email: string
  id: number
  image: string
  name: string
  subscribeEmail?: string
  subscribeActive?: boolean
  type: string
}

export type DemandType = {
  id: number
  type: string
  content: string
  userType: string
  userEmail: string
  createdAt: Date
  status: boolean
}
