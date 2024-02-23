import { Inject, Service } from 'typedi';
import { IContactInputDTO, IContact } from '../models/interfaces/IContact';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export interface IContactRepository {
  getContact(): Promise<any>;
  getContactInfo(query: IContact): Promise<IContact>;
  getContactCount(): Promise<Number>;
  addContact(ContactInputDTO: IContactInputDTO): Promise<IContact>;
  removeContact(Contact: IContact): Promise<any>;
  updateContact(ContactInputDTO : IContactInputDTO) : Promise<IContact>
}

@Service()
export default class ContactRepository implements IContactRepository {
  constructor(
    @Inject('contactModel') private ContactModel: Models.ContactModel,
    @Inject('logger') private logger
  ) {}

  public async getContact(): Promise<any> {
    return this.ContactModel.findOne({
      isDelete : { $in: [false, null] }
    })
      .sort({
        createdAt: -1,
      })
  }

  public async getContactInfo(query: IContact): Promise<IContact> {
    return this.ContactModel.findById(query._id);
  }

  public async getContactCount(): Promise<Number> {
    return this.ContactModel.find({
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addContact(ContactInputDTO: IContactInputDTO): Promise<IContact> {
    try {
      const record = await this.ContactModel.create(ContactInputDTO);

      if (!record) {
        throw new Error('Contact cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateContact(ContactInputDTO: IContactInputDTO): Promise<IContact> {
    try {
      
      const record = await this.ContactModel.findByIdAndUpdate(ContactInputDTO._id, ContactInputDTO);

      if (!record) {
        throw new Error('Contact cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removeContact(Contact: IContact): Promise<any> {
    return this.ContactModel.findByIdAndRemove(Contact._id);
  }
}
