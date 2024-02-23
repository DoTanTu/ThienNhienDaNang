import Container from "typedi";
import LanguageService from "../services/language";
const path = require('path');
var i18n = require('i18n');


export default async (req, res, next) => {
  const serviceInstance = Container.get(LanguageService);
  let items = await serviceInstance.getLanguages();
  if (items) {
    let languageCodes = items.map(item => item._id)
    if (languageCodes && languageCodes.length > 0) {
      i18n.configure({
        locales: languageCodes,
        directory: path.join(__dirname, '../../public/app/locales'),
        cookie: 'lang',
      });
      i18n.init(req, res);
      res.locals.__ = i18n.__;
      return next();
    }else{
      return next();
    }
  } else {
    return next();
  }
}

  