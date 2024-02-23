import { Container } from 'typedi';
import config from '../config';
import { IApp, IAppInputDTO } from '../models/interfaces/IApp';
import AppService from '../services/app';
import { STATUS } from '../utils/status';
import { Utils } from '../utils/utils';

export default class AppController {

  public async AddOrEditApp(req, res) {
    try {   
      const serviceInstance = Container.get(AppService);
      var items
      if(req.body.appId != undefined && req.body.appId != ''){
        items = await serviceInstance.updateApp({
          _id :  req.body.appId,
          url :  Utils.getId(req.body.name),
          name : req.body.name,
          logo : req.body.appLogo,
          platform : req.body.platform,
          framework : req.body.frameworks,
          module : {
            isOrder :  req.body.isOrder == 'on',
            isAuthen :  req.body.isAuthen == 'on',
            isMail : req.body.isMail == 'on',
            isQr : req.body.isQr == 'on',
            isPaymentOnline : req.body.isPaymentOnline == 'on',
          },
          setting:{
            queryProduct : req.body.queryProduct,
          },
          images : req.body.appImages,
          cssPath : req.body.appCss,
          jsPath :  req.body.appJs,
          htmlPath : req.body.appHtml,
          fontPath :  req.body.appFont,
          status : STATUS.Active,
          hostName  : req.body.hostName
        } as IAppInputDTO);
      }else{
        items = await serviceInstance.addApp({
          _id :  Utils.getId(req.body.name),
          url :  Utils.getId(req.body.name),
          name : req.body.name,
          logo : req.body.appLogo,
          platform : req.body.platform,
          framework : req.body.frameworks,
          module : {
            isOrder :  req.body.isOrder == 'on',
            isAuthen :  req.body.isAuthen == 'on',
            isMail : req.body.isMail == 'on',
            isQr : req.body.isQr == 'on',
            isPaymentOnline : req.body.isPaymentOnline == 'on',
          },
          setting:{
            queryProduct : req.body.queryProduct,
          },
          images : req.body.appImages,
          cssPath : req.body.appCss,
          jsPath :  req.body.appJs,
          htmlPath : req.body.appHtml,
          fontPath :  req.body.appFont,
          status : STATUS.Active,
          hostName  : req.body.hostName
        } as IAppInputDTO);
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

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(AppService);
      const data = await serviceInstance.removeApp({
        _id: req.body._id,
      } as IApp);
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
