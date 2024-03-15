export interface ICustomer {
  _id: string;
  fullname: string;
  username: string;
  avatar :string;
  backgroundImage: string;
  email: string;
  password: string;
  token : string;
  phone: string;
  address: string;
  country : string;
  description: string;
  contributes: string[];
  links  : any;
  isDelete : boolean;
  isBlock: boolean;
  salt?: string;
  role: string;
  userPost:  string
}

export interface ICustomerInputDTO {
  fullname: string;
  username: string;
  avatar :string;
  email: string;
  password: string;
  token : string;
  phone: string;
  address: string;
  country : string;
  description: string;
  links  : any;
  isDelete : boolean;
  isBlock: boolean;
  salt?: string;
  role: string;
  userPost:  string
}

export interface ICustomerQuery {
  query : string;
  start: any;
  limit: any;
  role? : string;
}