import { Service, Inject } from 'typedi';
import CommentRepository from '../repository/commentRepository';
import { IComment, ICommentInputDTO, ICommentQuery } from '../models/interfaces/IComment';

export interface ICommentService {
  getComments(query : ICommentQuery) : Promise<{items : any[] ; total : Number }>;
  getCommentByProductId(productId : IComment): Promise<{ items : any[]}>;
  addComment(CommentInputDTO: ICommentInputDTO): Promise<IComment>;
  activeComment( commentId : IComment) : Promise<any>;
  removeComment(Comment : IComment) : Promise<any>;
}

@Service()
export default class CommentService implements ICommentService {
  CommentRepo: CommentRepository;

  constructor(@Inject() CommentRepo: CommentRepository) {
    this.CommentRepo = CommentRepo;
  }

  public async getComments( query: ICommentQuery): Promise<{ items : any[]; total: Number }> {
    return {
      items: await this.CommentRepo.getComments(query),
      total: await this.CommentRepo.getCommentCount()
    };
  }

  public async getCommentByProductId(productId : IComment): Promise<{ items : any[]}> {
    return {
      items : await this.CommentRepo.getAllComments(productId)
    };
  }

  public async addComment(CommentInputDTO: ICommentInputDTO): Promise<IComment> {
      return this.CommentRepo.addComment(CommentInputDTO); 
  }

  public async activeComment(customerId: any): Promise<any> {
    return this.CommentRepo.activeComment({ _id: customerId } as IComment);
  }

  public async removeComment(Comment: IComment): Promise<any> {
    return this.CommentRepo.removeComment(Comment);
  }

  public async removeCommentByProduct(ProductId : IComment): Promise<any> {
    return this.CommentRepo.removeCommentByProduct(ProductId);
  }
}