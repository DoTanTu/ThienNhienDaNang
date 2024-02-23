import { Container } from 'typedi';
import config from '../config';
import { IMessage, IMessageInputDTO } from '../models/interfaces/IMessage';
import AppService from '../services/app';
import MailService from '../services/mail';
import MessageService from '../services/message';
import PageService from '../services/page';

export default class MessageController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();

    res.render('./admin/message/list', {
      router : "message",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async GetMessage(req, res) {
    const serviceInstance = Container.get(MessageService);
    var responses = await serviceInstance.getMessages({
      query: req.query.search.value,
      start: parseInt(req.query['start']),
      limit: parseInt(req.query['length']),
      role: req.session.user.role,
      userId: req.session.user.userId,
    });
    
    if (responses) {
      res.status(200).json({
        success: true,
        recordsTotal: responses.total,
        recordsFiltered: responses.total,
        data: {
          data: responses.items,
          role: req.session.user.role,
        },
      });
    } else {
      res.status(200).json({ success: false });
    }
  }

  public async AddMessage(req, res) {
    try {      
      const serviceInstance = Container.get(MessageService);
      const item = await serviceInstance.addMessage({
        title: req.body.title,
        address : req.body.address,
        message : req.body.message,
        content : req.body.content,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        productIds : req.body.productIds,
        categoryIds :req.body.categoryIds,
        userPost : req.body.userId
      } as IMessageInputDTO);
      if (item) {
        const mailInstance = Container.get(MailService);
        await mailInstance.sendEmailContactToAdmin(item)

        res.status(200).json({ success: true, data: item });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(MessageService);
      const data = await serviceInstance.removeMessage({
        _id: req.body._id,
      } as IMessage);
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }
}
