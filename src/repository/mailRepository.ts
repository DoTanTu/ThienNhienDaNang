import { Inject, Service } from 'typedi';
import { IMail } from '../models/interfaces/IMail';

export interface IMailRepository {
  getMail(pageId : any): Promise<any>;
  addMail(MailInputDTO: IMail): Promise<IMail>;
  removeMail(Mail: IMail): Promise<any>;
  updateMail(MailInputDTO : IMail) : Promise<IMail>
}

@Service()
export default class MailRepository implements IMailRepository {
  constructor(
    @Inject('mailModel') private MailModel: Models.MailModel,
    @Inject('logger') private logger
  ) {}

  public async getMail(): Promise<any> {
    return this.MailModel.findOne({
      isDelete : { $in: [false, null] }
    })
  } 

  public async addMail(MailInputDTO: IMail): Promise<IMail> {
    try {
      const record = await this.MailModel.create(MailInputDTO);

      if (!record) {
        throw new Error('Mail cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateMail(MailInputDTO: IMail): Promise<IMail> {
    try {
      const record = await this.MailModel.findByIdAndUpdate(MailInputDTO._id, MailInputDTO);

      if (!record) {
        throw new Error('Mail cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removeMail(Mail: IMail): Promise<any> {
    return this.MailModel.findByIdAndRemove(Mail._id);
  }
}
