import { Container } from 'typedi';
import config from '../config';
import { IDTOShipMethod, IShipMethod } from '../models/interfaces/IShipMethod';
import ShipMethodService from '../services/shipMethod';
import PageService from '../services/page';
import AppService from '../services/app';

export default class ShipMethodController {
  public async Init(req, res) {
    const pageInstance = Container.get(PageService);
    let pages = await pageInstance.getPages()

    const serviceInstance = Container.get(ShipMethodService);
    var responses = await serviceInstance.getShipMethods();

    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/shipMethod/list', {
      router : "ShipMethod",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      data : responses,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async AddOrEditShipMethod(req, res) {
    try {      
      const serviceInstance = Container.get(ShipMethodService);
      var item;
      if (req.body._id) {
        item = await serviceInstance.updateShipMethod({
          _id : req.body._id,
          name: req.body.name,
          image: req.body.image,
          price: req.body.price
        } as IShipMethod);
      }else{
          item = await serviceInstance.addShipMethod({
          name: req.body.name,
          image: req.body.image,
          price: req.body.price
        } as IDTOShipMethod);
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
      const serviceInstance = Container.get(ShipMethodService);
      const data = await serviceInstance.removeShipMethod({
        _id: req.body._id,
      } as IShipMethod);
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
