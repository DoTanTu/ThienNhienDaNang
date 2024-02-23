import { Inject, Service } from 'typedi';
import { IAppInputDTO, IApp, IAppQuery } from '../models/interfaces/IApp';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export interface IAppRepository {
  getApp(): Promise<any>;
  getAppInfo(query: IApp): Promise<IApp>;
  getAppCount(): Promise<Number>;
  addApp(AppInputDTO: IAppInputDTO): Promise<IApp>;
  removeApp(App: IApp): Promise<any>;
  updateApp(AppInputDTO : IAppInputDTO) : Promise<IApp>
}

@Service()
export default class AppRepository implements IAppRepository {
  constructor(
    @Inject('appModel') private AppModel: Models.AppModel,
    @Inject('logger') private logger
  ) {}

  public async getApp(): Promise<any> {
    return this.AppModel.findOne({
      isDelete : { $in: [false, null] }
    })
      .sort({
        _id: -1,
      })
  }

  public async getAppInfo(query: IApp): Promise<IApp> {
    return this.AppModel.findById(query._id);
  }

  public async getAppCount(): Promise<Number> {
    return this.AppModel.find({
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addApp(AppInputDTO: IAppInputDTO): Promise<IApp> {
    try {
      const record = await this.AppModel.create(AppInputDTO);

      if (!record) {
        throw new Error('App cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateApp(AppInputDTO: IAppInputDTO): Promise<IApp> {
    try {
      const record = await this.AppModel.findByIdAndUpdate(AppInputDTO._id, AppInputDTO);

      if (!record) {
        throw new Error('App cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removeApp(App: IApp): Promise<any> {
    return this.AppModel.findByIdAndRemove(App._id);
  }
}
