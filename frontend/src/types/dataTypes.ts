// 공통 type 지정

export type TYPE_SELF = 'self'
export type TYPE_WITH = 'with'
export type TYPE_GUIDE = 'guide'

// tool, 혼자써요 필요 type
export type CategoryType = {
  name: string
}
export type ToolFuncType = {
  name: string
  content: string
}
export type ClientType = {
  id: number | ''
  name: string
  image: string
  url: string
}
export type PlanFunctionType = {
  func: string
}
export type PlanType = {
  title: string
  volume: string
  cost: string
  planFunctions: PlanFunctionType[]
}
export type TmpToolMainType = {
  // main
  nameKr: string
  nameEn: string
  info: string
  msg: string
  topic: string
  categories: CategoryType[]
  country: string
  image: string
}
export type TmpToolSpecificType = {
  // specific
  url: string
  toolFunctions: ToolFuncType[]
  clients: ClientType[]
  plans: PlanType[]
  aos: string
  ios: string
}
// create 시 필요한 모든 데이터
export type ToolType = {
  // main
  nameKr: string
  nameEn: string
  info: string
  msg: string
  topic: string
  categories: CategoryType[]
  country: string
  image: string
  // specific
  url: string
  toolFunctions: ToolFuncType[]
  clients: ClientType[]
  plans: PlanType[]
  aos: string
  ios: string
}

// 가이드

export type GuideType = {
  title: string
  date?: Date
  content: string
  source: string
  toolName: string
  func: string
  categories: CategoryType[]
  url: string
  image: string
  toolImage: string
}

// read
export type TypeId = {
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
  id?: number
}
