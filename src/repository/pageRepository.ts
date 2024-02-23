import { Inject, Service } from 'typedi';
import { IPageInputDTO, IPage, IPageQuery } from '../models/interfaces/IPage';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export interface IPageRepository {
  getPages(query: IPageQuery): Promise<any[]>;
  getPageInfo(query: IPage): Promise<IPage>;
  getPageCount(): Promise<Number>;
  addPage(pageInputDTO: IPageInputDTO): Promise<IPage>;
  removePage(Page: IPage): Promise<any>;
  updatePage(pageInputDTO : IPageInputDTO) : Promise<IPage>
}

@Service()
export default class PageRepository implements IPageRepository {
  constructor(
    @Inject('pageModel') private PageModel: Models.PageModel,
    @Inject('logger') private logger
  ) {}

  public async getPages(query: IPageQuery): Promise<any[]> {
    var options : any = {
      isDelete : { $in: [false, null] }
    }
    if (query != null && query.query) {
      options.name = { $regex: query.query, $options: 'i' }
    }
    return this.PageModel.find(options)
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit);
  }

  public async getPageInfo(query: IPage): Promise<IPage> {
    return this.PageModel.findById(query._id);
  }

  public async getPageCount(): Promise<Number> {
    return this.PageModel.find({
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addPage(pageInputDTO: IPageInputDTO): Promise<IPage> {
    try {
      const record = await this.PageModel.create(pageInputDTO);

      if (!record) {
        throw new Error('Page cannot be created');
      }

      return record.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updatePage(pageInputDTO: IPageInputDTO): Promise<IPage> {
    try {
      const record = await this.PageModel.findByIdAndUpdate(pageInputDTO._id,pageInputDTO);


      if (!record) {
        throw new Error('Page cannot be update');
      }

      return record.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removePage(Page: IPage): Promise<any> {
    return this.PageModel.findByIdAndRemove(Page._id);
  }
}
