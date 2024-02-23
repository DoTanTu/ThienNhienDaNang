import { Container } from 'typedi';
import config from '../config';
import PageService from '../services/page';
import AttributeService from '../services/attribute';
import { IAttribute } from '../models/interfaces/IAttribute';
import LanguageService from '../services/language';
import { ATTRIBUTE } from '../utils/attribute';
import { Utils } from '../utils/utils';
import AppService from '../services/app';

export default class AttributeController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    let page = req.params.page

    const langServiceInstance = Container.get(LanguageService);
    let languages = await langServiceInstance.getLanguages()
    
    const attriServiceInstance = Container.get(AttributeService);
    var responses = await attriServiceInstance.getAttributes(page);

    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/attribute/list', {
      router : page + "/attribute",
      siteConfig : config.siteConfig,
      attributes : Object.keys(ATTRIBUTE),
      app : app,
      data : responses,
      pageCurrent : page,
      pages : pages,
      languages : languages,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async getAttributes(req, res) {
    const serviceInstance = Container.get(AttributeService);
    let page = req.params.page
    var responses = await serviceInstance.getAttributes(page);
    
    if (responses) {
      // res.status(200).json({
      //   success: true,
      //   recordsTotal: responses.total,
      //   recordsFiltered: responses.total,
      //   data: {
      //     data: responses.items,
      //     role: req.session.user.role,
      //   },
      // });
    } else {
      res.status(200).json({ success: false });
    }
  }

  public async AddOrEdit(req, res) {
    try {  
      const serviceInstance = Container.get(AttributeService);
      var items;
      if(req.body.attributeId != undefined && req.body.attributeId != ''){
        items = await serviceInstance.updateAttribute({
          _id : req.body.attributeId,
          values : req.body.valueData,
        } as IAttribute);
      }else{
        items = await serviceInstance.addAttribute({
          _id : Utils.getIdFrom(req.body.attribute,req.body.pageCurrent),
          tag : req.body.attribute,
          name : req.body.name,
          pageId : req.body.pageCurrent
      } as IAttribute)
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
     }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async AddOrEditValueAttribute(req, res) {
    try {  
      const serviceInstance = Container.get(AttributeService);
      if(req.body.detailAttributeId != undefined && req.body.detailAttributeId != ''){
       let items = await serviceInstance.updateAttribute({
          _id : req.body.detailAttributeId,
          values : this.getValueAttriburtes(req)
        } as IAttribute);
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
     }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async RemoveValueAttribute(req, res) {
    try {  
      const serviceInstance = Container.get(AttributeService);
      
      if(req.body.detailAttributeId != undefined && req.body.detailAttributeId != ''){
        var atts = JSON.parse(req.body.values)
        var values = []
        if (atts && atts.length > 0) {
          values = atts.filter(x => x.code != req.body.code)
        }
       let items = await serviceInstance.updateAttribute({
          _id : req.body.detailAttributeId,
          values : values
        } as IAttribute);
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
     }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(AttributeService);
      const data = await serviceInstance.removeAttribute({
        _id: req.body._id,
      } as IAttribute);
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  private getValueAttriburtes(req){
    var values = JSON.parse(req.body.values)

    var isExists = false
    if (values && values.length > 0) {
      values.forEach(l => {
        if (l.code == req.body.detailCode) {
          isExists = true
          l.value = req.body.detailValue
          l.images = JSON.parse(req.body.images)
        }
      });
    }else{
      values = []
    }
    if (!isExists) {
      values.push({
        code: Utils.getId(req.body.detailValue), 
        value : req.body.detailValue,
        images : JSON.parse(req.body.images)
      })
    }
    return values
  }
}
