// 유저 정보 type
export type UserInfoType = {
  email: string
  id: number
  image: string
  name: string
  subscribeEmail?: string
  emailVerified: boolean
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
  status: boolean | null
}

export type IsBookmarkedType = {
  id: number
  isBookmarked: boolean
}

export type SubscribeType = {
  id: number
  subscribeEmail: string
  createdAt: Date
  email: string
  emailVerified: boolean
  subscribeActive: boolean
  tools: [
    {
      categories: [
        {
          name: string
        },
      ]
      country: string
      id: number
      image: string
      info: string
      isBookmarked: boolean
      msg: string
      nameEn: string
      nameKr: string
      topic: string
      trial: boolean
      url: string
    },
  ]
  type: string
}
