import * as express from 'express';
var bodyParser = require('body-parser')
import { Routes } from '../routes';
import config from '../config';
import i18nApp from './i18nApp';
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var compression = require('compression')
var minify = require('express-minify');
var minifyHTML = require('express-minify-html');

export default ({ app , db }: { app: express.Application, db : any}) => {

  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

  app.use(compression());
  app.use(minify());
  app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
    }
}));

  //init js, css
  app.use('/public', express.static("public"));
  app.use('/backup', express.static("backup"));
  app.use('/images', express.static("images"));
  app.use('/pdf', express.static("pdf"));
  app.use('/contribute', express.static("contribute"));
  app.use('/thumbnail', express.static("thumbnail"));
  //init ejs
  app.set("view engine","ejs");
  app.set("views","./views");

  //cookieParser
  app.use(cookieParser());
  //------------
  
  app.use(session({
    secret: config.secret,
    saveUninitialized: false, 
    resave: true,
    cookie: {
            secure: !true,
            httpOnly: false,
            expires: false
    },
    store: new MongoStore({
      mongooseConnection: db
    }),
  }));

  app.use(i18nApp)
  // Load API routes
  Routes.init(app)

};