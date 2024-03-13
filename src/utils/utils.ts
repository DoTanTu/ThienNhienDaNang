import { Proxy } from 'aws-sdk/clients/chime';
import { ACTION, ROLE } from './role';

export const LIMIT_NUM = 3;

// export enum STATUS {
//     Processing,
//     Approve,
//     Tested,
//     Reject
// }

// export function change_alias(alias) {
//     var str = alias;
//     str = str.toLowerCase();
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
//     str = str.replace(/đ/g,"d");
//     str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
//     str = str.replace(/ + /g," ");
//     str = str.trim();
//     return str;
// }

// export function imageFilter(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };

export class Utils {
  static covertToWebp(path, name){
  return path.replace('images/', 'thumbnail/'+ name + '/').replace('.png','.webp').replace('.jpg','.webp').replace('.jpeg','.webp')
  }
  static getId(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str.replace(/ /g, "_").toLowerCase();
  }

    static generateUserName() : string {
        return "user_" + (Math.random() + 1).toString(36).substring(7)
    }

    static getIdUrlSiteDetail(url : any) : string {
      try {
        if (url && (url.includes(".html") || url.includes(".cate"))) {
          let splits = url.split(".");
          if (splits.length == 3) {
            return splits[splits.length - 2]
          }
          let splits2 = splits[0].split("-");
          return splits2[splits2.length - 1]
        }
        return ""
      } catch (error) {
        return ""
      }
  }

  static getPageIdFromUrlProductDetail(url : any) : string {
      try {
        if (url && url.includes(".html") || url.includes(".cate")) {
          let splits = url.split(".");
          let splits2 = splits[0].split("-");
          return splits2[splits2.length - 1]
        }
        return ""
      } catch (error) {
        return ""
      }
  }

    static generatePassword() : string {
        return Math.random().toString(36).slice(2, 10);
    }

    static getIdFrom(a: any, b : any) : string {
      return a.replace(" ","_")+"_"+b.replace(" ","_")
  }

  static getAction(role: any, isLockDelete : any) : any {
     if (role == ROLE.Author) {
       return [ACTION.Add,ACTION.Read,ACTION.Edit,ACTION.Delete]
     }
     if (isLockDelete == true) {
      return [ACTION.Read,ACTION.Edit]
     }
     return [ACTION.Add,ACTION.Read,ACTION.Edit,ACTION.Delete]
  }


  // static toUserSettingInputDTO(inputDTO: IUserClusterInputDTO, iAuthMode: string, iUserName: string, iPassword: string): IUserSettingInputDTO {
  //   return {
  //       clusterId: inputDTO.clusterId,
  //       packageNumber: inputDTO.packageNumber,
  //       allowIpNumber: inputDTO.allowIpNumber,
  //       isRotate: inputDTO.isRotate,
  //       rotateNumber: inputDTO.rotateNumber,
  //       userId: inputDTO.userId,
  //       isLimitCapcity: inputDTO.isLimitCapcity,
  //       capcityNumber: inputDTO.capcityNumber,
  //       authMode: iAuthMode,
  //       username: iUserName,
  //       password: iPassword,
  //     } as IUserSettingInputDTO;
  // }

  // static toProxy(inputProxy: IProxy, inputDTO : IProxyUpdateDTO): IProxy {
  //   inputProxy.userId = inputDTO.userId,
  //   inputProxy.isRotate = inputDTO.isRotate,
  //   inputProxy.rotateNumber = inputDTO.rotateNumber,
  //   inputProxy.allowIpNumber = inputDTO.allowIpNumber,
  //   inputProxy.userSettingId = inputDTO.userSettingId,
  //   inputProxy.isLimitCapcity = inputDTO.isLimitCapcity,
  //   inputProxy.capcityNumber= inputDTO.capcityNumber,
  //   inputProxy.bandwidth = inputDTO.bandwidth,
  //   inputProxy.authMode = inputDTO.authMode,
  //   inputProxy.username = inputDTO.username,
  //   inputProxy.password = inputDTO.password,
  //   inputProxy.whitelistIPAddresses = inputDTO.whitelistIPAddresses
  //   return inputProxy
  // }
}
