import { Service, Inject } from 'typedi';
import ContactRepository from '../repository/contactRepository';
import { IContact, IContactInputDTO } from '../models/interfaces/IContact';

export interface IContactService {
  getContact(): Promise<any>
  getContactInfo(ContactId : IContact): Promise<IContact>
  addContact(ContactInputDTO: IContactInputDTO): Promise<IContact>
  removeContact(Contact: IContact): Promise<any>
  updateContact(ContactInputDTO : IContactInputDTO) : Promise<IContact>
}

@Service()
export default class ContactService implements IContactService {
  ContactRepo: ContactRepository;

  constructor(@Inject() ContactRepo: ContactRepository) {
    this.ContactRepo = ContactRepo;
  }

  public async getContact(): Promise<any> {
    return this.ContactRepo.getContact()
  }

  public async getContactInfo(ContactId : IContact): Promise<IContact> {
    return this.ContactRepo.getContactInfo(ContactId);
  }

  public async addContact(ContactInputDTO: IContactInputDTO): Promise<IContact> {
    return this.ContactRepo.addContact(ContactInputDTO);
  }

  public async removeContact(Contact: IContact): Promise<any> {
    return this.ContactRepo.removeContact(Contact);
  }

  public async updateContact(ContactInputDTO: IContactInputDTO): Promise<IContact> {
    return this.ContactRepo.updateContact(ContactInputDTO);
  }
}