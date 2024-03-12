import { Container } from 'typedi';
import { IProduct, IProductQuery } from '../models/interfaces/IProduct';
import CustomSiteService from '../services/customSite';
import { Utils } from '../utils/utils';
const i18n = require('i18n');
const path = require('path');
var fs = require('fs');

export default class CustomSiteController { 
  public async CheckSite(req, res, next) {
    try{
      const siteInstance = Container.get(CustomSiteService);
      let app = await siteInstance.getApp();
      let sites = await siteInstance.getDataWithSites(app);
      let languages = await siteInstance.getLanguages()
      var languageCodeCurrent = this.setLanguage(req, res, languages)
      if(languageCodeCurrent == undefined || languageCodeCurrent == null || languageCodeCurrent == ""){
        languageCodeCurrent = i18n.getLocale()
      }
      
      if (sites) {
        let data = {
          fileEjsName: null,
          dataSite: null,
          dataMenus: null,
          dataCategories: null,
          dataProducts: null,
          dataAttibutes: null,
          dataProductDetail: null,
          dataProductCounter: null,
          dataCategoryDetail: null,
          dataContact : null,
          dataShipMethods : null,
          dataPaymendMethods : null,
          dataProfile : null,
          dataBasicInfo : null,
          dataOther1 : null,
          dataOther2 : null,
          dataOther3 : null,
          dataOther4 : null,
          dataOther5 : null,
          dataOther6 : null,
          dataOther7 : null,
          dataOther8 : null,
          dataOther9 : null,
          dataOther10 : null,
          dataLanguages : null,
        };

        let pageIdFromUrl = Utils.getPageIdFromUrlProductDetail(req.params.url)
        const site = sites.find((x) => ((req.params.url == undefined || req.params.url.length <= 2) && x.url === '/') 
        || (req.params.url != undefined && req.params.url.includes(".html") && x.pageData.pageId == pageIdFromUrl && x.isSiteProductDetail == true) 
        || (req.params.url != undefined && req.params.url.includes(".cate") && x.pageData.pageId == pageIdFromUrl && x.isSiteCategoryDetail == true) 
        ||  (req.params.url != undefined && x.url === req.params.url));
        if (site) {
          data.dataSite = site
          data.dataMenus = sites.filter((site) => site.isShowInMenu);
          data.fileEjsName = site.htmlPath.replace('.ejs', '');
          data.dataContact = await siteInstance.getContact();
          data.dataLanguages = await siteInstance.getLanguages();
          if(req.session.customer){
            data.dataBasicInfo = await siteInstance.getDataBasicInfo(req.session.customer.customerId);
          }

          if (site.isSiteProductDetail) {
            let idProduct = Utils.getIdUrlSiteDetail(req.params.url)
            if (idProduct) {
            const updateviews = await siteInstance.updateViews(idProduct);
            data.dataProductDetail = await siteInstance.getProductById(idProduct);
            }
          }
          if (site.isSiteCategoryDetail) {
            let idCate = Utils.getIdUrlSiteDetail(req.params.url)
            if (idCate) {
              data.dataCategoryDetail = await siteInstance.getCategoryDetail(idCate, site.isFullFieldProduct)
            }
          }

          if (site.isSiteGetDataOrder) {
            data.dataShipMethods = await siteInstance.getShipMethod()
            data.dataPaymendMethods = await siteInstance.getPaymendMethod()
          }

          if (site.isSiteGetDataProfile){
            data.dataProfile = await siteInstance.getDataProfile(req.query['cus'])
          }

          if (site.pageData && site.pageData.pageId) {
            if (site.pageData.isGetCategory) {
              data.dataCategories = await siteInstance.getCategories(site.pageData.pageId, site.pageData.isFullFieldProduct);
            }
            if (site.pageData.isGetProduct) {
                if (req.query['query'] || req.query['start'] || req.query['cate'] || req.query['hashtag'] || req.query['attribute'] ||  req.query['attribute1'] ||  req.query['attribute2'] ||  req.query['label'] ||  req.query['priceMin'] ||  req.query['priceMax']) {
                  data.dataProducts = await siteInstance.getProductByFillters({
                    pageId : site.pageData.pageId,
                    query : req.query['query'],
                    start: req.query['start'],
                    limit: site.pageData.limitSizeProduct,
                    isFullSite : site.pageData.isFullSizeProduct,
                    language :  req.query['lang'],
                    cateId :  req.query['cate'],
                    hashtag : req.query['hashtag'],
                    attributes : this.toQueryAttributes(req),
                    priceMin: req.query['priceMin'],
                    priceMax: req.query['priceMax'],
                    label : req.query['label']} as IProductQuery, app.platform == "ecommerce_plus");

                    data.dataProductCounter = await siteInstance.getProductByFillters({
                      pageId : site.pageData.pageId,
                      query : req.query['query'],
                      limit: site.pageData.limitSizeProduct,
                      isFullSite : site.pageData.isFullSizeProduct,
                      language :  req.query['lang'],
                      cateId :  req.query['cate'],
                      hashtag : req.query['hashtag'],
                      attributes : this.toQueryAttributes(req),
                      priceMin: req.query['priceMin'],
                      priceMax: req.query['priceMax'],
                      label : req.query['label']} as IProductQuery, app.platform == "ecommerce_plus");

                }else{
                  data.dataProducts =  await siteInstance.getProducts(site.pageData.pageId, site.pageData.isFullSizeProduct,site.pageData.limitSizeProduct, site.pageData.isFullFieldProduct);
                }
              data.dataAttibutes = await siteInstance.getAtrributes(site.pageData.pageId);
            }
          }

          data.dataOther1 = await this.getOtherData(siteInstance, site.pageOther1)
          data.dataOther2 = await this.getOtherData(siteInstance, site.pageOther2)
          data.dataOther3 = await this.getOtherData(siteInstance, site.pageOther3)
          data.dataOther4 = await this.getOtherData(siteInstance, site.pageOther4)
          data.dataOther5 = await this.getOtherData(siteInstance, site.pageOther5)
          data.dataOther6 = await this.getOtherData(siteInstance, site.pageOther6)
          data.dataOther7 = await this.getOtherData(siteInstance, site.pageOther7)
          data.dataOther8 = await this.getOtherData(siteInstance, site.pageOther8)
          data.dataOther9 = await this.getOtherData(siteInstance, site.pageOther9)
          data.dataOther10 = await this.getOtherData(siteInstance, site.pageOther10)
        }

        var sessionCustomer = null
        if (req.session != undefined && req.session.customer != null) {
          sessionCustomer = req.session.customer
        }
        if (site && data.fileEjsName) {
          res.render('./app/' + data.fileEjsName, {
            urlCurrentName : req.params.url,
            dataSite : data.dataSite,
            dataMenus: data.dataMenus,
            dataCategories: data.dataCategories,
            dataProducts: data.dataProducts,
            dataOther1 : data.dataOther1,
            dataOther2 : data.dataOther2,
            dataOther3 : data.dataOther3,
            dataOther4 : data.dataOther4,
            dataOther5 : data.dataOther5,
            dataOther6 : data.dataOther6,
            dataOther7 : data.dataOther7,
            dataOther8 : data.dataOther8,
            dataOther9 : data.dataOther9,
            dataOther10 : data.dataOther10,
            dataContact : data.dataContact,
            dataProductDetail : data.dataProductDetail,
            dataCategoryDetail : data.dataCategoryDetail,
            dataProfile : data.dataProfile,
            dataBasicInfo : data.dataBasicInfo,
            dataLanguages : data.dataLanguages,
            languageCodeCurrent : languageCodeCurrent,
            dataAttibutes : data.dataAttibutes,
            dataShipMethods : data.dataShipMethods,
            dataPaymendMethods : data.dataPaymendMethods,
            dataProductCounter : data.dataProductCounter,
            session : sessionCustomer
          });
        } else {
          return next()
        }
      } else {
        return next()
      }
    }catch(error){
      return next()
    }
  }

  public async getOtherData(siteInstance : CustomSiteService, pageOther) : Promise<any> {
    if (!pageOther) return null

    let dataOther = {
      pageId: pageOther.pageId,
      categories: null,
      products: null,
      attibutes : null,
    }
    if (pageOther.isGetCategory && pageOther.pageId) {
      dataOther.categories = await siteInstance.getCategories(pageOther.pageId, pageOther.isFullFieldProduct);
    }
    if (pageOther.isGetProduct && pageOther.pageId) {
      dataOther.products = await siteInstance.getProducts(pageOther.pageId, pageOther.isFullSizeProduct, pageOther.limitSizeProduct, pageOther.isFullFieldProduct);
      dataOther.attibutes = await siteInstance.getAtrributes(pageOther.pageId);
    }
  
    return dataOther
  }

  public setLanguage(req, res, languages) : String{
    var locales = req.params.lang
    if (!locales) {
      locales = req.params.url
    }
    if (locales != undefined && locales != null && locales != "" && locales.length == 2 && languages) {
      if (languages.map(x=>x._id).includes(locales)) {
        res.cookie("lang", req.params.lang, { maxAge: 900000 });
        i18n.setLocale(locales);
        res.setLocale(locales);

        return locales;
      }
    }
    return ""
  }

  public async CheckMenu(req, res) {
    const siteInstance = Container.get(CustomSiteService);
    // let sites = await siteInstance.getDataWithSites();
    // if (sites) {
    //   let data = {
    //     urlCurrentName: null,
    //     dataMenus: null,
    //     dataCategories: null,
    //     dataProducts: null,
    //     dataContact : null,
    //   };
    //   const site = sites.find((x) => (req.params.url ==  undefined && x.url === '/') || x.url === req.params.url);
    //   if (site) {
    //     data.dataMenus = sites.filter((site) => site.isShowInMenu);
    //     data.urlCurrentName = site.htmlPath.replace('.ejs', '');
    //     if (site.isGetCategory) {
    //       data.dataCategories = await siteInstance.getCategories(site.pageId);
    //     }
    //     if (site.isGetProduct) {
    //       data.dataProducts = await siteInstance.getProducts(site.pageId);
    //     }
    //   }
    //   if (site) {
    //     res.render('./app/' + data.urlCurrentName, {
    //       urlCurrentName : req.params.url,
    //       dataMenus: data.dataMenus,
    //       dataCategories: data.dataCategories,
    //       dataProducts: data.dataProducts,
    //     });
    //   } else {
    //     res.render('./error/page-404');
    //   }
    // } else {
    //   res.render('./error/page-404');
    // }
  }

  public async searchProducts(req, res){
    const siteInstance = Container.get(CustomSiteService);
    let products = await siteInstance.getProductByFillters({
      pageId : req.body.pageId,
      query : req.body.query,
      start: req.body.start,
      limit: req.body.limit,
      language :  req.body.language,
      cateId : req.body.cateId,
      hashtag : req.body.hashtag,
      attributes : this.toQueryAttributes(req),
      priceMin: req.body.priceMin,
      priceMax:  req.body.priceMax,
      label : req.body.label,
    } as IProductQuery, req.body.isEcommercePlus);

    if (products) {
      res.status(200).json({
        success: true,
        data: products,
      });
    } else {
      res.status(200).json({ success: false });
    }
  }

  public async searchAllProducts(req, res){
    const siteInstance = Container.get(CustomSiteService);
    let products = await siteInstance.getProductByFillters({
      pageId : req.body.pageId,
      query : req.body.query,
      start: req.body.start,
      limit: req.body.limit,
      cateId : req.body.cateId,
      hashtag : req.body.hashtag,
    } as IProductQuery, req.body.isEcommercePlus);

    if (products) {
      res.status(200).json({
        success: true,
        data: products,
      });
    } else {
      res.status(200).json({ success: false });
    }
  }

  public async increaseDownload(req, res){
    const siteInstance = Container.get(CustomSiteService);
    const idProduct = req.body.productId;
    const result = await siteInstance.increaseDownload(idProduct);
    res.status(200).json({
      success: true,
      total : result
    });
  }

  public async actionLikeProduct(req, res){
    const siteInstance = Container.get(CustomSiteService);
    const idProduct = req.body.productId;
    const idCustomer = req.session.customer.customerId;
    const result = await siteInstance.actionLikeProduct(idProduct, idCustomer);
    if(result){
      res.status(200).json({
        success: true,
        total : result
      })
    }
    else{
      res.status(200).json({
        success: false,
        total : 0
      })
    }
    
  }

  toQueryAttributes(req: any): any {
    var attributes = []
    if (req.query['attribute']){
      attributes.push(req.query['attribute'])
    }
    if (req.query['attribute1']){
      attributes.push(req.query['attribute1'])
    }
    if (req.query['attribute2']){
      attributes.push(req.query['attribute2'])
    }
    if (req.query['attribute3']){
      attributes.push(req.query['attribute3'])
    }
    if (req.query['attribute4']){
      attributes.push(req.query['attribute4'])
    }
    return attributes
  }
}


