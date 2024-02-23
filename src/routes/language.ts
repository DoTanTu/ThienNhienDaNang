import express from "express";
import LanguageController from "../controllers/languageController";
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class LanguageRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new LanguageController());
  }

  static init(app: express.Application): LanguageRouter {
    return new LanguageRouter(app);
  }

  setRoutes(controller : LanguageController) {
    this.app.post(
      '/admin.addLanguage',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res, next) => {
        controller.AddLanguage(req, res)
      }
    );

    this.app.get(
      '/admin/language',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-languages',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.GetLanguages(req, res);
      }
    );

    this.app.post(
      '/admin.removeLanguage',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}