export interface IPaymentMethod {
  _id: string;
  name: string,
  accountName: String,
  accountNumber  : String,
  bankName : string,
  status : string,
  is_delete: boolean;
  sKey : string;
  pKey : string;
  paymentMethod : string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDTOPaymentMethod {
  name: string,
  accountName: String,
  accountNumber  : String,
  bankName : string,
  isSelected: boolean;
  status : string;
  sKey : string;
  pKey : string;
  paymentMethod : string;
}

export interface IPaymentMethodQuery {
  query : string;
  start: any;
  limit: any;
  isFullField : boolean;
}