import { Service, Inject } from 'typedi';
import ContributeRepository from '../repository/contributeRepository';
import { IContribute, IContributeFile, IContributeInputDTO, IContributeQuery } from '../models/interfaces/IContribute';

export interface IContributeService {
  getContributes(query : IContributeQuery) : Promise<{items : any[] ; total : Number }>;
  addContribute(ContributeInputDTO: IContributeInputDTO): Promise<IContribute>;
  getContributeInfo(ContributeId : IContribute): Promise<IContribute>;
  getFilesIntoContribute(ContributeId : IContribute): Promise<any>;
  removeContribute(ContributeId : IContribute): Promise<any>;
}

@Service()
export default class ContributeService implements IContributeService {
  ContributeRepo: ContributeRepository;

  constructor(@Inject() ContributeRepo: ContributeRepository) {
    this.ContributeRepo = ContributeRepo;
  }

  public async getContributes( query: IContributeQuery): Promise<{ items : any[]; total: Number }> {
    return {
      items: await this.ContributeRepo.getContributes(query),
      total: await this.ContributeRepo.getContributeCount()
    };
  }

  public async addContribute(ContributeInputDTO: IContributeInputDTO): Promise<IContribute> {
    return this.ContributeRepo.addContribute(ContributeInputDTO); 
  }

  public async getContributeInfo(ContributeId : IContribute): Promise<IContribute> {
    return this.ContributeRepo.getContributeInfo(ContributeId);
  }

  public async removeContribute(ContributeId : IContribute): Promise<any> {
    return this.ContributeRepo.removeContribute(ContributeId);
  }

  public async getFilesIntoContribute(ContributeId : IContribute): Promise<any> {
    return this.ContributeRepo.getFilesIntoContribute(ContributeId);
  }
};