import express from 'express';
import controllers from '../controllers/categoryController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class CategoryRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): CategoryRouter {
    return new CategoryRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin.:page/categories',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin.:page/get-categories',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.GetCategories(req, res);
      }
    );
    // this.app.get("/get-Categorys", isAuth, async (req, res) => {
    //   controller.GetCategory(req, res);
    // });

    // this.app.get("/Category-add", isAuth, async (req, res) => {
    //   controller.Add(req, res);
    // });

    this.app.post(
      '/admin.addCategory',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.AddOrEdit(req, res);
      }
    );

    this.app.post(
      '/admin.removeCategory',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
