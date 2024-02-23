import { Service, Inject } from 'typedi';
import SiteRepository from '../repository/siteRepository';
import { ISite, ISiteInputDTO, ISiteQuery } from '../models/interfaces/ISite';

export interface ISiteService {
  getSites(): Promise<any>
  getFullDataSites() : Promise<{items : any[], total : Number }>
  getSiteInfo(SiteId : ISite): Promise<ISite>
  addSite(SiteInputDTO: ISiteInputDTO): Promise<any>
  removeSite(Site: ISite): Promise<any>
  updateSite(SiteInputDTO : ISiteInputDTO) : Promise<any>
  findSiteProfile() : Promise<any>
}

@Service()
export default class SiteService implements ISiteService {
  siteRepo: SiteRepository;

  constructor(@Inject() SiteRepo: SiteRepository) {
    this.siteRepo = SiteRepo;
  }

  public async getSites(): Promise<any> {
    return this.siteRepo.getSites()
  }

  public async getFullDataSites(): Promise<{items : any[], total : Number }> {
    return {
      items : await this.siteRepo.getSites(),
      total : await this.siteRepo.getSiteCount()
    };
  }

  public async getSiteInfo(SiteId : ISite): Promise<ISite> {
    return this.siteRepo.getSiteInfo(SiteId);
  }

  public async addSite(SiteInputDTO: ISiteInputDTO): Promise<any> {
    return this.siteRepo.addSite(SiteInputDTO);
  }

  public async removeSite(Site: ISite): Promise<any> {
    return this.siteRepo.removeSite(Site);
  }

  public async updateSite(SiteInputDTO: ISiteInputDTO): Promise<any> {
    return this.siteRepo.updateSite(SiteInputDTO);
  }

  public async findSiteProfile(): Promise<any> {
    return this.siteRepo.findSiteProfile();
  }
}