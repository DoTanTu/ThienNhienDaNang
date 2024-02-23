import { Container } from 'typedi';
import config from '../config';
import { IOrder, IOrderInputDTO } from '../models/interfaces/IOrder';
import AppService from '../services/app';
import MailService from '../services/mail';
import OrderService from '../services/order';
import PageService from '../services/page';
import { ORDERSTATUS } from '../utils/status';

export default class OrderController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/order/list', {
      router : "order",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async GetOrders(req, res) {
    const serviceInstance = Container.get(OrderService);
    var responses = await serviceInstance.getOrders({
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

  public async ViewOrders(req, res) {
    const serviceInstance = Container.get(OrderService);
    var responses = await serviceInstance.getOrderInfo({_id : req.query.orderId} as IOrder)
    const servicePage = Container.get(PageService);
    let pages = await servicePage.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/order/preview', {
      router : "viewOrder",
      siteConfig : config.siteConfig,
      data : responses,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }
  
  public async EditOrdersInit(req, res) {
    const serviceInstance = Container.get(OrderService);
    var responses = await serviceInstance.getOrderInfo({_id : req.query.orderId} as IOrder)
    const servicePage = Container.get(PageService);
    let pages = await servicePage.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/order/edit', {
      router : "viewOrder",
      siteConfig : config.siteConfig,
      data : responses,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async AddOrder(req, res) {
    try {      
      const serviceInstance = Container.get(OrderService);
      var itemProducts = []
      if (req.body.products) {
        itemProducts = JSON.parse(req.body.products)
      }
      var billingAddress
      var shippingAddress
      var customFields
      if (req.body.billingAddress) {
        billingAddress = JSON.parse(req.body.billingAddress)
      }
      if (req.body.shippingAddress) {
        shippingAddress = JSON.parse(req.body.shippingAddress)
      }

      if (req.body.customFields) {
        customFields = JSON.parse(req.body.customFields)
      }

      const item = await serviceInstance.addOrder({
        customerId : req.body.customerId,
        products: itemProducts,
        note: req.body.note,
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        shipId: req.body.shipId,
        discount: req.body.discount,
        paymendId: req.body.paymendId,
        subTotal: req.body.subTotal,
        total: req.body.total,
        customFields : customFields,
        status: ORDERSTATUS.OPEND,
        userPost : req.body.userId
      } as IOrderInputDTO);

      if (item) {
        const mailInstance = Container.get(MailService);
        var email = item.billingAddress.email
        if (email == undefined || email == null || email == "") {
          email = item.shippingAddress.email
        }
        await mailInstance.sendEmailOrder(email,item._id)
        res.status(200).json({ success: true, data: item });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {
      console.log(e);
      
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async EditOrder(req, res) {
    try {      
      const serviceInstance = Container.get(OrderService);
      const item = await serviceInstance.updateOrder({
        _id : req.body._id,
        customerId : req.body.customerId,
        products: req.body.products,
        note: req.body.note,
        billingAddress: req.body.billingAddress,
        shippingAddress: req.body.shippingAddress,
        shipId: req.body.shipId,
        discount: req.body.discount,
        paymendId: req.body.paymendId,
        subTotal: req.body.subTotal,
        total: req.body.total,
        status: req.body.status
      } as IOrderInputDTO);
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
      const serviceInstance = Container.get(OrderService);
      const data = await serviceInstance.removeOrder({
        _id: req.body._id,
      } as IOrder);
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async UpdateStatusOrder(req, res) {
    try {
      const serviceInstance = Container.get(OrderService);
      
      const data = await serviceInstance.updateOrder({
        _id: req.body._id,
        status : req.body.status,
      } as IOrder);
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
