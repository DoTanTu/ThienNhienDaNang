import { Service, Inject } from "typedi";
import CustomerRepository from "../repository/customerRepository";
import {
  ICustomer,
  ICustomerInputDTO,
  ICustomerQuery,
} from "../models/interfaces/ICustomer";
import Logger from "../setup/logger";
import config from "../config";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import OrderRepository from "../repository/orderRepository";

export interface ICustomerService {
  getCustomers(query: ICustomerQuery): Promise<{ items: any[]; total: Number }>;
  getFullCustomers(): Promise<{ users: any[]}>;
  getCustomerInfo(CustomerId: ICustomer): Promise<ICustomer>;
  addCustomer(CustomerInputDTO: ICustomerInputDTO): Promise<ICustomer>;
  removeCustomer(Customer: ICustomer): Promise<any>;
  updatePassword(CustomerId: any, passOld: any, passNew: any): Promise<any>;
  signInCustomer(
    email: string,
    password: string
  ): Promise<{ user: any; token: string }>;
  activeCustomer(customerId: any): Promise<any>;
  editProfile(CustomerInputDTO: ICustomer): Promise<ICustomer>;
  getOrderByCustomer(customerId: any, email : any): Promise<any>;
  resetPassword(customerId: any, passNew: any): Promise<any>;
  updateStatusCustomer(customerId: any, isBlock : any): Promise<any>
}

@Service()
export default class CustomerService implements ICustomerService {
  CustomerRepo: CustomerRepository;
  OrderRepo: OrderRepository;

  constructor(@Inject() CustomerRepo: CustomerRepository, @Inject() OrderRepo: OrderRepository) {
    this.CustomerRepo = CustomerRepo;
    this.OrderRepo = OrderRepo;
  }

  public async getCustomers( query: ICustomerQuery): Promise<{ items: any[]; total: Number }> {
    return {
      items: await this.CustomerRepo.getCustomers(query),
      total: await this.CustomerRepo.getCustomerCount(),
    };
  }

  public async getFullCustomers() : Promise< {users : any[]}>{
    return {
      users : await this.CustomerRepo.getFullCustomers()
    } 
  }
  public async getCustomerInfo(CustomerId: ICustomer): Promise<ICustomer> {
    return await this.CustomerRepo.getCustomerInfo(CustomerId);
  }

  public async addCustomer(
    CustomerInputDTO: ICustomerInputDTO
  ): Promise<ICustomer> {
    return this.CustomerRepo.addCustomer(CustomerInputDTO);
  }

  public async signInCustomer(
    email: string,
    password: string
  ): Promise<{ user: any; token: string }> {
    const userRecord = await this.CustomerRepo.getCustomerByMail(email);

    console.log(email);
    
    if (!userRecord) {
      throw new Error("User not registered");
    }
    const validPassword = await argon2.verify(userRecord.password, password);

    if (validPassword) {
      const token = this.generateToken(userRecord);

      const user = userRecord;
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } else {
      throw new Error("Invalid Password");
    }
  }

  public async removeCustomer(Customer: ICustomer): Promise<any> {
    return this.CustomerRepo.removeCustomer(Customer);
  }

  public async updatePassword(
    CustomerId: any,
    passOld: any,
    passNew: any
  ): Promise<any> {
    let CustomerRecord = await this.CustomerRepo.getCustomerInfo({
      _id: CustomerId,
    } as ICustomer);
    if (!CustomerRecord) return false;
    const validPassword = await argon2.verify(CustomerRecord.password, passOld);
    if (validPassword) {
      let status = await this.CustomerRepo.updatePassword(
        { _id: CustomerId } as ICustomer,
        passNew
      );
      if (status) {
        return true;
      }
    }
    return false;
  }

  public async resetPassword(
    email: any,
    passNew: any
  ): Promise<any> {
    let customer = await this.CustomerRepo.getCustomerByMail(email)

    if (customer) {
      let CustomerRecord = await this.CustomerRepo.updatePassword(
        { _id: customer._id } as ICustomer,
        passNew
      );
      if (CustomerRecord) {
        return CustomerRecord;
      }
    }
   
    return null;
  }

  public async activeCustomer(customerId: any): Promise<any> {
    return this.CustomerRepo.activeCustomer({ _id: customerId } as ICustomer);
  }

  public async editProfile(
    CustomerInputDTO: ICustomer
  ): Promise<ICustomer> {
    return this.CustomerRepo.editProfile(CustomerInputDTO);
  }

  public async getOrderByCustomer(customerId: any, email : any): Promise<any> {
    return this.OrderRepo.getOrderByCustomer(customerId, email);
  }

  public async updateStatusCustomer(customerId: any, isBlock : any): Promise<any> {
    return this.CustomerRepo.updateStatusCustomer({ _id: customerId} as ICustomer, isBlock );
  }

  private generateToken(user) {
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: "Customer",
        email: user.email,
      },
      config.jwtCustomer,
      { expiresIn: "24h" }
    );
  }
}
