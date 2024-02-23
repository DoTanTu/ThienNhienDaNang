import { Inject, Service } from 'typedi';
import { IAttributeInputDTO, IAttribute } from '../models/interfaces/IAttribute';

export interface IAttributeRepository {
  getAttributes(pageId : any): Promise<any[]>;
  getAttributeInfo(query: IAttribute): Promise<IAttribute>;
  getAttributeCount(pageId: any): Promise<Number>;
  addAttribute(AttributeInputDTO: IAttributeInputDTO): Promise<IAttribute>;
  removeAttribute(Attribute: IAttribute): Promise<any>;
  updateAttribute(AttributeInputDTO : IAttributeInputDTO) : Promise<IAttribute>
}

@Service()
export default class AttributeRepository implements IAttributeRepository {
  constructor(
    @Inject('attributeModel') private AttributeModel: Models.AttributeModel,
    @Inject('logger') private logger
  ) {}
  
  public async getAttributeByCategoryId(categoryId: any): Promise<any[]> {
    return this.AttributeModel.find({ categoryIds : { "$in" : [categoryId]} })
      .sort({
        createdAt: -1,
      })
  }

  public async getAttributes(pageId: any): Promise<any[]> {
    return this.AttributeModel.find({
      pageId : pageId,
      isDelete : { $in: [false, null] }
    })
      .sort({
        createdAt: -1,
      })
  }

  public async getAttributeInfo(query: IAttribute): Promise<IAttribute> {
    return this.AttributeModel.findById(query._id);
  }

  public async getAttributeCount(pageId: any): Promise<Number> {
    return this.AttributeModel.find({
      pageId : pageId,
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addAttribute(AttributeInputDTO: IAttributeInputDTO): Promise<IAttribute> {
    try {
      const record = await this.AttributeModel.create(AttributeInputDTO);

      if (!record) {
        throw new Error('Attribute cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateAttribute(AttributeInputDTO: IAttributeInputDTO): Promise<IAttribute> {
    try {
      const record = await this.AttributeModel.findByIdAndUpdate(AttributeInputDTO._id, AttributeInputDTO);

      if (!record) {
        throw new Error('Attribute cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removeAttribute(Attribute: IAttribute): Promise<any> {
    return this.AttributeModel.findByIdAndRemove(Attribute._id);
  }
}
