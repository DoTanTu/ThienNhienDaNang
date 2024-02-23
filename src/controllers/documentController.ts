import { Container } from 'typedi';
import config from '../config';
import AppService from '../services/app';
import PageService from '../services/page';

export default class DocumentController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    res.render('./admin/systemDoc/document', {
      router : "Document",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }
}
