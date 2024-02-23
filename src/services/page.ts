import { Service, Inject } from 'typedi';
import PageRepository from '../repository/pageRepository';
import { IPage, IPageInputDTO, IPageQuery } from '../models/interfaces/IPage';
import AttributeRepository from '../repository/attributeRepository';
import { ATTRIBUTE } from '../utils/attribute';
import { IAttribute } from '../models/interfaces/IAttribute';
import { Utils } from '../utils/utils';

export interface IPageService {
  getPages(): Promise<any>
  getFullDataPages(query : IPageQuery): Promise<{items : any[], total : Number }>
  getPageInfo(pageId : IPage): Promise<IPage>
  addPage(pageInputDTO: IPageInputDTO): Promise<IPage>
  removePage(page: IPage): Promise<any>
  updatePage(pageInputDTO : IPageInputDTO) : Promise<IPage>
}

@Service()
export default class PageService implements IPageService {
  pageRepo: PageRepository;
  attributeRepo : AttributeRepository;

  constructor(@Inject() PageRepo: PageRepository,@Inject() Attribute: AttributeRepository) {
    this.pageRepo = PageRepo;
    this.attributeRepo = Attribute;
  }

  public async getPages(): Promise<any> {
    return this.pageRepo.getPages({start : 0, limit : 100} as IPageQuery)
  }

  public async getFullDataPages(query : IPageQuery): Promise<{items : any[], total : Number }> {
    return {
      items : await this.pageRepo.getPages(query),
      total : await this.pageRepo.getPageCount()
    };
  }

  public async getPageInfo(PageId : IPage): Promise<IPage> {
    return this.pageRepo.getPageInfo(PageId);
  }

  public async addPage(PageInputDTO: IPageInputDTO): Promise<IPage> {
   
    let page = await this.pageRepo.addPage(PageInputDTO);
    try {
      if (PageInputDTO.setting.isAttribute == true) {
        await this.attributeRepo.addAttribute({
          _id : Utils.getIdFrom(ATTRIBUTE.Hashtag,page._id),
          tag : ATTRIBUTE.Hashtag,
          name : ATTRIBUTE.Hashtag,
          pageId : page._id
       } as IAttribute)
      }
    } catch (error) {
      
    }
    return page
  }

  public async removePage(Page: IPage): Promise<any> {
    
    return this.pageRepo.removePage(Page);
  }

  public async updatePage(pageInputDTO: IPageInputDTO): Promise<IPage> {
    try {
      if (pageInputDTO.setting.isAttribute == true) {
        await this.attributeRepo.addAttribute({
          _id : Utils.getIdFrom(ATTRIBUTE.Hashtag,pageInputDTO._id),
          tag : ATTRIBUTE.Hashtag,
          name : ATTRIBUTE.Hashtag,
          pageId : pageInputDTO._id
        } as IAttribute)
      }
    } catch (error) {
    }
   
    return this.pageRepo.updatePage(pageInputDTO);
  }
}