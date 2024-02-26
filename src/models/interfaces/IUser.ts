export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  backgroundImage : string;
  password: string;
  savePassword : string;
  isDelete : boolean;
  isBlock: boolean;
  salt?: string;
  role: string;
  phone : string;
}

export interface IUserInputDTO {
  username: string;
  fullname: string;
  avatar: string;
  email?: string;
  password: string;
  role: string;
  phone : string;
}

export interface IUserQuery {
  query : string;
  start: any;
  limit: any;
  role : string;
}