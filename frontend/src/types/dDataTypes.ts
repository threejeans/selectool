// 공통 type 지정

export {}

export type CategoryType = {
  name: string
}
export type ToolFuncType = {
  name: string
  content: string
}
export type ClientType = {
  id: number
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
