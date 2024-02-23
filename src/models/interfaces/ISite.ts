import { url } from "aws-sdk/clients/finspace"

export interface ISite {
  _id : string
  url : string
  name : string
  images : string[]
  cssPath : string[]
  jsPath : string[]
  htmlPath : string
  appId : string
  isShowInMenu : boolean
  isSubMenu :  boolean
  pageData : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther1 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther2 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther3 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther4 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther5 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther6 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther7 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther8 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther9 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther10 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  isSiteProductDetail : boolean
  isSiteCategoryDetail : boolean
  isSiteGetDataOrder : boolean
  isFullFieldProduct : boolean
  isSiteGetDataProfile : boolean
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string
  is_delete : boolean
  status : string
  subMenuCustom  : [{
    name: string,
    url : string
  }]
}


export interface ISiteInputDTO {
  _id : string
  url : string
  name : string
  images : string[]
  cssPath : string[]
  jsPath : string[]
  htmlPath : string
  appId : string
  isShowInMenu : boolean
  isSubMenu :  boolean
  pageData : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther1 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther2 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther3 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther4 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther5 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther6 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther7 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther8 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther9 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  pageOther10 : {
    pageId: {
      type: string,
    },
    isGetCategory :  boolean,
    isGetProduct :  boolean,
    isFullSizeProduct : boolean,
    isFullFieldProduct : boolean,
    limitSizeProduct : number,
  },
  isSiteProductDetail : boolean
  isSiteCategoryDetail : boolean
  isSiteGetDataOrder : boolean
  isFullFieldProduct : boolean
  isSiteGetDataProfile : boolean
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDesc : string
  is_delete : boolean
  status : string
  subMenuCustom  : [{
    name: string,
    url : string
  }]
}

export interface ISiteQuery {
  query : string;
  start: any;
  limit: any;
  role : string;
}