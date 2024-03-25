
export interface IProduct {
  _id : string
  url : string
  pageId : string
  categoryIds : string[]
  name : string
  linkVideo : string
  desShort : string
  description : string
  descriptionPlus : [IProductDescriptionPlus]
  images : [IProductImage]
  pdf : string
  slide : string
  ecommerce : IProductEcommerce
  ecommercePlus : [IProductEcommercePlus]
  additional : IProductAdditional
  hashtags : string[]
  commentIds : string[]
  contact : IProductContact
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string
  status : string
  userPost : string
  authors : string[]
  counter : number
  is_delete : boolean
  showTop : boolean
  label : string
  views : number
  likes : string[]
  shares : number
  downloads : number
  createdAt: Date
  updatedAt: Date
  languages : [IProductLanguage]
}

export interface IProductLanguage {
  code : string
  name :string
  desShort : string
  description: string
  seoTitle: string
  seoName: string
  seoKeyWord :string
  seoDesc : string
  price : number
  unit : string
  descriptionPlus : [IProductDescriptionPlus]
}


export interface IProductImage {
  _id : string
  image : string
  alt: string
  name : string
  author : string
  copyright : string
  address : string
  source : string
  year: string
}

export interface IProductEcommerce {
  _id : string
  price : string
  priceSale : string
  quantity : string
  discount : string
  unit : string
}

export interface IProductEcommercePlus {
  _id : string
  images: [string]
  alts: [string]
  price : string
  priceSale : string
  quantity : string
  discount : string
  unit : string
  atribute : [{
    id: {
      type: string,
    },
    code: {
      type: string,
    },
 }]
}

export interface IProductContact {
  _id : string
  name : string
  email : string
  phone : string
  country : string
}

export interface IProductDescriptionPlus {
  title : string
  description : string
}

export interface IProductAdditional{
  _id : string
  typeof : string        
  copyright : string
  publishYear : string
  source : string
  nameVn : string
  nameEn : string
  nameLa : string
  typeEvent : string
  dateStart : string
  timeStart : string
  dateEnd : string
  timeEnd : string
  address : string
}

export interface IProductInputDTO {
  _id : string
  url : string
  pageId : string
  categoryIds : string[]
  name : string
  linkVideo : string
  desShort : string
  description : string
  descriptionPlus : [IProductDescriptionPlus]
  images : [IProductImage]
  alts : [string]
  pdf : string
  slide : string
  ecommerce : IProductEcommerce
  ecommercePlus : [IProductEcommercePlus]
  additional : IProductAdditional
  hashtags : string[]
  commentIds : string[]
  contact : IProductContact
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string
  status : string
  userPost : string
  authors : string[]
  showTop : boolean
  label : string
  views : number
  likes : string[]
  shares : number
  downloads : number
  languages : [IProductLanguage]
}

export interface  IProductQuery {
  pageId : string
  query : string
  start: any
  limit: any
  role : string
  userId : string
  language : string
  cateId : string
  hashtag : string
  attributes : [string]
  priceMin : string
  priceMax : string
  status : string
  isFullSite : boolean
  label : string
}

