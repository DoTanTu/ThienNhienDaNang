import { Inject, Service } from 'typedi';
import { ISiteInputDTO, ISite, ISiteQuery } from '../models/interfaces/ISite';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { STATUS } from '../utils/status';

export interface ISiteRepository {
  getSites(): Promise<any[]>;
  getDataWithSites(languageCurrentCode : any): Promise<any>
  getSiteInfo(query: ISite): Promise<ISite>;
  getSiteCount(): Promise<Number>;
  addSite(SiteInputDTO: ISiteInputDTO): Promise<any>;
  removeSite(Site: ISite): Promise<any>;
  updateSite(SiteInputDTO : ISiteInputDTO) : Promise<any>
  findSiteProfile()  : Promise<ISite>
}

@Service()
export default class SiteRepository implements ISiteRepository {
  constructor(
    @Inject('siteModel') private SiteModel: Models.SiteModel,
    @Inject('logger') private logger
  ) {}

  public async getSites(): Promise<any[]> {
    return this.SiteModel.find({
      isDelete : { $in: [false, null] }
    })
      .sort({
        createdAt: -1,
      })
  }

  public async getDataWithSites(app : any): Promise<any[]> {
    var matchProduct : any =  {
      'status': { $in: [STATUS.Active] },
      'is_delete': { $in: [null, false] }
    }
    
    if (app != null && app.setting != null && app.setting.queryProduct != '') {
      if (app.setting.queryProduct == 'SHOWTOP') {
        matchProduct.showTop = true
      }else{
        matchProduct.label = app.setting.queryProduct
      }
    }

    return this.SiteModel.find({
      isDelete : { $in: [false, null] }
    })
    .populate({
      path: "categories",
      select: "_id url name showTop level desc images seoTitle seoName seoKeyWord seoDes parents languages",
      match: {
        'status': { $in: [STATUS.Active] },
        'is_delete': { $in: [null, false] }
    }})
    .populate({
      path: "products",
      select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",     
      match: matchProduct,
      })
  }

  public async getSiteInfo(query: ISite): Promise<ISite> {
    return this.SiteModel.findById(query._id);
  }

  public async getSiteCount(): Promise<Number> {
    return this.SiteModel.find({
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addSite(SiteInputDTO: ISiteInputDTO): Promise<any> {
    try {
      const record = await this.SiteModel.create(SiteInputDTO);

      if (!record) {
        throw new Error('Site cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateSite(SiteInputDTO: ISiteInputDTO): Promise<any> {
    try {
      const record = await this.SiteModel.findByIdAndUpdate(SiteInputDTO._id,SiteInputDTO);

      if (!record) {
        throw new Error('Site cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeSite(Site: ISite): Promise<any> {
    return this.SiteModel.findByIdAndRemove(Site._id);
  }

  public async findSiteProfile(): Promise<ISite> {
    return this.SiteModel.findOne({
      isSiteGetDataProfile : true,
      isDelete : { $in: [false, null] }
    }).select("_id url name");
  }
}
