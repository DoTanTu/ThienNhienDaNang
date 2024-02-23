import { Service, Inject } from 'typedi';
import { IMail } from '../models/interfaces/IMail';
import MailRepository from '../repository/mailRepository';
import UserRepository from '../repository/userRepository';
import { MailTemplate } from '../utils/mailTemplate';
import { IUserQuery } from '../models/interfaces/IUser';
import { ROLE } from '../utils/role';
import { IMessage } from '../models/interfaces/IMessage';
import logger from '../setup/logger';
const nodemailer = require('nodemailer');

export interface IMailService {
    sendEmailActiveUser(id : string,email: string): Promise<any>
    getMail(): Promise<any>
    updateMail(mail: IMail): Promise<any>
    addMail(mail: IMail): Promise<any>
    sendEmailPassword(email: string, password : any): Promise<any>
}

@Service()
export default class MailService implements IMailService {
  MailRepo: MailRepository;
  UserRepo: UserRepository;

  constructor(@Inject() MailRepo: MailRepository,
  @Inject() UserRepo: UserRepository) {
    this.MailRepo = MailRepo;
    this.UserRepo = UserRepo;
  }
    updateMail(mail: IMail): Promise<any> {
        return this.MailRepo.updateMail(mail)
    }
    addMail(mail: IMail): Promise<any> {
       return this.MailRepo.addMail(mail)
    }

  public async getMail(): Promise<any> {
    return this.MailRepo.getMail()
  }

  public async sendEmailActiveUser(id : string,email: string): Promise<any> {
    try {
      let mailServer = await this.MailRepo.getMail()
    if (!mailServer) return false;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: mailServer.mail,
            pass: mailServer.password
        }
    });
    
    // send email
    await transporter.sendMail({
        from: mailServer.mail,
        to: email,
        subject: MailTemplate.subjectActiveAccount,
        html: MailTemplate.activeAccount(mailServer.urlHost + "/activeCustomer?code="+id) 
    });
    return true;
    } catch (error) {
       return false;
    }
  }

  public async sendEmailOrder(email: string, orderId : any): Promise<any> {
    try {
      let mailServer = await this.MailRepo.getMail()
    if (!mailServer) return false;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: mailServer.mail,
            pass: mailServer.password
        }
    });
    
    // send email
    await transporter.sendMail({
        from: mailServer.mail,
        to: email,
        subject:  MailTemplate.subjectOrderSuccess,
        html: MailTemplate.orderSuccess(mailServer.urlHost),
    });

    var mailTo = await this.getMailManagers()
    await transporter.sendMail({
      from: mailServer.mail,
      to: mailTo,
      subject:  MailTemplate.subjectOrder,
      html: await MailTemplate.orderFromCustomer(mailServer.urlHost, orderId),
     });

    return true;
    } catch (error) {
       return false;
    }
  }

  public async sendEmailContactToAdmin(message : IMessage): Promise<any> {
    try {
      let mailServer = await this.MailRepo.getMail()
    if (!mailServer) return false;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: mailServer.mail,
            pass: mailServer.password
        }
    });
    
    var mailTo = await this.getMailManagers()
    await transporter.sendMail({
      from: mailServer.mail,
      to: mailTo,
      subject:  MailTemplate.subjectMessageFromCustomer,
      html: MailTemplate.messageFromCustomer(message)
   });

    return true;
    } catch (error) {
       return false;
    }
  }

  public async sendPaymentSuccess(email: string, orderData : any): Promise<any> {
    try {
      let mailServer = await this.MailRepo.getMail()
    if (!mailServer) return false;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: mailServer.mail,
            pass: mailServer.password
        }
    });
    
    // send email
    await transporter.sendMail({
        from: mailServer.mail,
        to: email,
        subject:  MailTemplate.subjectOrderSuccess,
        html: MailTemplate.paymentSuccess(mailServer.urlHost, orderData),
    });

     // send admin
    var mailTo = await this.getMailManagers()
    await transporter.sendMail({
      from: mailServer.mail,
      to: mailTo,
      subject:  MailTemplate.subjectOrder,
      html: await MailTemplate.orderFromCustomer(mailServer.urlHost, orderData._id),
     });

    return true;
    } catch (error) {
      console.log(error);
      
       return false;
    }
  }

  public async sendEmailPassword(email: string, password : any): Promise<any> {
    try {
      console.log(email);
      
      if (email) {
        let mailServer = await this.MailRepo.getMail()
        if (!mailServer) return false;
          const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              auth: {
                  user: mailServer.mail,
                  pass: mailServer.password
              }
        });
      
        // send email
        transporter.sendMail({
            from: mailServer.mail,
            to: email,
            subject:  MailTemplate.subjectResetPasswordSuccess,
            html: MailTemplate.sendPassword(mailServer.urlHost, password),
        });
        return true;
      }
      return false;
    } catch (error) {
       return false;
    }
  }

  private async getMailManagers() : Promise<any> {
    let users = await this.UserRepo.getWithRole([ROLE.Manager, ROLE.Admin])
    let mailTo =users.map(x=>x.email)
    return mailTo
  }
 
}