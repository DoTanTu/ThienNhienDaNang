import express from 'express';
import controllers from '../controllers/customSiteController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
import isAuthCustomer from '../middlewares/isAuthCustomer';
const fs = require('fs');
const path = require('path');
var i18n = require("i18n");

export class CustomSiteRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): CustomSiteRouter {
    return new CustomSiteRouter(app);
  }

  setRoutes(controller: controllers) {
  
    this.app.use("/change-lang/:lang", async (req, res) => {
      res.cookie("lang", req.params.lang, { maxAge: 900000 });
      i18n.setLocale(req.params.lang);
      res.redirect("back");
    });


    this.app.post(
      '/search-products',
      async (req, res) => {
        controller.searchProducts(req, res);
      }
    );

    this.app.get(
      '/',
      async (req, res, next) => {
        controller.CheckSite(req, res, next);
      }
    );

    this.app.get(
      '/:url',
      async (req, res, next) => {
        controller.CheckSite(req, res, next);
      }
    );

    this.app.get(
      '/:lang/:url',
      async (req, res, next) => {
        controller.CheckSite(req, res, next);
      }
    );

    // this.app.get(
    //   '/:urlMenu/:urlSubMenu',
    //   async (req, res) => {
    //     controller.CheckMenu(req, res);
    //   }
    // );
  }
  
}
