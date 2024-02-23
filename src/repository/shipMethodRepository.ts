import { Inject, Service } from 'typedi';
import {
  IDTOShipMethod,
  IShipMethod,
  IShipMethodQuery,
} from '../models/interfaces/IShipMethod';

export interface IShipMethodRepository {
  getShipMethods(query: IShipMethodQuery): Promise<any[]>;
  getShipMethodInfo(query: IShipMethod): Promise<IShipMethod>;
  getShipMethodCount(): Promise<Number>;
  addShipMethod(ShipMethodInputDTO: IDTOShipMethod): Promise<IShipMethod>;
  removeShipMethod(ShipMethod: IShipMethod): Promise<any>;
}

@Service()
export default class ShipMethodRepository implements IShipMethodRepository {
  constructor(
    @Inject('shipMethodModel') private ShipMethodModel: Models.ShipMethodModel,
    @Inject('logger') private logger
  ) {}

  public async getShipMethods(query: IShipMethodQuery): Promise<any[]> {
    var options: any = {
      isDelete: { $in: [false, null] },
    };
    if (query != null) {
      if (query.query) {
        options.name = { $regex: query.query, $options: 'i' };
      }
    }
    return this.ShipMethodModel.find(options)
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit);
  }

  public async getShipMethodInfo(query: IShipMethod): Promise<IShipMethod> {
    return this.ShipMethodModel.findById(query._id);
  }

  public async getShipMethodCount(): Promise<Number> {
    return this.ShipMethodModel.find({
      isDelete: { $in: [false, null] },
    }).count();
  }

  public async addShipMethod(
    ShipMethodModel: IDTOShipMethod
  ): Promise<IShipMethod> {
    try {
      const record = await this.ShipMethodModel.create(ShipMethodModel);

      if (!record) {
        throw new Error('ShipMethod cannot be created');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeShipMethod(ShipMethod: IShipMethod): Promise<any> {
    return this.ShipMethodModel.findByIdAndRemove(ShipMethod._id);
  }

  public async updateShipMethod(
    ShipMethodInputDTO: IShipMethod
  ): Promise<IShipMethod> {
    try {
      const record = await this.ShipMethodModel.findByIdAndUpdate(
        ShipMethodInputDTO._id,
        ShipMethodInputDTO
      );

      if (!record) {
        throw new Error('ShipMethod cannot be update');
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
