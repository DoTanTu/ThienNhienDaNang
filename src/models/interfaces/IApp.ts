
export interface IApp {
  _id : string
  name : string
  logo : string
  images : string[]
  cssPath : string[]
  jsPath : string[]
  htmlPath : string[]
  fontPath : string[]
  platform : string,
  framework : string,
  module : {
    isOrder : boolean,
    isAuthen : boolean,
    isMail : boolean,
    isQr : boolean,
    isPaymentOnline : boolean,
  }
  setting:{
    queryProduct : string,
  }
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDes : string
  is_delete : boolean
  status : string
  hostName : string
}


export interface IAppInputDTO {
  _id : string
  name : string
  url : string
  logo : string
  images : string[]
  cssPath : string[]
  jsPath : string[]
  htmlPath : string[]
  fontPath : string[]
  platform : string
  framework : string
  module : {
    isOrder : boolean,
    isAuthen : boolean,
    isMail : boolean,
    isQr : boolean,
    isPaymentOnline : boolean,
  }
  setting:{
    queryProduct : string,
  }
  seoTitle: string
  seoName: string
  seoKeyWord : string
  seoDes : string
  status : string
  hostName : string
}

export interface IAppQuery {
  query : string;
  start: any;
  limit: any;
  role : string;
}