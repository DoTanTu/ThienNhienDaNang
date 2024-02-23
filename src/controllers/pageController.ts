import { Container } from 'typedi';
import config from '../config';
import { IPage, IPageInputDTO } from '../models/interfaces/IPage';
import AppService from '../services/app';
import PageService from '../services/page';
import { Utils } from '../utils/utils';

export default class PageController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/systemPage/list', {
      router : "pages",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async GetPage(req, res) {
    const serviceInstance = Container.get(PageService);
    var responses = await serviceInstance.getFullDataPages({
      query: req.query.search.value,
      start: parseInt(req.query['start']),
      limit: parseInt(req.query['length']),
      role: req.session.user.role
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

  public async Add(req, res) {
    const serviceInstance = Container.get(PageService);
    let pageData = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    res.render('./admin/systemPage/add', {
      router : "pages",
      siteConfig : config.siteConfig,
      pages : pageData,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async AddPage(req, res) {
    try {      
      const serviceInstance = Container.get(PageService);
      const items = await serviceInstance.addPage({
        _id : Utils.getId(req.body.name),
        name : req.body.name,
        desc : req.body.desc,
        images : JSON.parse(req.body.images),
        setting: {
          isCategory : req.body.isCategory == 'on',
          isAttribute : req.body.isAttribute == 'on',
          isImageDetail : req.body.isImageDetail == 'on',
          isEcommerce: req.body.isEcommerce == 'on',
          isPdf: req.body.isPdf == 'on',
          isLinkVideo : req.body.isLinkVideo == 'on',
          isProductContact: req.body.isProductContact == 'on',
          isLockDelete : req.body.isLockDelete == 'on',
          isDescriptionPlus : req.body.isDescriptionPlus == 'on',
          referencePageId : req.body.referencePageId
        },
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord : req.body.seoKey,
        seoDesc : req.body.seoDesc,
      } as IPageInputDTO);
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {
      
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async Edit(req, res) {
    const serviceInstance = Container.get(PageService);
    let pageData = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    let dataPage = pageData.find(page => page._id == req.query.pageId)

    res.render('./admin/systemPage/edit', {
      router : "pages",
      siteConfig : config.siteConfig,
      pages : pageData,
      app : app,
      data : dataPage,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async EditPage(req, res) {
    try {      
      const serviceInstance = Container.get(PageService);
      const items = await serviceInstance.updatePage({
        _id : req.body._id,
        name : req.body.name,
        desc : req.body.desc,
        images : JSON.parse(req.body.images),
        setting: {
          isCategory : req.body.isCategory == 'on',
          isAttribute : req.body.isAttribute == 'on',
          isImageDetail : req.body.isImageDetail == 'on',
          isEcommerce: req.body.isEcommerce == 'on',
          isPdf: req.body.isPdf == 'on',
          isLinkVideo : req.body.isLinkVideo == 'on',
          isProductContact: req.body.isProductContact == 'on',
          isLockDelete : req.body.isLockDelete == 'on',
          isDescriptionPlus : req.body.isDescriptionPlus == 'on',
          referencePageId : req.body.referencePageId
        },
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord : req.body.seoKey,
        seoDesc : req.body.seoDesc
      } as IPageInputDTO);
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
      const serviceInstance = Container.get(PageService);
      const data = await serviceInstance.removePage({
        _id: req.body._id,
      } as IPage);
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
