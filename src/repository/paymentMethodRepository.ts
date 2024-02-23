import { Inject, Service } from 'typedi';
import {
  IDTOPaymentMethod,
  IPaymentMethod,
  IPaymentMethodQuery,
} from '../models/interfaces/IPaymentMethod';

export interface IPaymentMethodRepository {
  getPaymentMethods(query: IPaymentMethodQuery): Promise<any[]>;
  getPaymentInfoByMethod(method: any): Promise<IPaymentMethod>;
  getPaymentMethodInfoById(paymentMethod: IPaymentMethod): Promise<IPaymentMethod>
  getPaymentMethodCount(): Promise<Number>;
  addPaymentMethod(PaymentMethodInputDTO: IDTOPaymentMethod): Promise<IPaymentMethod>;
  removePaymentMethod(PaymentMethod: IPaymentMethod): Promise<any>;
}

@Service()
export default class PaymentMethodRepository implements IPaymentMethodRepository {
  constructor(
    @Inject('paymentMethodModel') private PaymentMethodModel: Models.PaymentMethodModel,
    @Inject('logger') private logger
  ) {}

  public async getPaymentMethods(query: IPaymentMethodQuery): Promise<any[]> {
    var options: any = {
      isDelete: { $in: [false, null] },
    };
    var selectString = "_id paymentMethod accountName accountNumber bankName status pKey"
    if (query != null) {
      if (query.query) {
        options.name = { $regex: query.query, $options: 'i' };
      }
      if(query.isFullField == true){
        selectString = "_id paymentMethod accountName accountNumber bankName status pKey sKey"
      }
    }
    return this.PaymentMethodModel.find(options)
      .select(selectString)
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit);
  }

  public async getPaymentInfoByMethod(method: any): Promise<IPaymentMethod> {
    return this.PaymentMethodModel.findOne({
      paymentMethod : method 
    }).select("_id status pKey sKey")
  }

  public async getPaymentMethodInfoById(paymentMethod: IPaymentMethod): Promise<IPaymentMethod> {
    return this.PaymentMethodModel.findById(paymentMethod._id).select("_id status pKey sKey")
  }

  public async getPaymentMethodCount(): Promise<Number> {
    return this.PaymentMethodModel.find({
      isDelete: { $in: [false, null] },
    }).count();
  }

  public async addPaymentMethod(
    PaymentMethodModel: IDTOPaymentMethod
  ): Promise<IPaymentMethod> {
    try {
      const record = await this.PaymentMethodModel.create(PaymentMethodModel);

      if (!record) {
        throw new Error('PaymentMethod cannot be created');
      }
      const paymentObject = record.toObject();
      Reflect.deleteProperty(paymentObject, "sKey");
      return paymentObject;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removePaymentMethod(PaymentMethod: IPaymentMethod): Promise<any> {
    return this.PaymentMethodModel.findByIdAndRemove(PaymentMethod._id);
  }

  public async updatePaymentMethod(
    PaymentMethodInputDTO: IPaymentMethod
  ): Promise<IPaymentMethod> {
    try {
      const record = await this.PaymentMethodModel.findByIdAndUpdate(
        PaymentMethodInputDTO._id,
        PaymentMethodInputDTO
      );

      if (!record) {
        throw new Error('PaymentMethod cannot be update');
      }

      const paymentObject = record.toObject();
      Reflect.deleteProperty(paymentObject, "sKey");
      return paymentObject;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
