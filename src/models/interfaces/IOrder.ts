
export interface IOrder {
  _id : string;
  customerId : string;

  products: [{
  productId: string;
  ecommercePlusId:  string;
  categoryId  : string;
  quantity: string;
  price: string;

  //====details===
  adult: string;
  children: string;
  timeStart: Date;
  timeEnd: Date;
  size: string
  color: string
  measures: string
  weight: string
  height: string
  width: string
  }]
  //====details===
  note: string

  billingAddress: {
    fullname: string
    address: string
    phone: string
    email: string
  },

  shippingAddress: {
    shipCode: string
    fullname: string
    address: string
    phone: string
    email: string
  },

  customFields: [{
    displayName  : string,
    fields : [{
       name : string,
       type: string,
       value : string
     }],
  }]

  shipId: string

  discount: {
    discount_code: string
    discount: string
  },

  paymendId: string

  subTotal: string
  total: string

  status: string
  paymentStatus : string
  is_delete: boolean
  userPost:  string
  createdAt : Date
  updatedAt : Date
}

export interface IOrderInputDTO {
  _id : string;
  customerId : string;

  products: [{
  productId: string;
  ecommercePlusId:  string;
  categoryId  : string;
  quantity: string;
  price: string;

  //====details===
  adult: string;
  children: string;
  timeStart: Date;
  timeEnd: Date;
  size: string
  color: string
  measures: string
  weight: string
  height: string
  width: string
  }]
  //====details===
  note: string

  billingAddress: {
    fullname: string
    address: string
    phone: string
    email: string
  },

  shippingAddress: {
    shipCode: string
    fullname: string
    address: string
    phone: string
    email: string
  },


  shipId: string,

  discount: {
    discount_code: string
    discount: string
  },

  customFields: [{
    displayName  : string,
    fields : [{
       name : string,
       type: string,
       value : string
     }],
  }]

  paymendId: string,

  subTotal: string
  total: string

  status: string
  paymentStatus : string

  userPost:  string
}


export interface IOrderQuery {
  query : string;
  start: any;
  limit: any;
  role? : string;
  userId?: string;
}