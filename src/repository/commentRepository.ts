import { Inject, Service } from 'typedi';
import { IComment, ICommentQuery ,ICommentInputDTO } from '../models/interfaces/IComment';
import { STATUS } from '../utils/status';

export interface ICommentRepository {
    getComments(query : ICommentQuery): Promise<any[]>;
    getAllComments(query: IComment): Promise<any[]>;
    getCommentCount(): Promise<Number>;
    addComment(query: ICommentInputDTO): Promise<IComment>;
    activeComment(Comment : IComment): Promise<any>;
    removeComment(Comment : IComment): Promise<any>;
}

@Service()
export default class CommentRepository implements ICommentRepository {
  constructor(
    @Inject('commentModel') private CommentModel: Models.CommentModel,
    @Inject('logger') private logger
  ) {}

  public async getComments(query: ICommentQuery): Promise<any[]> {
    return this.CommentModel.find({
      isActive :  false
    })
    .populate({
      path: "products",
      select: "name pageId",
      match: {
        _id: { $exists: true } // Chỉ chọn các sản phẩm có ID tồn tại
       }
    })
    .populate({
      path: "users",
      select: "username",
    })
    .sort({
      createdAt: -1,
    })
    .skip(query.start)
    .limit(query.limit);
}

  
  public async getAllComments(query : IComment): Promise<any[]> {
      return this.CommentModel.find({ 
        productId : query.productId ,
        isActive : true
      })
      .sort({
        createdAt: -1,
      }) ;
  }
  
  public async addComment(commentInputDTO: ICommentInputDTO): Promise<IComment> {
    try {
      const commentRecord = await this.CommentModel.create(commentInputDTO);
  
      if (!commentRecord) {
        throw new Error('Comment cannot be created');
      }
  
      return commentRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getCommentCount() : Promise<Number> {
    return this.CommentModel.find().count();
  }

  public async activeComment(Comment : IComment) : Promise<any> {
    return this.CommentModel.findByIdAndUpdate(
      {_id : Comment._id},
      {
        $set: {
          isActive: true,
        },
      }
    )
  }

  public async removeComment(Comment: IComment): Promise<any> {
    return this.CommentModel.findByIdAndRemove(Comment._id);
  }

  public async removeCommentByProduct(query: IComment): Promise<any> {
    return this.CommentModel.deleteMany({
      productId: query.productId
    })
  }
}