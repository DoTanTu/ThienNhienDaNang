import { Inject, Service } from 'typedi';
import { IUserInputDTO, IUser, IUserQuery } from '../models/interfaces/IUser';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

export interface IUserRepository {
  getUsers(query : IUserQuery): Promise<any[]>;
  getUserInfo(query : IUser): Promise<IUser>;
  getWithRole(roles : any): Promise<any[]>;
  getUserCount(role : string) : Promise<Number>;
  addUser(userInputDTO : IUserInputDTO): Promise<IUser> 
  removeUser(user : IUser): Promise<any>
  updatePassword(hashPassword : any, salt : any, passwordSave : string) : Promise<any>
  editProfile(user: IUser): Promise<IUser>
}

@Service()
export default class UserRepository implements IUserRepository {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger
  ) {}

  public async getUsers(query : IUserQuery): Promise<any[]> {
    if (query.query) {
      return this.userModel
      .find({
        fullname:{ '$regex' : query.query, '$options' : 'i' },
        isDelete: { $in: [false, null] },
      })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
    }
    return this.userModel
      .find({
        isDelete: { $in: [false, null] },
      })
      .sort({
        createdAt: -1,
      })
      .skip(query.start)
      .limit(query.limit)
  }

  public async getUserInfo(query : IUser): Promise<IUser> {
    return this.userModel.findById(query._id)
  }

  public async getUserCount(role : string): Promise<Number> {
    return this.userModel.find({
      isDelete: { $in: [false, null] },
    }).count()
  }

  public async getWithRole(roles : any): Promise<any[]> {
    return this.userModel
      .find({
        isDelete: { $in: [false, null] },
        role : { $in: roles },
      })
      .sort({
        createdAt: -1,
      })
  }


  public async addUser(userInputDTO: IUserInputDTO): Promise<IUser> {
    try {
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
        savePassword: userInputDTO.password,
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome username');

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async removeUser(user: IUser): Promise<any> {
    return this.userModel.findByIdAndRemove(user._id)
  }

  public async editProfile(
    user: IUser
  ): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(
      { _id: user._id },
      user
    );
  }

  public async updatePassword(user: IUser, password : string): Promise<any> {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });
    return this.userModel.findOneAndUpdate({_id: user._id},{$set:{password: hashedPassword, salt: salt.toString('hex'),  savePassword: password}})
  }
}
