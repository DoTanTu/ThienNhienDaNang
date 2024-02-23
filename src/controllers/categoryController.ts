import { Container } from 'typedi';
import config from '../config';
import PageService from '../services/page';
import CategorieService from '../services/category';
import { Utils } from '../utils/utils';
import { ICategory, ICategoryInputDTO } from '../models/interfaces/ICategory';
import { STATUS } from '../utils/status';
import LanguageService from '../services/language';
import AppService from '../services/app';

export default class CategoryController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    let page = req.params.page

    const langServiceInstance = Container.get(LanguageService);
    let languages = await langServiceInstance.getLanguages()
    
    let pageCheck = pages.find(x => x._id == page)
    var isLockDelete = false
    if (pageCheck != undefined && pageCheck != null && pageCheck.setting != null) {
      isLockDelete = pageCheck.setting.isLockDelete
    }
    let actions = Utils.getAction(req.session.user.role, isLockDelete)
    
    const serviceCategoryInstance = Container.get(CategorieService);
    let categories = await serviceCategoryInstance.getCategories(page)
 
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/category/list', {
      router : page + "/category",
      siteConfig : config.siteConfig,
      app : app,
      data : categories,
      pageCurrent : page,
      pages : pages,
      languages : languages,
      role: req.session.user.role,
      actions : actions,
      username : req.session.user.name
    });
  }

  public async GetCategories(req, res) {
    const serviceInstance = Container.get(CategorieService);
    let page = req.params.page
    var responses = await serviceInstance.getFullDataCategory({
      pageId : page,
      query: req.query.search.value,
      start: parseInt(req.query['start']),
      limit: parseInt(req.query['length']),
      role: req.session.user.role,
      language : req.query.hl
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

  public async AddOrEdit(req, res) {
    try {  
      const serviceInstance = Container.get(CategorieService);
      var items;
      if(req.body.cateId != undefined && req.body.cateId != ''){
        items = await serviceInstance.updateCategory(this.getDataEdit(req) as ICategoryInputDTO);
      }else{
        var imageData = []
        if (req.body.images) {
          imageData = JSON.parse(req.body.images)
        }
        var altData = []
        if (req.body.alts) {
          altData = JSON.parse(req.body.alts)
        }
        items = await serviceInstance.addCategory({
          url : Utils.getId(req.body.name),
          pageId : req.body.pageCurrent,
          name : req.body.name,
          desc : req.body.desc,
          images : imageData,
          alts : altData,
          parents : req.body.parents,
          showTop : req.body.showTop == 'on',
          seoTitle: req.body.seoTitle,
          seoName: req.body.seoName,
          seoKeyWord : req.body.seoKey,
          seoDesc : req.body.seoDesc,
          status : STATUS.Active,
          level : req.body.level,
          userPost : req.session.user.userId
        } as ICategoryInputDTO);
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
      const serviceInstance = Container.get(CategorieService);
      const data = await serviceInstance.removeCategory({
        _id: req.body._id,
      } as ICategory);
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  private getDataEdit(req) {
    var imageData = []
    if (req.body.images) {
      imageData = JSON.parse(req.body.images)
    }
    var altData = []
    if (req.body.alts) {
      altData = JSON.parse(req.body.alts)
    }
    if (req.body.language) {
    return {
        _id : req.body.cateId,
        pageId : req.body.pageCurrent,
        desc : req.body.desc,
        images : imageData,
        alts : altData,
        parents : req.body.parents,
        showTop : req.body.showTop == 'on',
        status : STATUS.Active,
        languages : this.getLanguages(req),
        level  : req.body.level,
        userPost : req.session.user.userId
      } 
    }else{
      return {
        _id : req.body.cateId,
        url : Utils.getId(req.body.name),
        name : req.body.name,
        pageId : req.body.pageCurrent,
        desc : req.body.desc,
        images : imageData,
        alts : altData,
        parents : req.body.parents,
        showTop : req.body.showTop == 'on',
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord : req.body.seoKey,
        seoDesc : req.body.seoDesc,
        status : STATUS.Active,
        level  : req.body.level,
        userPost : req.session.user.userId
      } 
    }
  }

  private getLanguages(req){
    var languages = JSON.parse(req.body.languages)
    var isExists = false
    if (languages && languages.length > 0) {
      languages.forEach(l => {
        if (l.code == req.body.language) {
          isExists = true
          l.name = req.body.name
          l.desc = req.body.desc
          l.description = req.body.description
          l.seoTitle = req.body.seoTitle
          l.seoName= req.body.seoName,
          l.seoKeyWord = req.body.seoKey
          l.seoDesc = req.body.seoDesc
        }
      });
    }else{
      languages = []
    }
    if (!isExists) {
      languages.push({
        code: req.body.language,
        name : req.body.name,
        desc : req.body.desc,
        description : req.body.description,
        seoTitle: req.body.seoTitle,
        seoName: req.body.seoName,
        seoKeyWord : req.body.seoKey,
        seoDesc : req.body.seoDesc,
      })
    }
    return languages
  }
}
