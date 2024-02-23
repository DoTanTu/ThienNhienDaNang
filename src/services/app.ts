import { Service, Inject } from 'typedi';
import AppRepository from '../repository/appRepository';
import { IApp, IAppInputDTO, IAppQuery } from '../models/interfaces/IApp';
import { Utils } from '../utils/utils';
import { APPTYPE } from '../utils/appType';
import AttributeRepository from '../repository/attributeRepository';

export interface IAppService {
  getApp(): Promise<any>
  getAppInfo(AppId : IApp): Promise<IApp>
  addApp(AppInputDTO: IAppInputDTO): Promise<IApp>
  removeApp(App: IApp): Promise<any>
  updateApp(AppInputDTO : IAppInputDTO) : Promise<IApp>
}

@Service()
export default class AppService implements IAppService {
  AppRepo: AppRepository;

  constructor(@Inject() AppRepo: AppRepository) {
    this.AppRepo = AppRepo;
  }

  public async getApp(): Promise<any> {
    return this.AppRepo.getApp()
  }

  public async getAppInfo(AppId : IApp): Promise<IApp> {
    return this.AppRepo.getAppInfo(AppId);
  }

  public async addApp(AppInputDTO: IAppInputDTO): Promise<IApp> {
    return this.AppRepo.addApp(AppInputDTO);
  }

  public async removeApp(App: IApp): Promise<any> {
    return this.AppRepo.removeApp(App);
  }

  public async updateApp(AppInputDTO: IAppInputDTO): Promise<IApp> {
    return this.AppRepo.updateApp(AppInputDTO);
  }
}