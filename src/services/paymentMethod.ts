import { Service, Inject } from 'typedi';
import PaymentMethodRepository from '../repository/paymentMethodRepository';
import { IDTOPaymentMethod, IPaymentMethod, IPaymentMethodQuery } from '../models/interfaces/IPaymentMethod';

export interface IPaymentMethodService {
  getPaymentMethods(): Promise<any>
  getFullDataPaymentMethods(query : IPaymentMethodQuery): Promise<{items : any[], total : Number }>
  getPaymentInfoByMethod(method : any): Promise<IPaymentMethod>
  getPaymentMethodInfoById(id : any): Promise<IPaymentMethod>
  addPaymentMethod(PaymentMethodInputDTO: IDTOPaymentMethod): Promise<IPaymentMethod>
  removePaymentMethod(PaymentMethod: IPaymentMethod): Promise<any>
  updatePaymentMethod(PaymentMethodInputDTO : IPaymentMethod) : Promise<IPaymentMethod>
}

@Service()
export default class PaymentMethodService implements IPaymentMethodService {
  PaymentMethodRepo: PaymentMethodRepository;

  constructor(@Inject() PaymentMethodRepo: PaymentMethodRepository) {
    this.PaymentMethodRepo = PaymentMethodRepo;
  }

  public async getPaymentMethods(): Promise<any> {
    return this.PaymentMethodRepo.getPaymentMethods({start : 0, limit : 100, isFullField : true} as IPaymentMethodQuery)
  }

  public async getFullDataPaymentMethods(query : IPaymentMethodQuery): Promise<{items : any[], total : Number }> {
    return {
      items : await this.PaymentMethodRepo.getPaymentMethods(query),
      total : await this.PaymentMethodRepo.getPaymentMethodCount()
    };
  }

  public async getPaymentInfoByMethod(method: any): Promise<IPaymentMethod> {
    return this.PaymentMethodRepo.getPaymentInfoByMethod(method);
  }

  public async getPaymentMethodInfoById(id: any): Promise<IPaymentMethod> {
    return this.PaymentMethodRepo.getPaymentMethodInfoById({ _id : id} as IPaymentMethod);
  }

  public async addPaymentMethod(PaymentMethodInputDTO: IDTOPaymentMethod): Promise<any> {
    await this.PaymentMethodRepo.addPaymentMethod(PaymentMethodInputDTO);
    return this.getPaymentMethods()
  }

  public async removePaymentMethod(PaymentMethod: IPaymentMethod): Promise<any> {
    await this.PaymentMethodRepo.removePaymentMethod(PaymentMethod);
    return this.getPaymentMethods()
  }

  public async updatePaymentMethod(PaymentMethodInputDTO: IPaymentMethod): Promise<IPaymentMethod> {
    return this.PaymentMethodRepo.updatePaymentMethod(PaymentMethodInputDTO);
  }
}