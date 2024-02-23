export interface IMessage {
  _id: string;
  title: string;
  address : string,
  message : string,
  content : string,
  name : string,
  phone: string,
  email: string,
  productIds : any,
  categoryIds :any,
  isRead : boolean,
  userPost : string
}

export interface IMessageInputDTO {
  title: string;
  address : string,
  message : string,
  content : string,
  name : string,
  phone: string,
  email: string,
  productIds : any,
  categoryIds :any,
  userPost : string
}

export interface IMessageQuery {
  query : string;
  start: any;
  limit: any;
  role? : string;
  userId? : string;
}