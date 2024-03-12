  export interface IContribute {
    _id: string;
    title: string;
    customer : IContributeCustomer;
    status: boolean;
    type : string;
    content : string;
    date : string;
    address: string;
    files: [IContributeFile];
    createdAt: Date
    updatedAt: Date
  }

  export interface IContributeFile {
    _id : string;
    name: string;
    title : string;
    file: string;
    content : string;
    date : string;
    address : string;
  }

  export interface IContributeCustomer{
    customerId: string;
    fullname : string;
    copyright : string;
    phone : string;
    address : string;
    email : string;
  }

  export interface IContributeInputDTO {
    title: string;
    customer : IContributeCustomer;
    status: boolean;
    type : string;
    content : string;
    date : string;
    address: string;
    files: [IContributeFile];
  }
  
  export interface IContributeQuery {
    query : string;
    start: any;
    limit: any;
    role? : string;
  }