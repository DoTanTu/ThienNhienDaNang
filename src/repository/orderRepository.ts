import { Inject, Service } from "typedi";
import {
  IOrderInputDTO,
  IOrder,
  IOrderQuery,
} from "../models/interfaces/IOrder";
import { STATUS } from "../utils/status";

export interface IOrderRepository {
  getOrders(query: IOrderQuery): Promise<any[]>;
  getOrderInfo(query: IOrder): Promise<any>;
  getOrderCount(query : IOrderQuery): Promise<Number>;
  addOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder>;
  updateOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder>;
  removeOrder(Order: IOrder): Promise<any>;
  getOrderByCustomer(customerId: string, email : string): Promise<any>;
}

@Service()
export default class OrderRepository implements IOrderRepository {
  constructor(
    @Inject("orderModel") private OrderModel: Models.OrderModel,
    @Inject("logger") private logger
  ) {}

  public async getOrders(query: IOrderQuery): Promise<any[]> {
    var queryString : any = {
      isDelete: { $in: [false, null] },
    }
    if (query != null) {
      if (query.query && query.query != "") {
        queryString = {
          name: { $regex: query.query, $options: "i" },
          isDelete: { $in: [false, null] },
        }
      }

      if (query.userId && query.userId != "") {
        queryString.userPost = { $in: [query.userId] }
      }
    }
    return this.OrderModel.find(queryString)
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
      .populate({
        path: "productList",
        select: "_id url pageId categoryIds name images counter ecommercePlus ecommerce label hashtags languages",     
        match: {
          status: { $in: [STATUS.Active] },
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "paymend",
        match: {
          is_delete: { $in: [null, false] },
        },
      });;
  }

  public async getOrderInfo(query: IOrder): Promise<any> {
    return this.OrderModel.findById(query._id)
      .populate({
        path: "productList",
        select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",     
        match: {
          status: { $in: [STATUS.Active] },
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "categoryList",
        match: {
          status: { $in: [STATUS.Active] },
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "ship",
        match: {
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "paymend",
        match: {
          is_delete: { $in: [null, false] },
        },
      });
  }

  public async getOrderCount(query : IOrderQuery): Promise<Number> {
    var queryString : any = {
      isDelete: { $in: [false, null] },
    }
    if (query != null) {
      if (query.query && query.query != "") {
        queryString = {
          name: { $regex: query.query, $options: "i" },
          isDelete: { $in: [false, null] },
        }
      }

      if (query.userId && query.userId != "") {
        queryString.userId = { $in: [query.userId] }
      }
    }
    return this.OrderModel.find(queryString).count();
  }

  public async addOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder> {
    try {
      const record = await this.OrderModel.create(OrderInputDTO);

      if (!record) {
        throw new Error("Order cannot be created");
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateOrder(OrderInputDTO: IOrderInputDTO): Promise<IOrder> {
    try {
      const record = await this.OrderModel.findByIdAndUpdate(
        OrderInputDTO._id,
        OrderInputDTO
      ).populate({
        path: "productList",
        select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",     
        match: {
          status: { $in: [STATUS.Active] },
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "categoryList",
        match: {
          status: { $in: [STATUS.Active] },
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "ship",
        match: {
          is_delete: { $in: [null, false] },
        },
      })
      .populate({
        path: "paymend",
        match: {
          is_delete: { $in: [null, false] },
        },
      });

      if (!record) {
        throw new Error("Order cannot be update");
      }

      return record;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeOrder(Order: IOrder): Promise<any> {
    return this.OrderModel.findByIdAndRemove(Order._id);
  }

  public async getOrderByCustomer(customerId: string, email : string): Promise<any> {
    return this.OrderModel.find({
      $or: [
        { customerId: { $in: [customerId] }},
        { customerId: email},
        { 'billingAddress.email': email },
        { 'shippingAddress.email': email },
      ],
      isDelete: { $in: [false, null] },
    })
      .sort({
        _id: -1,
      })
      .populate({
        path: "productList",
        select: "_id url pageId showTop categoryIds name images counter ecommercePlus ecommerce desShort label hashtags createdAt languages",     
        match: {
          status: { $in: [STATUS.Active] },
          is_delete: { $in: [null, false] },
        },
      });
  }
}
