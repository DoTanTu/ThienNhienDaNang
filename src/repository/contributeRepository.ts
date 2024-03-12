import { Inject, Service } from 'typedi';
import { IContributeInputDTO, IContribute, IContributeQuery, IContributeFile } from '../models/interfaces/IContribute';
import { STATUS } from '../utils/status';

export interface IContributeRepository {
  getContributes(query: IContributeQuery): Promise<any[]>;
  getContributeCount() : Promise<Number>;
  addContribute(contributeInputDTO: IContributeInputDTO): Promise<IContribute>;
  getContributeInfo(contributeId : IContribute) : Promise<IContribute>;
  removeContribute(contributeId : IContribute) : Promise<any>;
  getFilesIntoContribute(contributeId : IContribute) : Promise<any>
}

@Service()
export default class ContributeRepository implements IContributeRepository {
  constructor(
    @Inject('contributeModel') private ContributeModel: Models.ContributeModel,
    @Inject('logger') private logger
  ) {}
  

   public async getContributes(query: IContributeQuery): Promise<any[]> {
    return this.ContributeModel.find()    
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
   }

    public async getContributeCount(): Promise<Number> {
        return this.ContributeModel.find({
        }).count();
   }

   public async addContribute(contributeInputDTO: IContributeInputDTO): Promise<IContribute> {
    try {
      const contributeRecord = await this.ContributeModel.create(contributeInputDTO);
      if (!contributeRecord) {
        throw new Error('Comment cannot be created');
      }
  
      return contributeRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getContributeInfo(contributeId : IContribute) : Promise<IContribute> {
    return this.ContributeModel.findById(contributeId);
  }

  public async removeContribute(contributeId : IContribute) : Promise<any> {
    return this.ContributeModel.findByIdAndRemove(contributeId);
  }

  public async getFilesIntoContribute(contributeId : IContribute) : Promise<any> {
    return this.ContributeModel.findById(contributeId)
    .select("files");
  }
}
