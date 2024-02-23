// import * as argon2 from 'argon2';
// import { randomBytes } from 'crypto';
// import config from '../config';

// import * as jwt from 'jsonwebtoken'
// import { Service } from 'typedi';

// @Service()
// export default class AuthAPIService {
//   constructor(){}


//   public async GetTokenApi(username, password): Promise<any>{
//     const correctPassword = await argon2.verify(config.adminAPI.pass, password);
    
//     if (username == config.adminAPI.user && correctPassword) {
//       return {
//         token: this.generateJWTApi(username)
//       }
//     }

//     throw new Error('403 Authentic')
//   }

//   private generateJWTApi(username) {
//     return jwt.sign({
//       data: {
//         username: username
//       }
//     }, config.jwtAPISecret, { expiresIn: '60s' });  
//   }
// }