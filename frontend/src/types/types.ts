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
  id?: number
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

export type SelfMainInfo = {
  id: number
  info: string
  nameKr: string
  nameEn: string
  topic: string
  msg: string
  categories: CategoryType[]
  country: string
  image: string
  isBookmarked: boolean
}

// 가이드

export type GuideType = {
  id?: number
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

// 함께써요
export type CultureType = {
  content: string
  title: string
}
export type BranchType = {
  image: string
  name: string
}
export type CorpType = {
  id?: number
  nameKr: string
  nameEn: string
  info: string
  teamNameKr: string
  teamNameEn: string
  categories: CategoryType[]
  image: string
  url: string
  content: string
  cultures: CultureType[]
  branches: BranchType[]
  tools: ToolType[]
  isBookmarked?: boolean
}

// read
export type TypeId = {
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
  id?: number
}

// with

export type WithToolType = {
  id: number
  image: string
  nameEn: string
  nameKr: string
  url: string
}

export type WithCorpType = {
  id?: number
  image: string
  info: string
  isBookmarked: boolean
  nameEn: string
  nameKr: string
  teamNameEn: string
  teamNameKr: string
  url: string
  content: string
  branches: BranchType[]
  categories: CategoryType[]
  cultures: CultureType[]
  tools: WithToolType[]
}

// 임시저장 타입..
export type AdminSelfComponent = {
  nameKr: string
  nameEn: string
  info: string
  msg: string
  topic: string
  categories: string[]
  country: string
  image: string
  url: string
  toolFunction: number
  toolFunctionNames: string[]
  toolFunctionContents: string[]
  mainClient: number
  mainClientImages: string[]
  mainClientNames: string[]
  mainClientSites: string[]
  mainClients: ClientType[]
  planTitles: string[]
  planVolumes: string[]
  planCosts: string[]
  planFunctions: string[][]
  costPlan: number
  planInfo: number[]
  aos: string
  ios: string
}
export type AdminWithComponent = {
  nameKr: string
  nameEn: string
  info: string
  teamNameKr: string
  teamNameEn: string
  categories: string[]
  image: string
  url: string
  content: string
  corpCulture: number
  cultureTitles: string[]
  cultureContents: string[]
  branch: number
  branchImages: string[]
  branchNames: string[]
  inCorpTool: number
  inCorpToolImages: string[]
  inCorpToolSites: string[]
  tools: ToolType[]
}

export type AdminGuideComponent = {
  title: string
  date: string
  content: string
  source: string
  toolName: string
  func: string
  categories: string[]
  categoryList: string[]
  url: string
  image: string
  toolImage: string
}
