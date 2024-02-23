import { Container } from 'typedi';
import config from '../config';
import { IMail } from '../models/interfaces/IMail';
import AppService from '../services/app';
import MailService from '../services/mail';
import PageService from '../services/page';

export default class MailController {
  
  public async Add(req, res) {
    const serviceInstance = Container.get(PageService);
    const MailInstance = Container.get(MailService);
    let pages = await serviceInstance.getPages()
    let dataMail = await MailInstance.getMail();
   
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();

    // let a = await MailInstance.sendEmailCreateUser("123123","v.anhkiet91@gmail.com");
    
    res.render('./admin/mail/mail', {
      router : "mail",
      siteConfig : config.siteConfig,
      role: req.session.user.role,
      app : app,
      data:  dataMail,
      pages: pages,
      username : req.session.user.name
    });
  }

  public async AddOrEditMail(req, res) {
    try {    
      const serviceInstance = Container.get(MailService);
      var items;
      if(req.body.mailId != undefined && req.body.mailId != ''){
        items = await serviceInstance.updateMail({
          _id :  req.body.mailId,
          mail : req.body.mail,
          password : req.body.password,
          urlHost : req.body.host
        } as IMail);
      }else{
        items = await serviceInstance.addMail({
          mail : req.body.mail,
          password : req.body.password,
          urlHost : req.body.host
        } as IMail);
      }
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }
}
