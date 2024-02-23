import { Inject, Service } from 'typedi';
import { IMessageInputDTO, IMessage, IMessageQuery } from '../models/interfaces/IMessage';

export interface IMessageRepository {
  getMessages(query: IMessageQuery): Promise<any[]>;
  getMessageInfo(query: IMessage): Promise<IMessage>;
  getMessageCount(query: IMessageQuery): Promise<Number>;
  addMessage(MessageInputDTO: IMessageInputDTO): Promise<IMessage>;
  removeMessage(Message: IMessage): Promise<any>;
}

@Service()
export default class MessageRepository implements IMessageRepository {
  constructor(
    @Inject('messageModel') private MessageModel: Models.MessageModel,
    @Inject('logger') private logger
  ) {}

  public async getMessages(query: IMessageQuery): Promise<any[]> {
    var queryString : any = {
      isDelete: { $in: [false, null] },
    }
    if (query != null) {
      if (query.query && query.query != "") {
        queryString = {
          name: { $regex: query.query, $options: "i" },
          isDelete: { $in: [false, null] },
        }
      }

      if (query.userId && query.userId != "") {
        queryString.userPost = { $in: [query.userId] }
      }
    }
    return this.MessageModel.find(queryString)
    .sort({
      createdAt: -1,
    })
    .skip(query.start)
    .limit(query.limit);
  }

  public async getMessageInfo(query: IMessage): Promise<IMessage> {
    return this.MessageModel.findById(query._id);
  }

  public async getMessageCount(query: IMessageQuery): Promise<Number> {
    var queryString : any = {
      isDelete: { $in: [false, null] },
    }
    if (query != null) {
      if (query.query && query.query != "") {
        queryString = {
          name: { $regex: query.query, $options: "i" },
          isDelete: { $in: [false, null] },
        }
      }

      if (query.userId && query.userId != "") {
        queryString.userPost = { $in: [query.userId] }
      }
    }
    return this.MessageModel.find(queryString).count();
  }

  public async addMessage(MessageInputDTO: IMessageInputDTO): Promise<IMessage> {
    try {
      const record = await this.MessageModel.create(MessageInputDTO);

      if (!record) {
        throw new Error('Message cannot be created');
      }

      return record.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeMessage(Message: IMessage): Promise<any> {
    return this.MessageModel.findByIdAndRemove(Message._id);
  }
}
