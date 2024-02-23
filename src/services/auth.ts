import { Service, Inject } from 'typedi';
import * as jwt from 'jsonwebtoken'
import config from '../config';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO } from '../models/interfaces/IUser';
import { ROLE } from '../utils/role';

@Service()
export default class AuthService {
  constructor(
      @Inject('userModel') private userModel : Models.UserModel,
      @Inject('logger') private logger,
  ) {}

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome username');
    
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(username: string, password: string): Promise<{ user: any; token: string }> {
    const correctPassword = await argon2.verify(config.admin.pass, password);
    
    if (username == config.admin.user && correctPassword) {
      return {user : {
        _id : username,
        username: username,
        role : ROLE.Author
      }  , token: this.generateToken({
        _id : username,
        username: username,
        role : ROLE.Author
      } )}
    }
    const userRecord = await this.userModel.findOne({ username });
    
    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  public async resetPassword(
    email: any,
    passNew: any
  ): Promise<any> {
    const userRecord = await this.userModel.findOne({ email  : email});
    
    if (userRecord) {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(passNew, { salt });
      console.log(hashedPassword);
      
      let status = await this.userModel.findOneAndUpdate({_id: userRecord._id},{$set:{password: hashedPassword, salt: salt.toString('hex'),  savePassword: passNew}})
      console.log(status);
      
      if (status) {
        return true
      }
    }
   
    return null;
  }

  private generateToken(user) {
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        username: user.username
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );
  }
}