import { Service, Inject } from 'typedi';
import ProductRepository from '../repository/productRepository';
import { IProduct, IProductInputDTO, IProductQuery } from '../models/interfaces/IProduct';
import UserRepository from '../repository/userRepository';
import { IUser, IUserQuery } from '../models/interfaces/IUser';
import { ROLE } from '../utils/role';

export interface IProductService {
  getProducts(query : IProductQuery): Promise<{items : any[], total : Number }>
  getProductInfo(ProductId : IProduct): Promise<IProduct>
  addProduct(ProductInputDTO: IProductInputDTO): Promise<IProduct>
  removeProduct(Product: IProduct): Promise<any>
  updateProduct(ProductInputDTO : IProductInputDTO) : Promise<IProduct>
}

@Service()
export default class ProductService implements IProductService {
  ProductRepo: ProductRepository;

  constructor(@Inject() ProductRepo: ProductRepository) {
    this.ProductRepo = ProductRepo;
  }

  public async getProducts(query : IProductQuery): Promise<{items : any[], total : Number }> {
    let queryProduct = query
    if (queryProduct.userId) {
      if (query.role == ROLE.Author || query.role == ROLE.Manager || query.role == ROLE.Admin) {
        queryProduct.userId = ""
      }
    }
    
    return {
      items : await this.ProductRepo.getProducts(queryProduct),
      total : await this.ProductRepo.getProductCount(queryProduct)
    };
  }

  public async getProductInfo(ProductId : IProduct): Promise<IProduct> {
    return this.ProductRepo.getProductInfo(ProductId);
  }

  public async addProduct(ProductInputDTO: IProductInputDTO): Promise<IProduct> {
    return this.ProductRepo.addProduct(ProductInputDTO);
  }

  public async removeProduct(Product: IProduct): Promise<any> {
    return this.ProductRepo.removeProduct(Product);
  }

  public async updateProduct(ProductInputDTO: IProductInputDTO): Promise<IProduct> {
    return this.ProductRepo.updateProduct(ProductInputDTO);
  }
}