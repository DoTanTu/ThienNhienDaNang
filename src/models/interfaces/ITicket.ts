export interface ITicket {
  _id: string;
  title: string;
  address : string,
  Ticket : string,
  content : string,
  name : string,
  phone: string,
  email: string,
  productIds : any,
  categoryIds :any,
  isRead : boolean
}

export interface ITicketInputDTO {
  title: string;
  address : string,
  Ticket : string,
  content : string,
  name : string,
  phone: string,
  email: string,
  productIds : any,
  categoryIds :any
}

export interface ITicketQuery {
  query : string;
  start: any;
  limit: any;
  role? : string;
}