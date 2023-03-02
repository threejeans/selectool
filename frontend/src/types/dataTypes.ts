// 공통 type 지정

export type SelfMainInfo = {
  individualToolNameKr: string
  individualToolNameEn: string
  individualToolInfo: string
  individualToolTagKr: string
  individualToolTagEn: string
  individualToolTopic: string
  individualToolCountry: string
  individualToolLogo: string
}

export type coreFunc = {
  "subTitle": string
  "content": string
}

export type SelfSpecificInfo = {
  individualToolNameKr: string
  individualToolNameEn: string
  individualToolInfo: string
  individualToolLogo: string
  individualToolUrl: string
  individualCorefunc: Array<coreFunc>
  individualClient: Array<Array<string>>
  individualToolPricing: Array<Array<string>>
  individualToolReviewRateAs: number
  individualToolReviewRatePs: number
}

export type toolInfo = {
  toolLogo: string
  toolName: string
}

export type WithMainInfo = {
  withCorpNameKr: string
  withCorpNameEn: string
  withCorpInfo: string
  withTeamNameKr: string
  withTeamNameEn: string
  withCorpTag: string
  withCorpLogo: string
  withCorpTool: Array<toolInfo>
}

export type WithSpecificInfo = {
  withCorpNameKr: string
  withCorpNameEn: string
  withCorpInfo: string
  withCorpLogo: string
  withCorpUrl: string
  withCorpInfoDetail: string
  withCorpCulture: Array<Array<string>>
  withCorpBranch: Array<Array<string>>
  withCorpTool: Array<Array<string>>
}
