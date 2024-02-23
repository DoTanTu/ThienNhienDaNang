import { Service, Inject } from 'typedi';
import OrderRepository from '../repository/orderRepository';
import { IOrder, IOrderInputDTO, IOrderQuery } from '../models/interfaces/IOrder';
import { ROLE } from '../utils/role';

export interface IOrderService {
  getOrders(query : IOrderQuery): Promise<{items : any[], total : Number }>
  getOrderInfo(OrderId : IOrder): Promise<any>
  addOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder>
  removeOrder(Order: IOrder): Promise<any>
  updateOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder> 
}

@Service()
export default class OrderService implements IOrderService {
  OrderRepo: OrderRepository;

  constructor(@Inject() OrderRepo: OrderRepository) {
    this.OrderRepo = OrderRepo;
  }
  public async getOrders(query : IOrderQuery): Promise<{items : any[], total : Number }> {
    let queryProduct = query
    if (queryProduct.userId) {
      if (query.role == ROLE.Author || query.role == ROLE.Manager || query.role == ROLE.Admin) {
        queryProduct.userId = ""
      }
    }
    
    return {
      items : await this.OrderRepo.getOrders(query),
      total : await this.OrderRepo.getOrderCount(query)
    };
  }

  public async getOrderInfo(OrderId : IOrder): Promise<any> {
    return this.OrderRepo.getOrderInfo(OrderId);
  }

  public async addOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder> {
    return this.OrderRepo.addOrder(OrderInputDTO);
  }

  public async removeOrder(Order: IOrder): Promise<any> {
    return this.OrderRepo.removeOrder(Order);
  }

  public async updateOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder> {
    return this.OrderRepo.updateOrder(OrderInputDTO);
  }
}