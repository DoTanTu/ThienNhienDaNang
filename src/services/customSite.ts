import { Service, Inject } from 'typedi';
import SiteRepository from '../repository/siteRepository';
import CategoryRepository from '../repository/categoryRepository';
import ProductRepository from '../repository/productRepository';
import { ICategory } from '../models/interfaces/ICategory';
import { IProduct, IProductQuery } from '../models/interfaces/IProduct';
import ContactRepository from '../repository/contactRepository';
import LanguageRepository from '../repository/languageRepository';
import { ILanguageQuery } from '../models/interfaces/ILanguage';
import AttributeRepository from '../repository/attributeRepository';
import ShipMethodRepository from '../repository/shipMethodRepository';
import PaymentMethodRepository from '../repository/paymentMethodRepository';
import { IShipMethodQuery } from '../models/interfaces/IShipMethod';
import { IPaymentMethodQuery } from '../models/interfaces/IPaymentMethod';
import CustomerRepository from '../repository/customerRepository';
import { ICustomer } from '../models/interfaces/ICustomer';
import AppRepository from '../repository/appRepository';

export interface ICustomSiteService {
  getDataWithSites(app : any): Promise<any>
  getCategories(pageId : any, isFullFieldProduct : any): Promise<any>
  getCategoryDetail(cateId: any,isFullFieldProduct : any): Promise<any>
  getProducts(pageId: any, isFullSize : any, limitSize: number,  isFullFieldProduct : any): Promise<any>
  getProductByCategoryId(categoryId : any): Promise<any>
  getProductByFillters(query: IProductQuery, isEcomercePlus : boolean): Promise<any[]>
  getProductById(productId : any): Promise<any>
  getContact(): Promise<any>
  getLanguages() : Promise<any>
  getAtrributes(pageId: any): Promise<any>
  getShipMethod(): Promise<any>
  getPaymendMethod(): Promise<any>
  getCustomerInfo(customerId : any) : Promise<any>
  getApp() : Promise<any>
  getDataProfile(customerId : any) : Promise<any>
  updateViews(productId : any) : Promise<any>
  increaseDownload(productId : any) : Promise<number>;
}

@Service()
export default class CustomSiteService implements ICustomSiteService {
  appRepo : AppRepository;
  siteRepo: SiteRepository;
  categoryRepo: CategoryRepository;
  productRepo: ProductRepository;
  contactRepo: ContactRepository;
  languageRepo: LanguageRepository;
  attributeRepo: AttributeRepository;
  shipRepo : ShipMethodRepository;
  paymendRepo  : PaymentMethodRepository;
  customerRepo : CustomerRepository;

  constructor(@Inject() SiteRepo: SiteRepository,
  @Inject() categoryRepo: CategoryRepository,
  @Inject() productRepo: ProductRepository,
  @Inject() contactRepo: ContactRepository,
  @Inject() languageRepo: LanguageRepository,
  @Inject() attributeRepo : AttributeRepository,
  @Inject() shipRepo : ShipMethodRepository,
  @Inject() customerRepo : CustomerRepository,
  @Inject() paymendRepo : PaymentMethodRepository,
  @Inject() appRepo : AppRepository) {
    this.siteRepo = SiteRepo;
    this.categoryRepo = categoryRepo;
    this.productRepo = productRepo;
    this.contactRepo = contactRepo;
    this.languageRepo = languageRepo;
    this.attributeRepo = attributeRepo;
    this.shipRepo = shipRepo;
    this.paymendRepo = paymendRepo;
    this.customerRepo = customerRepo;
    this.appRepo = appRepo;
  }
  public async getCategories(pageId: any, isFullFieldProduct : any): Promise<any> {
    return this.categoryRepo.getCategoriesWithProducts(pageId, isFullFieldProduct)
  }

  public async getCategoryDetail(cateId: any,isFullFieldProduct : any): Promise<any> {
    return this.categoryRepo.getCategoryInfo({_id : cateId} as ICategory, isFullFieldProduct)
  }

  public async getProducts(pageId: any, isFullSize : any, limitSize: number,  isFullFiealdProduct : any): Promise<any> {
    var _limit = limitSize
    if (isFullSize == true) {
      _limit = 1000
    }
    if (isFullFiealdProduct == true) {
      return this.productRepo.getFullFieldProducts({pageId: pageId, start : 0, limit : _limit} as IProductQuery)
    }else{
      return this.productRepo.getProducts({pageId: pageId, start : 0, limit : _limit} as IProductQuery)
    }
  }
  
  public async getProductCount(pageId: any) : Promise<any> {
    return this.productRepo.getProductCount({pageId: pageId} as IProductQuery);
  }

  public async getProductByCategoryId(categoryId: any): Promise<any> {
    return this.productRepo.getProductByCategoryId(categoryId)
  }

  public async getProductById(productId: any): Promise<any> {
    
    return this.productRepo.getProductInfo({_id : productId} as IProduct)
  }

  public async getDataWithSites(app : any): Promise<any> {
    return this.siteRepo.getDataWithSites(app)
  }

  public async getContact(): Promise<any> {
    return this.contactRepo.getContact()
  }

  public async getLanguages(): Promise<any>{
    return this.languageRepo.getLanguages( {start : 0, limit : 100} as ILanguageQuery)
  }

  public async getAtrributes(pageId: any): Promise<any> {
    return this.attributeRepo.getAttributes(pageId)
  }

  public async getShipMethod(): Promise<any> {
    return this.shipRepo.getShipMethods({start : 0, limit : 100} as IShipMethodQuery)
  }

  public async getPaymendMethod(): Promise<any> {
    return this.paymendRepo.getPaymentMethods({start : 0, limit : 100} as IPaymentMethodQuery)
  }

  public async getProductByFillters(query: IProductQuery, isEcomercePlus : boolean): Promise<any[]>{
    var _limit = query.limit
    var page = query.start
    if (query.isFullSite) {
      _limit = 1000
    }
    if (!query.start) {
      page = 0
    }
    query.limit = _limit
    query.start = page * _limit
    return this.productRepo.getProductByFillters(query,isEcomercePlus)
  }

  public async getCustomerInfo(customerId : any): Promise<any> {
    return this.customerRepo.getCustomerInfo({_id : customerId} as ICustomer)
  }

  public async getApp(): Promise<any> {
    return this.appRepo.getApp()
  }

  public async getDataProfile(customerId : any): Promise<any> {
    return this.customerRepo.getProfile({_id : customerId} as ICustomer)
  }

  public async updateViews(productId: any): Promise<any> {
    return this.productRepo.updateViews({_id : productId} as IProduct)
  }
  
  public async increaseDownload(productId: any): Promise<number> {
    return this.productRepo.increaseDownload({_id : productId} as IProduct);
  }
}