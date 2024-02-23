export interface IComment {
    _id : string
    text: string
    isActive: boolean
    is_delete: boolean
    productId: string
    userId: string
    parentId : string
    createdAt: Date
    updatedAt: Date
}
export interface ICommentQuery {
    query : string;
    isActive : boolean;
    start: any;
    limit: any;
    role : any;
}


export interface ICommentInputDTO {
    text: string
    productId: string
    userId: string
    parentId : string
    is_delete: boolean
  }