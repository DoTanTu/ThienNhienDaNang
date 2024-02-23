// import { Inject, Service } from 'typedi';
// import { IUserSetting, IUserSettingInputDTO } from '../interfaces/IUserSetting';
// import { IUserSettingRepository } from './iUserSettingRepository';

// @Service()
// export default class UserSettingRepository implements IUserSettingRepository {
//   constructor(
//     @Inject('userSettingModel') private userSetting: Models.UserSettingModel,
//     @Inject('logger') private logger
//   ) {}
//       public async removeAllUserSetting(userId: string): Promise<any> {
//         try {
//           await this.userSetting.deleteMany({ userId : userId});
//           console.log('All Data successfully deleted');
//           return true;
//         } catch (err) {
//           console.log(err);
//           return false;
//         }
//       }
//       public async removeUserSetting(user: IUserSetting): Promise<any> {
//         return this.userSetting.findByIdAndRemove(user._id)
//       }
      
//       public async getSettingByUserId(userId: string): Promise<any[]> {
//         return this.userSetting
//           .find({
//             userId : userId
//           })
//           .sort({
//             _id: -1,
//           })
//           .populate({
//             path: "clusterInfo",
//             select: "address ProxyInfo",
//             match: {
//               'isBlock': { $in: [null, false] },
//               'isDelete': { $in: [null, false] }
//             },
//             populate : {
//               path : 'proxyCount',
//               select: "_id clusterId userSettingId",
//               match: {
//                 'userId': userId,
//               },
//             },})
//       }

//       public async addUserSetting(setting: IUserSettingInputDTO): Promise<any> {
//         console.log(setting);
        
//         try {
//           const record = await this.userSetting.create(setting)
    
//           if (!record) {
//             throw new Error('Cluster cannot be created');
//           }
    
//           return record.toObject();
//         } catch (e) {
//           this.logger.error(e);
//           throw e;
//         }
//       }

//       public async checkUseBasicMode(userId: string): Promise<boolean> {
//         return this.userSetting
//           .exists({
//             userId : userId,
//             authMode : "Basic"
//           })
//       }
// }
