
export interface IPage {
  _id : string
  name : string
  desc : string
  images : string
  setting: IPageSetting,
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string
  is_delete : boolean
  createdAt: Date
  updatedAt: Date
}

export interface IPageSetting {
    _id : string
    isCategory : boolean
    isAttribute : boolean
    isImageDetail : boolean
    isEcommerce: boolean
    isPdf: boolean
    isSlide: boolean
    isLinkVideo : boolean
    isProductContact: boolean
    isLockDelete: boolean
    isDescriptionPlus : boolean
    referencePageId : string
}

export interface IPageInputDTO {
  _id : string
  name : string
  desc : string
  images : string
  setting: IPageSetting
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string

}

export interface IPageQuery {
  query : string;
  start: any;
  limit: any;
  role : string;
}