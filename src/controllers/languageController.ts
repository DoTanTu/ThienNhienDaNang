import { Container } from 'typedi';
import config from '../config';
import { ILanguage } from '../models/interfaces/ILanguage';
import AppService from '../services/app';
import LanguageService from '../services/language';
import PageService from '../services/page';
const fs = require('fs');
const path = require('path');
var i18n = require('i18n');

export default class LanguageController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    try {
      fs.readFile(path.join(__dirname, '../utils/languageData.json'), (err, data) => {
        if (err) console.log(err);
        let languages = JSON.parse(data);
        res.render('./admin/language/list', {
          router : "language",
          siteConfig : config.siteConfig,
          languages : languages,
          pages : pages,
          app : app,
          role: req.session.user.role,
          username : req.session.user.name
        });
      });
    } catch (error) {
      res.render('./admin/language/list', {
        router : "language",
        siteConfig : config.siteConfig,
        pages : pages,
        app : app,
        role: req.session.user.role,
        username : req.session.user.name
      });
    }
  }

  public async GetLanguages(req, res) {
    const serviceInstance = Container.get(LanguageService);
    var responses = await serviceInstance.getFullDataLanguages({
      query: req.query.search.value,
      start: parseInt(req.query['start']),
      limit: parseInt(req.query['length'])
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

  public async AddLanguage(req, res) {
    try {      
      const serviceInstance = Container.get(LanguageService);
      let language = JSON.parse(req.body.language)
      if (language) {
        const items = await serviceInstance.addLanguage({
          _id : language.languageCode,
          name : language.languageName,
        } as ILanguage);
        if (items) {
          let languageCodes = items.map(item => item._id)
          if (languageCodes && languageCodes.length > 0) {
            i18n.configure({
              locales: languageCodes,
              directory: path.join(__dirname, '../../public/app/locales'),
              defaultLocale: languageCodes[0],
              cookie: 'lang',
            });
            i18n.init(req, res);
            res.locals.__ = i18n.__;
            res.status(200).json({ success: true, data: '' });
          }else{
            res.status(200).json({ success: true, data: '' });
          }
        } else {
          res.status(200).json({ success: false, data: '' });
        }
      }else{
      
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(LanguageService);
      const items = await serviceInstance.removeLanguage({
        _id: req.body._id,
      } as ILanguage);
      if (items) {
        let languageCodes = items.map(item => item._id)
        if (languageCodes && languageCodes.length > 0) {
          i18n.configure({
            locales: languageCodes,
            directory: path.join(__dirname, '../../public/app/locales'),
            defaultLocale: languageCodes[0],
            cookie: 'lang',
          });
          i18n.init(req, res);
          res.locals.__ = i18n.__;
          res.status(200).json({ success: true, data: '' });
        }else{
          i18n.configure({
            locales: ['vi'],
            directory: path.join(__dirname, '../../public/app/locales'),
            defaultLocale: 'vi',
            cookie: 'lang',
          });
          i18n.init(req, res);
          res.locals.__ = i18n.__;
          res.status(200).json({ success: true, data: '' });
        }
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }
}
