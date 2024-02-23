import express from 'express';
import controllers from '../controllers/pageController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class PageRouter {
  constructor(private app: express.Application) {
    // var storage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     console.log(req.body.page);
    //     cb(null, "images/page/");
    //   },
    //   filename: function (req, file, cb) {
    //     let date_ob = new Date(Date.now());
    //     let date = date_ob.getDate();
    //     let month = date_ob.getMonth() + 1;
    //     let year = date_ob.getFullYear();
    //     var folderName = path.join("images/page/" + date + "-" + month + "-" + year);
    //     if (!fs.existsSync("./"+folderName)){
    //       fs.mkdirSync("./"+folderName);
    //     }
    //     cb(null, date + "-" + month + "-" + year + "/" + file.originalname);
    //   },
    // });
    // const upload = multer({ storage: storage });
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): PageRouter {
    return new PageRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/pages',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-pages',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.GetPage(req, res);
      }
    );

    this.app.get(
      '/admin/page-add',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      '/admin.addPage',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.AddPage(req, res);
      }
    );

    this.app.get(
      '/admin/page-edit',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Edit(req, res);
      }
    );

    this.app.post(
      '/admin.editPage',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.EditPage(req, res);
      }
    );

    this.app.post(
      '/admin.removePage',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
