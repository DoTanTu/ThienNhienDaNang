
export interface ICategory {
  _id : string
  url : string
  pageId : string
  name : string
  desc : string
  description : string
  images : [string]
  alts: [string]
  parents : string
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDescs : string
  status : string
  is_delete : boolean
  showTop : boolean
  language : string
  createdAt: Date
  updatedAt: Date
  level : string
  languages : [ICategoryLanguage]
  userPost:  string
}

export interface ICategoryLanguage{
  code : string
  name :string
  desc : string
  description: string
  seoTitle: string
  seoName: string
  seoKeyWord :string
  seoDesc : string
}

export interface ICategoryInputDTO {
  _id : string
  pageId : string
  url : string
  name : string
  desc : string
  description : string
  images : [string]
  alts: [string]
  parents : string
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string
  status : string
  showTop : boolean
  level : string
  languages : [ICategoryLanguage]
  userPost:  string
}

export interface  ICategoryQuery {
  _id : string
  pageId : string
  query : string;
  start: any;
  limit: any;
  role : string;
  language : string
}