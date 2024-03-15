import { Inject, Service } from "typedi";
import {
  ICustomerInputDTO,
  ICustomer,
  ICustomerQuery,
} from "../models/interfaces/ICustomer";
import * as argon2 from "argon2";
import { randomBytes } from "crypto";

export interface ICustomerRepository {
  getCustomers(query: ICustomerQuery): Promise<any[]>;
  getCustomerInfo(query: ICustomer): Promise<ICustomer>;
  getCustomerCount(): Promise<Number>;
  addCustomer(CustomerInputDTO: ICustomerInputDTO): Promise<ICustomer>;
  removeCustomer(Customer: ICustomer): Promise<any>;
  updatePassword(
    hashPassword: any,
    salt: any,
    passwordSave: string
  ): Promise<any>;
  getCustomerByMail(_email:any): Promise<ICustomer>;
  activeCustomer(
    Customer: ICustomer
  ): Promise<any>
  editProfile(CustomerInputDTO: ICustomerInputDTO): Promise<ICustomer>;
  getProfile(query: ICustomer): Promise<ICustomer>;
  getBasicInfo(query: ICustomer): Promise<ICustomer>;
  updateStatusCustomer(Customer: ICustomer, isBlock : any): Promise<any>
}

@Service()
export default class CustomerRepository implements ICustomerRepository {
  constructor(
    @Inject("customerModel") private CustomerModel: Models.CustomerModel,
    @Inject("logger") private logger
  ) {}

  public async getCustomers(query: ICustomerQuery): Promise<any[]> {
    if (query.query) {
      return this.CustomerModel.find({
        $or: [
          { fullname: { $regex: query.query, $options: "i" } },
          { username: { $regex: query.query, $options: "i" } },
          { email: { $regex: query.query, $options: "i" } },
          { address: { $regex: query.query, $options: "i" } },
          { phone: { $regex: query.query, $options: "i" } },
        ],
        isDelete: { $in: [false, null] },
      })
        .sort({
          createdAt: -1,
        })
        .skip(query.start)
        .limit(query.limit);
    }
    return this.CustomerModel.find({
      isDelete: { $in: [false, null] },
    })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit);
  }

  public async getFullCustomers(): Promise<any[]>{
    return this.CustomerModel.find()
    .select("fullname avatar username email")
    .exec();
  }

  public async getActiveCustomersList(): Promise<any[]>{
    return this.CustomerModel.find({
      isActive: true,
    })
    .select("fullname username email")
    .exec();
  }

  public async getCustomerInfo(query: ICustomer): Promise<ICustomer> {
    return this.CustomerModel.findById(query._id)
  }

  public async getProfile(query: ICustomer): Promise<ICustomer> {
    return this.CustomerModel.findById(query._id)
      .select("fullname avatar username email phone address country description links");
  }

  public async getBasicInfo(query: ICustomer): Promise<ICustomer> {
    return this.CustomerModel.findById(query._id)
      .select("_id fullname avatar username email phone address");
  }

  public async getCustomerByMail(
    _email: any
  ): Promise<ICustomer> {
    return this.CustomerModel.findOne({
      email :  _email,
      isActive: true,
      isDelete: { $in: [false, null] },
      isBlock: { $in: [false, null] },
    });
  }

  public async getCustomerCount(): Promise<Number> {
    return this.CustomerModel.find({
      isDelete: { $in: [false, null] },
    }).count();
  }

  public async addCustomer(
    CustomerInputDTO: ICustomerInputDTO
  ): Promise<ICustomer> {
    try {
      const salt = randomBytes(32);
      this.logger.silly("Hashing password");
      const hashedPassword = await argon2.hash(CustomerInputDTO.password, {
        salt,
      });
      this.logger.silly("Creating Customer db record");
      const CustomerRecord = await this.CustomerModel.create({
        ...CustomerInputDTO,
        salt: salt.toString("hex"),
        password: hashedPassword,
      });

      if (!CustomerRecord) {
        throw new Error("Customer cannot be created");
      }
      this.logger.silly("Sending welcome Customername");

      const Customer = CustomerRecord.toObject();
      Reflect.deleteProperty(Customer, "password");
      Reflect.deleteProperty(Customer, "salt");
      return Customer;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addAndUpdateContribution(CustomerId: string, productId: string) : Promise<string> {
    const updatedCustomer = await this.CustomerModel.findByIdAndUpdate(
      CustomerId,
      { $addToSet: { contributes: productId } }, 
      { new: true } 
    );
    return updatedCustomer.fullname;
  }

  public async removeContributeByProduct(productId: string) : Promise<any> {
      return this.CustomerModel.updateMany(
          { contributes: productId }, 
          { $pull: { contributes: productId } } 
      );
  }

  public async removeCustomer(Customer: ICustomer): Promise<any> {
    return this.CustomerModel.findByIdAndRemove(Customer._id);
  }

  public async updatePassword(
    Customer: ICustomer,
    password: string
  ): Promise<any> {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });
    return this.CustomerModel.findByIdAndUpdate(
      { _id: Customer._id },
      {
        $set: {
          password: hashedPassword,
          salt: salt.toString("hex"),
          savePassword: password,
        },
      }
    );
  }

  public async activeCustomer(
    Customer: ICustomer
  ): Promise<any> {
    return this.CustomerModel.findByIdAndUpdate(
      { _id: Customer._id },
      {
        $set: {
          isActive: true,
        },
      }
    );
  }

  public async updateStatusCustomer(
    Customer: ICustomer,
    isBlock : any
  ): Promise<any> {
    return this.CustomerModel.findByIdAndUpdate(
      { _id: Customer._id },
      {
        $set: {
          isBlock: isBlock,
        },
      }
    );
  }

  public async editProfile(
    Customer: ICustomer
  ): Promise<ICustomer> {
    return this.CustomerModel.findByIdAndUpdate(
      { _id: Customer._id },
      Customer
    );
  }
}
