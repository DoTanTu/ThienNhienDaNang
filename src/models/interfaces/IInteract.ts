export interface IInteract {
    _id: string;
    productId: string;
    shares : IInteractCustomer;
    downloads: string[];
    createdAt: Date
    updatedAt: Date
  }

  export interface IInteractDownload {
    productIds : string[];
  }

  export interface IInteractInputDTO {

  }
  
  export interface IInteractQuery {
    query : string;
    start: any;
    limit: any;
    role? : string;
  }