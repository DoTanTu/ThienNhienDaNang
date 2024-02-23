import { Container } from 'typedi';
import config from '../config';
import { ISite, ISiteInputDTO } from '../models/interfaces/ISite';
import AppService from '../services/app';
import PageService from '../services/page';
import SiteService from '../services/site';

export default class SiteController {

  public async Init(req, res) {
    const appInstance = Container.get(AppService);
    const siteInstance = Container.get(SiteService);
    const pageInstance = Container.get(PageService);
    let pages = await pageInstance.getPages();
    let sites = await siteInstance.getSites()
    let app = await appInstance.getApp();
    
    res.render('./admin/systemSite/list', {
      router : "sites",
      siteConfig : config.siteConfig,
      appCurrent : app,
      app : app,
      sites : sites,
      pages : pages,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async GetSite(req, res) {
    const serviceInstance = Container.get(SiteService);
    var responses = await serviceInstance.getFullDataSites();
    console.log(responses);
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
    const pageInstance = Container.get(PageService);
    let pages = await pageInstance.getPages();

    res.render('./admin/systemSite/add', {
      router : "Sites",
      siteConfig : config.siteConfig,
      appId : req.query.appId,
      pages : pages,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async AddSite(req, res) {
    try {      
      var subMenuCustom = []
      if (req.body.subMenuCustom) {
        subMenuCustom = JSON.parse(req.body.subMenuCustom)
      }
      const serviceInstance = Container.get(SiteService);
      const items = await serviceInstance.addSite({
        url : req.body.url,
        name : req.body.name,
        images : req.body.pathImages,
        cssPath : req.body.pathCss,
        jsPath :  req.body.pathJs,
        htmlPath : req.body.pathHtml,
        appId : req.body.appId,
        isShowInMenu : req.body.isShowInMenu == 'on',
        isSubMenu : req.body.isSubMenu == 'on',
        pageData : {
          pageId: req.body.pageData,
          isGetCategory :  req.body.isGetCategory == 'on',
          isGetProduct :  req.body.isGetProduct == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct == 'on',
          limitSizeProduct :  req.body.limitSizeProduct,
        },
        pageOther1 : {
          pageId: req.body.pageOther1,
          isGetCategory :  req.body.isGetCategory1 == 'on',
          isGetProduct : req.body.isGetProduct1 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct1 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct1 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct1,
        },
        pageOther2 : {
          pageId: req.body.pageOther2,
          isGetCategory :  req.body.isGetCategory2 == 'on',
          isGetProduct : req.body.isGetProduct2 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct2 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct2 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct2,
        },
        pageOther3 : {
          pageId: req.body.pageOther3,
          isGetCategory :  req.body.isGetCategory3 == 'on',
          isGetProduct : req.body.isGetProduct3 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct3 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct3 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct3,
        },
        pageOther4 : {
          pageId: req.body.pageOther4,
          isGetCategory :  req.body.isGetCategory4 == 'on',
          isGetProduct : req.body.isGetProduct4 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct4 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct4 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct4,
        },
        pageOther5 : {
          pageId: req.body.pageOther5,
          isGetCategory :  req.body.isGetCategory5 == 'on',
          isGetProduct : req.body.isGetProduct5 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct5 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct5 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct5,
        },
        pageOther6 : {
          pageId: req.body.pageOther6,
          isGetCategory :  req.body.isGetCategory6 == 'on',
          isGetProduct : req.body.isGetProduct6 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct6 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct6 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct6,
        },
        pageOther7 : {
          pageId: req.body.pageOther7,
          isGetCategory :  req.body.isGetCategory7 == 'on',
          isGetProduct : req.body.isGetProduct7 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct7 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct7 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct7,
        },
        pageOther8 : {
          pageId: req.body.pageOther8,
          isGetCategory :  req.body.isGetCategory8 == 'on',
          isGetProduct : req.body.isGetProduct8 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct8 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct8 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct8,
        },
        pageOther9 : {
          pageId: req.body.pageOther9,
          isGetCategory :  req.body.isGetCategory9 == 'on',
          isGetProduct : req.body.isGetProduct9 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct9 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct9 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct9,
        },
        pageOther10 : {
          pageId: req.body.pageOther10,
          isGetCategory :  req.body.isGetCategory10 == 'on',
          isGetProduct : req.body.isGetProduct10 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct10 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct10 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct10,
        },
        isSiteProductDetail : req.body.isSiteProductDetail == 'on',
        isSiteCategoryDetail : req.body.isSiteCategoryDetail == 'on',
        isSiteGetDataOrder : req.body.isSiteGetDataOrder == 'on',
        isFullFieldProduct : req.body.isFullFieldSiteDetail == 'on', 
        isSiteGetDataProfile : req.body.isSiteGetDataProfile == 'on', 
        seoTitle: req.body.seoTitle,
        seoName:  req.body.seoName,
        seoKeyWord : req.body.seoKeyWord,
        seoDesc : req.body.seoDes,
        status : req.body.status,
        subMenuCustom : subMenuCustom,
      } as ISiteInputDTO);
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
    const serviceInstance = Container.get(SiteService);
    let site = await serviceInstance.getSiteInfo({_id : req.query.siteId} as ISite);
    const pageInstance = Container.get(PageService);
    let pages = await pageInstance.getPages();
    
    res.render('./admin/systemSite/edit', {
      router : "Sites",
      siteConfig : config.siteConfig,
      data : site,
      appId : req.query.appId,
      pages : pages,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async EditSite(req, res) {
    try {   
      var subMenuCustom = []
      console.log(req.body.subMenuCustom);
      
      if (req.body.subMenuCustom) {
        subMenuCustom = JSON.parse(req.body.subMenuCustom)
      }

      const serviceInstance = Container.get(SiteService);
      const items = await serviceInstance.updateSite({
        _id : req.body._id,
        url : req.body.url,
        name : req.body.name,
        images : req.body.pathImages,
        cssPath : req.body.pathCss,
        jsPath :  req.body.pathJs,
        htmlPath : req.body.pathHtml,
        appId : req.body.appId,
        isShowInMenu : req.body.isShowInMenu == 'on',
        isSubMenu : req.body.isSubMenu == 'on',
        pageData : {
          pageId: req.body.pageData,
          isGetCategory :  req.body.isGetCategory == 'on',
          isGetProduct :  req.body.isGetProduct == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct == 'on',
          limitSizeProduct :  req.body.limitSizeProduct,
        },
        pageOther1 : {
          pageId: req.body.pageOther1,
          isGetCategory :  req.body.isGetCategory1 == 'on',
          isGetProduct : req.body.isGetProduct1 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct1 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct1 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct1,
        },
        pageOther2 : {
          pageId: req.body.pageOther2,
          isGetCategory :  req.body.isGetCategory2 == 'on',
          isGetProduct : req.body.isGetProduct2 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct2 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct2 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct2,
        },
        pageOther3 : {
          pageId: req.body.pageOther3,
          isGetCategory :  req.body.isGetCategory3 == 'on',
          isGetProduct : req.body.isGetProduct3 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct3 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct3 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct3,
        },
        pageOther4 : {
          pageId: req.body.pageOther4,
          isGetCategory :  req.body.isGetCategory4 == 'on',
          isGetProduct : req.body.isGetProduct4 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct4 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct4 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct4,
        },
        pageOther5 : {
          pageId: req.body.pageOther5,
          isGetCategory :  req.body.isGetCategory5 == 'on',
          isGetProduct : req.body.isGetProduct5 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct5 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct5 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct5,
        },
        pageOther6 : {
          pageId: req.body.pageOther6,
          isGetCategory :  req.body.isGetCategory6 == 'on',
          isGetProduct : req.body.isGetProduct6 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct6 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct6 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct6,
        },
        pageOther7 : {
          pageId: req.body.pageOther7,
          isGetCategory :  req.body.isGetCategory7 == 'on',
          isGetProduct : req.body.isGetProduct7 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct7 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct7 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct7,
        },
        pageOther8 : {
          pageId: req.body.pageOther8,
          isGetCategory :  req.body.isGetCategory8 == 'on',
          isGetProduct : req.body.isGetProduct8 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct8 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct8 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct8,
        },
        pageOther9 : {
          pageId: req.body.pageOther9,
          isGetCategory :  req.body.isGetCategory9 == 'on',
          isGetProduct : req.body.isGetProduct9 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct9 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct9 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct9,
        },
        pageOther10 : {
          pageId: req.body.pageOther10,
          isGetCategory :  req.body.isGetCategory10 == 'on',
          isGetProduct : req.body.isGetProduct10 == 'on',
          isFullSizeProduct :  req.body.isFullSizeProduct10 == 'on',
          isFullFieldProduct :  req.body.isFullFieldProduct10 == 'on',
          limitSizeProduct :  req.body.limitSizeProduct10,
        },
        isSiteProductDetail : req.body.isSiteProductDetail == 'on',
        isSiteCategoryDetail : req.body.isSiteCategoryDetail == 'on',
        isSiteGetDataOrder : req.body.isSiteGetDataOrder == 'on',
        isFullFieldProduct : req.body.isFullFieldSiteDetail == 'on', 
        isSiteGetDataProfile : req.body.isSiteGetDataProfile == 'on',
        seoTitle: req.body.seoTitle,
        seoName:  req.body.seoName,
        seoKeyWord : req.body.seoKeyWord,
        seoDesc : req.body.seoDes,
        status : req.body.status,
        subMenuCustom : subMenuCustom
      } as ISiteInputDTO);
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {
      console.log(e);
      
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(SiteService);
      const data = await serviceInstance.removeSite({
        _id: req.body._id,
      } as ISite);
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
