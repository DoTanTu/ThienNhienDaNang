import { Inject, Service } from 'typedi';
import { IProductInputDTO, IProduct, IProductQuery } from '../models/interfaces/IProduct';
import { STATUS } from '../utils/status';

export interface IProductRepository {
  getProducts(query: IProductQuery): Promise<any[]>;
  getFullFieldProducts(query: IProductQuery): Promise<any[]>;
  getProductByCategoryId(categoryId: any): Promise<any[]>;
  getProductByFillters(query: IProductQuery, isEcomercePlus : boolean): Promise<any[]>;
  getProductInfo(query: IProduct): Promise<IProduct>;
  getProductCount(query: IProductQuery): Promise<Number>;
  addProduct(ProductInputDTO: IProductInputDTO): Promise<IProduct>;
  removeProduct(Product: IProduct): Promise<any>;
  updateProduct(ProductInputDTO : IProductInputDTO) : Promise<IProduct>;
  increaseDownload(query: IProduct): Promise<number>;
}

@Service()
export default class ProductRepository implements IProductRepository {
  constructor(
    @Inject('productModel') private ProductModel: Models.ProductModel,
    @Inject('logger') private logger
  ) {}
  
  public async getProductByCategoryId(categoryId: any): Promise<any[]> {
    return this.ProductModel.find({ categoryIds : { "$in" : [categoryId]} })
      .select("_id url pageId showTop categoryIds pdf name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages")     
      .sort({
        createdAt: -1,
      })
  }

  public async getProducts(query: IProductQuery): Promise<any[]> {
    var options : any = {
      pageId : query.pageId,
      isDelete : { $in: [false, null] }
    }
    if (query != null) {
      if (query.query) {
        options.name = { $regex: query.query, $options: 'i' }
      }

      if (query.cateId && query.cateId != "") {
        options.categoryIds = { $in: [query.cateId] }
      }

      if (query.userId && query.userId != "") {
        options.userPost = { $in: [query.userId] }
      }
    }
    return this.ProductModel.find(options)
      .select("_id url pageId showTop categoryIds commentIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages")     
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
  }

  public async getFullFieldProducts(query: IProductQuery): Promise<any[]> {
    var options : any = {
      pageId : query.pageId,
      isDelete : { $in: [false, null] },
    }
    if (query != null) {
      if (query.query) {
        options.name = { $regex: query.query, $options: 'i' }
      }

      if (query.cateId && query.cateId != "") {
        options.categoryIds = { $in: [query.cateId] }
      }
      if (query.userId && query.userId != "") {
        options.userId = { $in: [query.userId] }
      }
    }
    return this.ProductModel.find(options)
      .populate({
        path: "comments",
        select: "_id text productId userId",
      })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
  }

  public async getProductByFillters(query: IProductQuery, isEcomercePlus : boolean): Promise<any[]> {
    var options : any = {
      pageId : query.pageId,
      isDelete : { $in: [false, null] }
    }
    var options2 : any
    if (query != null) {
      if (query.query) {
        options.name = { $regex: query.query, $options: 'i' }
      }

      if (query.cateId && query.cateId != "") {
        options.categoryIds = { $in: [query.cateId] }
      }

      if (query.hashtag && query.hashtag != "") {
        options.hashtags = {$elemMatch: {$in: [query.hashtag] }}
      }

      if (query.attributes && query.attributes.length > 0) {
        options.ecommercePlus = {$elemMatch: {'atribute.code' : { $in: query.attributes }} }
      }
    
      if (query.priceMin || query.priceMax) {
        if (isEcomercePlus) {
          options.ecommercePlus = {$elemMatch: {'price' : { $lte: query.priceMax || 1000000000, $gte: query.priceMin || 0 }} }
        }else{
          options2 = {"ecommerce.price" : { $lte: query.priceMax || 1000000000, $gte: query.priceMin || 0 }}
        }
      }

      if (query.label && query.label != "") {
        options.label =  { $in: [query.label] }
      }

      if (query.userId && query.userId != "") {
        options.userId = { $in: [query.userId] }
      }
    }

    return this.ProductModel.find(options).find(options2)
      .select("_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages")     
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
  }

  public async getProductInfo(query: IProduct): Promise<IProduct> {
    return this.ProductModel.findById(query._id)
    .populate({
      path: "comments",
      select: "_id text productId userId parentId createdAt",
      match : {
        isActive : true
      },
      populate: {
        path: "customers",
        select: "_id email avatar fullname"  // Các trường của User bạn muốn lấy
    }
    })
    ;
  }

  public async getProductCount(query: IProductQuery): Promise<Number> {
    return this.ProductModel.find({
      pageId : query.pageId,
      isDelete : { $in: [false, null] }
    }).count();
  }

  public async addProduct(ProductInputDTO: IProductInputDTO): Promise<IProduct> {
    try {
      const record = await this.ProductModel.create(ProductInputDTO);

      if (!record) {
        throw new Error('Product cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateViews(query: IProduct): Promise<number> {
    try {
        const currentProduct = await this.ProductModel.findById(query._id);

        if (!currentProduct) {
            throw new Error('Product not found');
        }

        const currentViews = currentProduct.views || 0;

        const updatedProduct = await this.ProductModel.findByIdAndUpdate(
            query._id,
            { $set: { views: currentViews + 1 } },
            { new: true }
        );

        if (!updatedProduct) {
            throw new Error('Product cannot be updated');
        }

        return updatedProduct.views;
    } catch (error) {
        // Xử lý lỗi nếu cần
        console.error(error);
        throw new Error('Error updating product views');
    }
}

  public async increaseDownload(query: IProduct): Promise<number> {
        const currentProduct = await this.ProductModel.findById(query._id);
        const currentDownload = currentProduct.downloads || 0;
        const updateDownload = await this.ProductModel.findByIdAndUpdate(
            query._id,
            { $set: { downloads: currentDownload + 1 } },
            { new: true }
        );
        return updateDownload.downloads;
  }

  public async updateProduct(ProductInputDTO: IProductInputDTO): Promise<IProduct> {
    try {
      const record = await this.ProductModel.findByIdAndUpdate(ProductInputDTO._id, ProductInputDTO);

      if (!record) {
        throw new Error('Product cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async removeProduct(Product: IProduct): Promise<any> {
    return this.ProductModel.findByIdAndRemove(Product._id);
  }
}
