import { Service, Inject } from 'typedi';
import AttributeRepository from '../repository/attributeRepository';
import { IAttribute, IAttributeInputDTO } from '../models/interfaces/IAttribute';

export interface IAttributeService {
  getAttributes(pageId: any): Promise<any[]>
  getAttributeInfo(AttributeId : IAttribute): Promise<IAttribute>
  addAttribute(AttributeInputDTO: IAttributeInputDTO): Promise<IAttribute>
  removeAttribute(Attribute: IAttribute): Promise<any>
  updateAttribute(AttributeInputDTO : IAttributeInputDTO) : Promise<IAttribute>
}

@Service()
export default class AttributeService implements IAttributeService {
  AttributeRepo: AttributeRepository;

  constructor(@Inject() AttributeRepo: AttributeRepository) {
    this.AttributeRepo = AttributeRepo;
  }


  public async getAttributes(pageId: any): Promise<any[]> {
    return this.AttributeRepo.getAttributes(pageId)
  }

  public async getAttributeInfo(AttributeId : IAttribute): Promise<IAttribute> {
    return this.AttributeRepo.getAttributeInfo(AttributeId);
  }

  public async addAttribute(AttributeInputDTO: IAttributeInputDTO): Promise<IAttribute> {
    return this.AttributeRepo.addAttribute(AttributeInputDTO);
  }

  public async removeAttribute(Attribute: IAttribute): Promise<any> {
    return this.AttributeRepo.removeAttribute(Attribute);
  }

  public async updateAttribute(AttributeInputDTO: IAttributeInputDTO): Promise<IAttribute> {
    return this.AttributeRepo.updateAttribute(AttributeInputDTO);
  }
}