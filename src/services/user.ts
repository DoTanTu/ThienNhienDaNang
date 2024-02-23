import { Service, Inject } from 'typedi';
import UserRepository from '../repository/userRepository';
import { IUser, IUserInputDTO, IUserQuery } from '../models/interfaces/IUser';
import Logger from '../setup/logger';
import config from '../config';
import * as argon2 from 'argon2';
import { Utils } from '../utils/utils';

export interface IUserService {
  getUsers(query : IUserQuery): Promise<{items : any[], total : Number }>
  getUserInfo(userId : IUser): Promise<IUser>
  addUser(userInputDTO: IUserInputDTO): Promise<IUser>
  removeUser(user: IUser): Promise<any>
  updatePassword(userId : any, passOld : any, passNew : any) : Promise<any>
}

@Service()
export default class UserService implements IUserService {
  userRepo: UserRepository;

  constructor(@Inject() userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  public async getUsers(query : IUserQuery): Promise<{items : any[], total : Number }> {
    return {
      items : await this.userRepo.getUsers(query),
      total : await this.userRepo.getUserCount("")
    };
  }

  public async getUserInfo(userId : IUser): Promise<IUser> {
    return await this.userRepo.getUserInfo(userId);
  }

  public async addUser(userInputDTO: IUserInputDTO): Promise<IUser> {
    return this.userRepo.addUser(userInputDTO);
  }

  public async removeUser(user: IUser): Promise<any> {
    return this.userRepo.removeUser(user);
  }

  public async editProfile(
    user: IUser
  ): Promise<IUser> {
    return this.userRepo.editProfile(user);
  }

  public async updatePassword(userId : any, passOld : any, passNew : any) : Promise<any> {
      let userRecord = await this.userRepo.getUserInfo({_id : userId} as IUser)
      if(!userRecord) return false
      const validPassword = await argon2.verify(userRecord.password, passOld);
      if (validPassword) {
        let status = await this.userRepo.updatePassword({_id : userId} as IUser, passNew)
        if (status) {
          return true
        }
      } 
      return false
  }

}