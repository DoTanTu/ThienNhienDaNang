import { Container } from 'typedi';
import config from '../config';
import { IDTOPaymentMethod, IPaymentMethod } from '../models/interfaces/IPaymentMethod';
import PaymentMethodService from '../services/paymentMethod';
import PageService from '../services/page';
import { STATUS } from '../utils/status';
import AppService from '../services/app';

export default class PaymentMethodController {
  public async Init(req, res) {
    const pageInstance = Container.get(PageService);
    let pages = await pageInstance.getPages()

    const serviceInstance = Container.get(PaymentMethodService);
    var responses = await serviceInstance.getPaymentMethods();

    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/paymentMethod/list', {
      router : "paymentMethod",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      data : responses,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async AddOrEditPaymentMethod(req, res) {
    try {      
      const serviceInstance = Container.get(PaymentMethodService);
      var item;
      if (req.body._id) {
        item = await serviceInstance.updatePaymentMethod({
          _id : req.body._id,
          paymentMethod: req.body.paymentMethod,
          accountName: req.body.accountName,
          accountNumber: req.body.accountNumber,
          bankName: req.body.bankName,
          status : req.body.status,
          sKey : req.body.sKey,
          pKey : req.body.pKey
        } as IPaymentMethod);
      }else{
          item = await serviceInstance.addPaymentMethod({
            paymentMethod: req.body.paymentMethod,
            accountName: req.body.accountName,
            accountNumber: req.body.accountNumber,
            bankName: req.body.bankName,
            sKey : req.body.sKey,
            pKey : req.body.pKey,
            status : STATUS.Active
        } as IDTOPaymentMethod);
      }
  
      if (item) {
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
      const serviceInstance = Container.get(PaymentMethodService);
      const data = await serviceInstance.removePaymentMethod({
        _id: req.body._id,
      } as IPaymentMethod);
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
