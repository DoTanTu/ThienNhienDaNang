import { Service, Inject } from 'typedi';
import LanguageRepository from '../repository/languageRepository';
import { ILanguage, ILanguageQuery } from '../models/interfaces/ILanguage';

export interface ILanguageService {
  getLanguages(): Promise<any>
  getFullDataLanguages(query : ILanguageQuery): Promise<{items : any[], total : Number }>
  getLanguageInfo(LanguageId : ILanguage): Promise<ILanguage>
  addLanguage(LanguageInputDTO: ILanguage): Promise<ILanguage>
  removeLanguage(Language: ILanguage): Promise<any>
  updateLanguage(LanguageInputDTO : ILanguage) : Promise<ILanguage>
}

@Service()
export default class LanguageService implements ILanguageService {
  LanguageRepo: LanguageRepository;

  constructor(@Inject() LanguageRepo: LanguageRepository) {
    this.LanguageRepo = LanguageRepo;
  }

  public async getLanguages(): Promise<any> {
    return this.LanguageRepo.getLanguages({start : 0, limit : 100} as ILanguageQuery)
  }

  public async getFullDataLanguages(query : ILanguageQuery): Promise<{items : any[], total : Number }> {
    return {
      items : await this.LanguageRepo.getLanguages(query),
      total : await this.LanguageRepo.getLanguageCount()
    };
  }

  public async getLanguageInfo(LanguageId : ILanguage): Promise<ILanguage> {
    return this.LanguageRepo.getLanguageInfo(LanguageId);
  }

  public async addLanguage(LanguageInputDTO: ILanguage): Promise<any> {
    await this.LanguageRepo.addLanguage(LanguageInputDTO);
    return this.getLanguages()
  }

  public async removeLanguage(Language: ILanguage): Promise<any> {
    await this.LanguageRepo.removeLanguage(Language);
    return this.getLanguages()
  }

  public async updateLanguage(LanguageInputDTO: ILanguage): Promise<ILanguage> {
    return this.LanguageRepo.updateLanguage(LanguageInputDTO);
  }
}