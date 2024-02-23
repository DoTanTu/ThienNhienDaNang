import { Service, Inject } from 'typedi';
import ShipMethodRepository from '../repository/shipMethodRepository';
import { IDTOShipMethod, IShipMethod, IShipMethodQuery } from '../models/interfaces/IShipMethod';

export interface IShipMethodService {
  getShipMethods(): Promise<any>
  getFullDataShipMethods(query : IShipMethodQuery): Promise<{items : any[], total : Number }>
  getShipMethodInfo(ShipMethodId : IShipMethod): Promise<IShipMethod>
  addShipMethod(ShipMethodInputDTO: IShipMethod): Promise<IShipMethod>
  removeShipMethod(ShipMethod: IShipMethod): Promise<any>
  updateShipMethod(ShipMethodInputDTO : IShipMethod) : Promise<IShipMethod>
}

@Service()
export default class ShipMethodService implements IShipMethodService {
  ShipMethodRepo: ShipMethodRepository;

  constructor(@Inject() ShipMethodRepo: ShipMethodRepository) {
    this.ShipMethodRepo = ShipMethodRepo;
  }

  public async getShipMethods(): Promise<any> {
    return this.ShipMethodRepo.getShipMethods({start : 0, limit : 100} as IShipMethodQuery)
  }

  public async getFullDataShipMethods(query : IShipMethodQuery): Promise<{items : any[], total : Number }> {
    return {
      items : await this.ShipMethodRepo.getShipMethods(query),
      total : await this.ShipMethodRepo.getShipMethodCount()
    };
  }

  public async getShipMethodInfo(ShipMethodId : IShipMethod): Promise<IShipMethod> {
    return this.ShipMethodRepo.getShipMethodInfo(ShipMethodId);
  }

  public async addShipMethod(ShipMethodInputDTO: IDTOShipMethod): Promise<any> {
    await this.ShipMethodRepo.addShipMethod(ShipMethodInputDTO);
    return this.getShipMethods()
  }

  public async removeShipMethod(ShipMethod: IShipMethod): Promise<any> {
    await this.ShipMethodRepo.removeShipMethod(ShipMethod);
    return this.getShipMethods()
  }

  public async updateShipMethod(ShipMethodInputDTO: IShipMethod): Promise<IShipMethod> {
    return this.ShipMethodRepo.updateShipMethod(ShipMethodInputDTO);
  }
}