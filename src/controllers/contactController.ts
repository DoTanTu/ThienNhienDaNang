import { Container } from 'typedi';
import config from '../config';
import { IContact, IContactInputDTO } from '../models/interfaces/IContact';
import AppService from '../services/app';
import ContactService from '../services/contact';
import PageService from '../services/page';
import { Utils } from '../utils/utils';

export default class ContactController {
  
  public async Add(req, res) {
    const serviceInstance = Container.get(PageService);
    const contactInstance = Container.get(ContactService);
    let pages = await serviceInstance.getPages()
    let dataContact = await contactInstance.getContact();
   
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    
    res.render('./admin/contact/contact', {
      router : "contact",
      siteConfig : config.siteConfig,
      role: req.session.user.role,
      app : app,
      data:  dataContact,
      pages: pages,
      username : req.session.user.name
    });
  }

  public async AddOrEditContact(req, res) {
    try {    
      const serviceInstance = Container.get(ContactService);
      var items;
      
      if(req.body.contactId != undefined && req.body.contactId != ''){
        items = await serviceInstance.updateContact({
          _id :  req.body.contactId,
          name : req.body.name,
          address : req.body.address,
          linkMap : req.body.linkMap,
          linkMap2 : req.body.linkMap2,
          linkMap3 : req.body.linkMap3,
          description : req.body.description,
          phone1 : req.body.phone1,
          phone2 : req.body.phone2,
          email :  req.body.email,
          phone3 :  req.body.phone3,
          address2 : req.body.address2,
          email2: req.body.email2,
          address3 : req.body.address3,
          email3 : req.body.email3,
          facebook: req.body.facebook,
          zalo : req.body.zalo,
          youtube : req.body.youtube,
          whatapp : req.body.whatapp,
          viber : req.body.viber,
          ggAnalytic : req.body.ggAnalytic,
          ggSearch : req.body.ggSearch
        } as IContactInputDTO);
      }else{
        items = await serviceInstance.addContact({
          name : req.body.name,
          address : req.body.address,
          linkMap : req.body.linkMap,
          linkMap2 : req.body.linkMap2,
          linkMap3 : req.body.linkMap3,
          description : req.body.description,
          phone1 : req.body.phone1,
          phone2 : req.body.phone2,
          email :  req.body.email,
          phone3 :  req.body.phone3,
          address2 : req.body.address2,
          email2: req.body.email2,
          address3 : req.body.address3,
          email3 : req.body.email3,
          facebook: req.body.facebook,
          zalo : req.body.zalo,
          youtube : req.body.youtube,
          whatapp : req.body.whatapp,
          viber : req.body.viber,
          ggAnalytic : req.body.ggAnalytic,
          ggSearch : req.body.ggSearch
        } as IContactInputDTO);
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
      const serviceInstance = Container.get(ContactService);
      const data = await serviceInstance.removeContact({
        _id: req.body._id,
      } as IContact);
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
