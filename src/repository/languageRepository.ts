import { Inject, Service } from 'typedi';
import { ILanguage, ILanguageQuery } from '../models/interfaces/ILanguage';

export interface ILanguageRepository {
  getLanguages(query : ILanguageQuery): Promise<any[]>;
  getLanguageInfo(query : ILanguage): Promise<ILanguage>;
  getLanguageCount() : Promise<Number>;
  addLanguage(LanguageInputDTO : ILanguage): Promise<ILanguage> 
  removeLanguage(Language : ILanguage): Promise<any>
}

@Service()
export default class LanguageRepository implements ILanguageRepository {
  constructor(
    @Inject('languageModel') private LanguageModel: Models.LanguageModel,
    @Inject('logger') private logger
  ) {}

  public async getLanguages(query : ILanguageQuery): Promise<any[]> {
    if (query && query.query) {
      return this.LanguageModel
      .find({
        $or:[ { code:{ '$regex' : query.query, '$options' : 'i' }},
                { name:{ '$regex' : query.query, '$options' : 'i' }} ],
        isDelete: { $in: [false, null] },
      })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
    }
    return this.LanguageModel
      .find({
        isDelete: { $in: [false, null] },
      })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
  }

  public async getLanguageInfo(query : ILanguage): Promise<ILanguage> {
    return this.LanguageModel.findById(query._id)
  }

  public async getLanguageCount(): Promise<Number> {
    return this.LanguageModel.find({
      isDelete: { $in: [false, null] },
    }).count()
  }

  public async addLanguage(languageModel: ILanguage): Promise<ILanguage> {
    try {
      const record = await this.LanguageModel.create(languageModel);

      if (!record) {
        throw new Error('Language cannot be created');
      }

      return record.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeLanguage(Language: ILanguage): Promise<any> {
    return this.LanguageModel.findByIdAndRemove(Language._id)
  }

  public async updateLanguage(LanguageInputDTO: ILanguage): Promise<ILanguage> {
    try {
      const record = await this.LanguageModel.findByIdAndUpdate(LanguageInputDTO._id,LanguageInputDTO);


      if (!record) {
        throw new Error('Language cannot be update');
      }

      return record.toObject();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
