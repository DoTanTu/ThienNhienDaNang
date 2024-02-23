export interface IAttribute {
  _id: string
  tag : string
  name : string 
  values : [{
    code : string
    value : string
    images : [string]
  }]
  pageId : string
  isMutipleSelection : boolean
  is_delete : boolean
  createdAt: Date
  updatedAt: Date
}

export interface IAttributeInputDTO {
  _id: string
  tag : string
  name : string
  values : [{
    code : string
    value : string
    images : [string]
  }]
  pageId : string
  isMutipleSelection : boolean
}
