const fs = require("fs");
const path = require("path");
import { Container } from 'typedi';
import config from '../config';
import PageService from '../services/page';
import ProductService from '../services/product';
import { STATUS } from '../utils/status';
import { IProduct, IProductAdditional, IProductContact, IProductEcommerce, IProductImage, IProductInputDTO, IProductQuery } from '../models/interfaces/IProduct';
import CategoryService from '../services/category';
import CustomerService from '../services/customer';
import LanguageService from '../services/language';
import AttributeService from '../services/attribute';
import AppService from '../services/app';
import { APPTYPE } from '../utils/appType';
import { Utils } from '../utils/utils';
import CommentService from '../services/comment';
import { IComment } from '../models/interfaces/IComment';

export default class ProductController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    let page = req.params.page

    const langServiceInstance = Container.get(LanguageService);
    let languages = await langServiceInstance.getLanguages()
    
    let pageCheck = pages.find(x => x._id == page)
    let actions = Utils.getAction(req.session.user.role, pageCheck.setting.isLockDelete)

    let pageSetting = pages.find(x => {
      return x._id == page;
    });

    var categories = null
    if (pageSetting != null && pageSetting.setting != null && pageSetting.setting.isCategory == true) {
      const serviceInstance = Container.get(CategoryService);
      categories = await serviceInstance.getCategories(page)
    }

    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();

    res.render('./admin/product/list', {
      router : page + "/product",
      siteConfig : config.siteConfig,
      pageCurrent : page,
      categories : encodeURI(JSON.stringify(categories)),
      pages : pages,
      app : app,
      actions: actions,
      languages : languages,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async GetProducts(req, res) {
    const serviceInstance = Container.get(ProductService);
    let page = req.params.page
    
    var responses = await serviceInstance.getProducts({
      pageId : page,
      query: req.query.search.value,
      start: parseInt(req.query['start']),
      limit: parseInt(req.query['length']),
      role: req.session.user.role,
      userId: req.session.user.userId,
      language : "",
      cateId : req.query['cateId']
    } as IProductQuery);
    
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

  public async AddInit(req, res){
    const serviceInstance = Container.get(PageService);
      let pages = await serviceInstance.getPages()
      let pageId = req.params.page
      let pageSetting = pages.find(x => {
        return x._id == pageId;
      });
      var categories = null
      if (pageSetting != null && pageSetting.setting != null && pageSetting.setting.isCategory == true) {
        const serviceInstance = Container.get(CategoryService);
        let dataCategory = await serviceInstance.getCategories(pageId)
        categories = encodeURI(JSON.stringify(dataCategory))
      }

      var attributes = null
      if (pageSetting != null && pageSetting.setting != null && pageSetting.setting.isAttribute == true) {
        const attributeInstance = Container.get(AttributeService);
        attributes = await attributeInstance.getAttributes(pageId)
      }
     
      const langServiceInstance = Container.get(LanguageService);
      let languages = await langServiceInstance.getLanguages()

      const authorServiceInstance = Container.get(CustomerService);
      let authors = await authorServiceInstance.getActiveCustomersList();

      const appServiceInstance = Container.get(AppService);
      let app = await appServiceInstance.getApp();
      res.render('./admin/product/add', {
        router : pageId + "/product",
        siteConfig : config.siteConfig,
        categories : categories,
        attributes : attributes,
        pageCurrent : pageId,
        app : app,
        pageSetting : pageSetting,
        pages : pages,
        languages : languages,
        role: req.session.user.role,
        username : req.session.user.name,
        authors : authors
      });
  }

  public async Add(req, res) {
    try {  
      const serviceInstance = Container.get(ProductService);
      var imageData = []
      if (req.body.images) {
        imageData = JSON.parse(req.body.images)
      }

      var categories = []
      if (req.body.category) {
        categories = JSON.parse(req.body.category)
      }
      var hashtags = []
      if (req.body.hashtags) {
        hashtags = JSON.parse(req.body.hashtags)
      }

      var descriptionPlusData = []
      if (req.body.descriptionPlus) {
        descriptionPlusData = JSON.parse(req.body.descriptionPlus)
      }

      const attributeInstance = Container.get(AttributeService);
      let attributes = await attributeInstance.getAttributes(req.body.pageCurrent)
      
      var ecommerce = null
      var ecommercePlus = null

      if (req.body.platform == APPTYPE.EcommercePlus) {
        ecommercePlus = this.getEcommercePlus(req, attributes)
      }else{
        ecommerce =  {
          price : req.body.price,
          priceSale : req.body.priceSale,
          quantity : req.body.quantity,
          discount : req.body.discount,
          unit : req.body.unit
        } as IProductEcommerce
      }
  
      var additional = {
        typeof: req.body.typeof,        
        authorId: req.body.authorId,
        authorName:req.body.authorName,
        copyright: req.body.copyright,
        publishYear: req.body.publishYear,
        source: req.body.source,
        nameVn: req.body.nameVn,
        nameEn: req.body.nameEn,
        nameLa: req.body.nameLa,
        typeEvent: req.body.typeEvent,
        dateStart: req.body.typeEvent === 'one' ? req.body.dateStart[0] : req.body.dateStart[1],
        timeStart: req.body.typeEvent === 'one' ? req.body.timeStart[0] : req.body.timeStart[1],
        dateEnd: req.body.dateEnd,
        timeEnd: req.body.timeEnd,
        address: req.body.typeEvent === 'one' ? req.body.address[0] : req.body.address[1],
      } as IProductAdditional;

      const contributeInstance = Container.get(CustomerService);
      
      const items = await serviceInstance.addProduct({
        url: req.body.url,
        pageId: req.body.pageCurrent,
        categoryIds: categories,
        name: req.body.name,
        linkVideo: req.body.linkVideo,
        desShort: req.body.desShort,
        description: req.body.description,
        descriptionPlus: descriptionPlusData,
        images: imageData,
        pdf: req.body.pdf_file,
        ecommerce: ecommerce,
        ecommercePlus: ecommercePlus,
        hashtags: hashtags,
        contact: {
          name: req.body.cname,
          email: req.body.cemail,
          phone: req.body.cphone,
          country: req.body.ccountry
        } as IProductContact,
        additional : additional,
        showTop: req.body.showTop == 'on',
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord: req.body.seoKey,
        seoDesc: req.body.seoDesc,
        status: STATUS.Active,
        userPost: req.session.user.userId,
        label: req.body.label
      } as unknown as IProductInputDTO);

      if (items) {
        if(req.body.authorId !== '' && req.body.authorId !== null ){
          await contributeInstance.addAndUpdateContribution(req.body.authorId, items._id);
        }
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {      
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async EditInit(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    let pageId = req.params.page
    let pageSetting = pages.find(x => {
      return x._id == pageId;
    });
    var categories = null
    if (pageSetting != null && pageSetting.setting != null && pageSetting.setting.isCategory == true) {
      const serviceInstance = Container.get(CategoryService);
      categories = await serviceInstance.getCategories(pageId)
    }

    const productInstance = Container.get(ProductService);
    let dataProduct = await productInstance.getProductInfo({
      _id : req.query.productId,
    } as IProduct)
    var attributes = null
      if (pageSetting != null && pageSetting.setting != null && pageSetting.setting.isAttribute == true) {
        const attributeInstance = Container.get(AttributeService);
        attributes = await attributeInstance.getAttributes(pageId)
      }

    const appServiceInstance = Container.get(AppService);
    let app = await appServiceInstance.getApp();

    const langServiceInstance = Container.get(LanguageService);
    let languages = await langServiceInstance.getLanguages();

    const authorServiceInstance = Container.get(CustomerService);
    let authors = await authorServiceInstance.getActiveCustomersList();

    res.render('./admin/product/edit', {
      router : pageId + "/product",
      siteConfig : config.siteConfig,
      categories : encodeURI(JSON.stringify(categories)),
      pageCurrent : pageId,
      pageSetting : pageSetting,
      attributes : attributes,
      authors : authors,
      data : dataProduct,
      app : app,
      pages : pages,
      languages : languages,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async Edit(req, res) {
    try {  
      const serviceInstance = Container.get(ProductService);

      const attributeInstance = Container.get(AttributeService);
      let attributes = await attributeInstance.getAttributes(req.body.pageCurrent);

      const authorServiceInstance = Container.get(CustomerService);
      if(req.body.authorId && req.body.authorId !== '')
      await authorServiceInstance.addAndUpdateContribution(req.body.authorId, req.body._id);

      const items = await serviceInstance.updateProduct(this.getDataEdit(req, attributes) as IProductInputDTO);
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

  public getEcommercePlus(req,attributes) {

    var imagePlus = [""]
    if (req.body.imagePlus) {
      imagePlus = JSON.parse(req.body.imagePlus)
    }

    var altPlus = [""]
    if (req.body.altPlus) {
      altPlus = JSON.parse(req.body.altPlus)
    }
    
    var array = []
     if (Array.isArray(req.body.price)) {
       for (let i = 0; i < req.body.price.length; i++) {
        var data  : any = {}
        data.price = req.body.price[i]
        data.priceSale = req.body.priceSale[i]
        data.quantity = req.body.quantity[i]
        data.discount = req.body.discount[i]
        data.unit = req.body.unit[i]
        data.atribute = this.getAttributes(req, attributes, i)
        data.images = imagePlus[i]
        data.alts = altPlus[i]
        array.push(data)
       }
     }else{
      var data  : any = {}
      data.price = req.body.price
      data.priceSale = req.body.priceSale
      data.quantity = req.body.quantity
      data.discount = req.body.discount
      data.unit = req.body.unit
      data.atribute = this.getAttributes(req, attributes, -1)
      data.images = imagePlus[0]
      data.alts = altPlus[0]
      array.push(data)
     }
     return array
  }

  public getAttributes(req, attributes, pos){
    var array = []
  
    attributes.forEach(element => {
      let attr = req.body["attribute_"+element._id]
      var dataAttributes  : any = {}
      if (attr && pos < attr.length) {
        if (pos != -1) {
          dataAttributes.id = element._id
          dataAttributes.code = attr[pos]
        }else{
          dataAttributes.id = element._id
          dataAttributes.code = attr
        }
      }
      array.push(dataAttributes)
    });
    return array
  }

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(ProductService);
      const dataImages = await serviceInstance.getProductImage({
        _id: req.body._id,
      } as IProductInputDTO);

      var ArrayImage = [];
      dataImages.images.forEach(item => {
          const image = item.image;
          const thumbnailSizes = [150, 250, 480, 720, 1200, 1280, 1920];
          thumbnailSizes.forEach(size => {
            ArrayImage.push(image.replace('images/', `thumbnail/${size}/`).replace(/\.(png|jpg|jpeg)$/i, '.webp'));
          });
          ArrayImage.push(image);
      });

      const authorServiceInstance = Container.get(CustomerService);
      await authorServiceInstance.removeContributeByProduct(req.body._id);

      const conmmentServiceInstance = Container.get(CommentService);
      await conmmentServiceInstance.removeCommentByProduct({ productId : req.body._id} as IComment);

      await this.RemoveFileAny(ArrayImage);
      const data = await serviceInstance.removeProduct({
        _id: req.body._id,
      } as IProduct);

      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }


  private getDataEdit(req, attributes) {
    var imageData
    if (req.body.images) {
       imageData = JSON.parse(req.body.images)
    }

    var altsData
    if (req.body.alts) {
      altsData =  JSON.parse(req.body.alts)
    }

    var categories = []
    if (req.body.category) {
      categories = JSON.parse(req.body.category)
    }
    var hashtags = []
    if (req.body.hashtags) {
      hashtags = JSON.parse(req.body.hashtags)
    }

    var descriptionPlusData = null
    if (req.body.descriptionPlus) {
      descriptionPlusData = JSON.parse(req.body.descriptionPlus)
    }

    var ecommerce = null
    var ecommercePlus = null

    if (req.body.platform == APPTYPE.EcommercePlus) {
      ecommercePlus = this.getEcommercePlus(req, attributes)
    }else{
      ecommerce =  {
        price : req.body.price,
        priceSale : req.body.priceSale,
        quantity : req.body.quantity,
        discount : req.body.discount,
        unit : req.body.unit
      } as IProductEcommerce
    }

    var additional = {
      typeof: req.body.typeof,        
      authorId: req.body.authorId,
      authorName: req.body.authorName,
      copyright: req.body.copyright,
      publishYear: req.body.publishYear,
      source: req.body.source,
      nameVn: req.body.nameVn,
      nameEn: req.body.nameEn,
      nameLa: req.body.nameLa,
      typeEvent: req.body.typeEvent,
      dateStart: req.body.typeEvent === 'one' ? req.body.dateStart[0] : req.body.dateStart[1],
      timeStart: req.body.typeEvent === 'one' ? req.body.timeStart[0] : req.body.timeStart[1],
      dateEnd: req.body.dateEnd,
      timeEnd: req.body.timeEnd,
      address: req.body.typeEvent === 'one' ? req.body.address[0] : req.body.address[1],
    } as IProductAdditional;
    
    if (req.body.language) {
      return {
        _id : req.body._id,
        url : req.body.url,
        pageId : req.body.pageCurrent,
        categoryIds : categories,
        linkVideo : req.body.linkVideo,
        images : imageData,
        ecommerce : ecommerce,
        ecommercePlus : ecommercePlus,
        additional : additional,
        hashtags : hashtags,
        contact : {
          name : req.body.cname,
          email : req.body.cemail,
          phone : req.body.cphone,
          country : req.body.ccountry
        } as IProductContact,
        showTop : req.body.showTop == 'on',
        label : req.body.label,
        status : STATUS.Active,
        languages : this.getLanguages(req),
        userPost : req.session.user.userId
      }
    }else{
      return {
        _id : req.body._id,
        url : req.body.url,
        pageId : req.body.pageCurrent,
        categoryIds : categories,
        name : req.body.name,
        linkVideo : req.body.linkVideo,
        desShort : req.body.desShort,
        description : req.body.description,
        descriptionPlus : descriptionPlusData,
        images : imageData,
        ecommerce : ecommerce,
        ecommercePlus : ecommercePlus,
        hashtags : hashtags,
        additional : additional,
        contact : {
          name : req.body.cname,
          email : req.body.cemail,
          phone : req.body.cphone,
          country : req.body.ccountry
        } as IProductContact,
        showTop : req.body.showTop == 'on',
        label : req.body.label,
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord : req.body.seoKey,
        seoDesc : req.body.seoDesc,
        status : STATUS.Active,
        userPost : req.session.user.userId
      } as IProductInputDTO
    }
  }

  private getLanguages(req){
    var languages = JSON.parse(req.body.languages)
    var descriptionPlus = []
    if (req.body.descriptionPlus) {
      descriptionPlus = JSON.parse(req.body.descriptionPlus)
    }
    var isExists = false
    if (languages && languages.length > 0) {
      languages.forEach(l => {
        if (l.code == req.body.language) {
          isExists = true
          l.name = req.body.name
          l.desShort = req.body.desShort
          l.description = req.body.description
          l.seoTitle = req.body.seoTitle
          l.seoName= req.body.seoName
          l.seoKeyWord = req.body.seoKey
          l.seoDesc = req.body.seoDesc
          l.price = req.body.price
          l.unit = req.body.unit
          l.descriptionPlus = descriptionPlus
        }
      });
    }else{
      languages = []
    }
    if (!isExists) {
      languages.push({
        code: req.body.language,
        name : req.body.name,
        desShort : req.body.desShort,
        description : req.body.description,
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord : req.body.seoKey,
        seoDesc : req.body.seoDesc,
        price : req.body.price,
        unit : req.body.unit,
        descriptionPlus : descriptionPlus
      })
    }
    return languages
  }

  public async RemoveFileAny(pathOject: any) {
    if (pathOject != null) {
        pathOject.forEach(pathLink => {
            if (fs.existsSync(path.join(pathLink))) {
                fs.unlink(path.join(pathLink), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                console.log(`File ${pathLink} does not exist.`);
            }
        });
    }
  }
}
