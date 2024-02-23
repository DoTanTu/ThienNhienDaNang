export interface IShipMethod {
  _id: string;
  name: string;
  image: string;
  price: string;
  status : string;
  isSelected: boolean;
  is_delete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDTOShipMethod {
  name: string;
  image: string;
  price: string;
  status : string;
  isSelected: boolean;
}

export interface IShipMethodQuery {
  query: string;
  start: any;
  limit: any;
}
