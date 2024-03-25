import { Inject, Service } from 'typedi';
import { ICategoryInputDTO, ICategory, ICategoryQuery } from '../models/interfaces/ICategory';
import { STATUS } from '../utils/status';

export interface ICategoryRepository {
  getCategories(query: ICategoryQuery): Promise<any[]>;
  getCategoriesWithProducts(pageId: any, isFullFieldProduct : any): Promise<any[]>;
  getCategoryInfo(query: ICategoryQuery, isFullFieldProduct : any): Promise<ICategory>;
  getCategoryCount(query: ICategoryQuery): Promise<Number>;
  addCategory(CategoryInputDTO: ICategoryInputDTO): Promise<ICategory>;
  removeCategory(Category: ICategory): Promise<any>;
  updateCategory(CategoryInputDTO : ICategoryInputDTO) : Promise<ICategory>
}

@Service()
export default class CategoryRepository implements ICategoryRepository {
  constructor(
    @Inject('categoryModel') private CategoryModel: Models.CategoryModel,
    @Inject('logger') private logger
  ) {}

  public async getCategories(query: ICategoryQuery): Promise<any[]> {
    var queryLanguage = query.language
    if (!queryLanguage) {
      queryLanguage = ""
    }

    if (query != null && query.query) {
      return this.CategoryModel.find({
        pageId : query.pageId,
        name: { $regex: query.query, $options: 'i' },
        isDelete : { $in: [false, null] },
        language : { $in: [queryLanguage, null, ""] },
      })
        .sort({
          createdAt: -1,
        })
        .skip(query.start)
        .limit(query.limit);
    }
    return this.CategoryModel.find({
      pageId : query.pageId,
      isDelete : { $in: [false, null] },
      language : { $in: [queryLanguage, null, ""] },
    })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit);
  }

  public async getCategoriesWithProducts(pageId: any, isFullFieldProduct : any): Promise<any[]> {
    var populateProducts : any = {
      path: "products",
      select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",     
      match: {
        'status': { $in: [STATUS.Active] },
        'is_delete': { $in: [null, false] }
      },
      limit: 6
    }
    if (isFullFieldProduct == true) {
      populateProducts = {
        path: "products",
        match: {
          'status': { $in: [STATUS.Active] },
          'is_delete': { $in: [null, false] }
        },
        limit: 6
      }
    }
    
    return this.CategoryModel.find({
      pageId : pageId,
      isDelete : { $in: [false, null] }
    })
    .sort({
      createdAt: -1,
    })
    .populate(populateProducts)
  }


  public async getCategoryInfo(query : ICategoryQuery ,isFullFieldProduct : any): Promise<ICategory> {
    var populateProducts : any = {
      path: "products",
      select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",
      match: {
        'status': { $in: [STATUS.Active] },
        'is_delete': { $in: [null, false] }
      },
      skip : query.start,
      limit: query.limit
    }
    if (isFullFieldProduct == true) {
      populateProducts =  {
        path: "products",
        match: {
          'status': { $in: [STATUS.Active] },
          'is_delete': { $in: [null, false] }
        }
      }
    }

    return this.CategoryModel.findById(query._id)
    .populate(populateProducts);
  }

  public async getCategoryCountByProducts(query : ICategoryQuery): Promise<ICategory> {
    var populateProducts : any = {
      path: "products",
      select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",     
      match: {
        'status': { $in: [STATUS.Active] },
        'is_delete': { $in: [null, false] }
      },
    }
    return this.CategoryModel.findById(query._id)
    .populate(populateProducts);
  }

  public async getCategoryCount(query: ICategoryQuery): Promise<Number> {
    return this.CategoryModel.find({
      pageId : query.pageId,
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addCategory(CategoryInputDTO: ICategoryInputDTO): Promise<ICategory> {
    try {
      const record = await this.CategoryModel.create(CategoryInputDTO);

      if (!record) {
        throw new Error('Category cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateCategory(CategoryInputDTO: ICategoryInputDTO): Promise<ICategory> {
    try {
      const record = await this.CategoryModel.findByIdAndUpdate(CategoryInputDTO._id, CategoryInputDTO);

      if (!record) {
        throw new Error('Category cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removeCategory(Category: ICategory): Promise<any> {
    return this.CategoryModel.findByIdAndRemove(Category._id);
  }
}
