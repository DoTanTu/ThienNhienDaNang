import { Service, Inject } from 'typedi';
import MessageRepository from '../repository/messageRepository';
import { IMessage, IMessageInputDTO, IMessageQuery } from '../models/interfaces/IMessage';
import { ROLE } from '../utils/role';

export interface IMessageService {
  getMessages(query : IMessageQuery): Promise<{items : any[], total : Number }>
  getMessageInfo(MessageId : IMessage): Promise<IMessage>
  addMessage(MessageInputDTO: IMessageInputDTO): Promise<IMessage>
  removeMessage(Message: IMessage): Promise<any>
}

@Service()
export default class MessageService implements IMessageService {
  messageRepo: MessageRepository;

  constructor(@Inject() messageRepo: MessageRepository) {
    this.messageRepo = messageRepo;
  }
  public async getMessages(query : IMessageQuery): Promise<{items : any[], total : Number }> {
    let queryProduct = query
    if (queryProduct.userId) {
      if (query.role == ROLE.Author || query.role == ROLE.Manager || query.role == ROLE.Admin) {
        queryProduct.userId = ""
      }
    }
    
    return {
      items : await this.messageRepo.getMessages(query),
      total : await this.messageRepo.getMessageCount(query)
    };
  }

  public async getMessageInfo(MessageId : IMessage): Promise<IMessage> {
    return this.messageRepo.getMessageInfo(MessageId);
  }

  public async addMessage(MessageInputDTO: IMessageInputDTO): Promise<IMessage> {
    return this.messageRepo.addMessage(MessageInputDTO);
  }

  public async removeMessage(Message: IMessage): Promise<any> {
    return this.messageRepo.removeMessage(Message);
  }

}