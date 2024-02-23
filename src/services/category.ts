import { Service, Inject } from 'typedi';
import CategoryRepository from '../repository/categoryRepository';
import { ICategory, ICategoryInputDTO, ICategoryQuery } from '../models/interfaces/ICategory';

export interface ICategoryService {
  getCategories(pageId : any): Promise<any>
  getFullDataCategory(query : ICategoryQuery): Promise<{items : any[], total : Number }>
  getCategoryInfo(CategoryId : ICategory): Promise<ICategory>
  addCategory(CategoryInputDTO: ICategoryInputDTO): Promise<ICategory>
  removeCategory(Category: ICategory): Promise<any>
  updateCategory(CategoryInputDTO : ICategoryInputDTO) : Promise<ICategory>
}

@Service()
export default class CategoryService implements ICategoryService {
  CategoryRepo: CategoryRepository;

  constructor(@Inject() CategoryRepo: CategoryRepository) {
    this.CategoryRepo = CategoryRepo;
  }

  public async getCategories(pageId : any): Promise<any> {
    return this.CategoryRepo.getCategories({pageId : pageId, start : 0, limit : 100} as ICategoryQuery)
  }

  public async getFullDataCategory(query : ICategoryQuery): Promise<{items : any[], total : Number }> {
    return {
      items : await this.CategoryRepo.getCategories(query),
      total : await this.CategoryRepo.getCategoryCount(query)
    };
  }

  public async getCategoryInfo(CategoryId : ICategory): Promise<ICategory> {
    return this.CategoryRepo.getCategoryInfo(CategoryId, false);
  }

  public async addCategory(CategoryInputDTO: ICategoryInputDTO): Promise<ICategory> {
    return this.CategoryRepo.addCategory(CategoryInputDTO);
  }

  public async removeCategory(Category: ICategory): Promise<any> {
    return this.CategoryRepo.removeCategory(Category);
  }

  public async updateCategory(CategoryInputDTO: ICategoryInputDTO): Promise<ICategory> {
    return this.CategoryRepo.updateCategory(CategoryInputDTO);
  }
}