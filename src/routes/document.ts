import express from 'express';
import controllers from '../controllers/documentController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class DocumentRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): DocumentRouter {
    return new DocumentRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/document',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );
  }
}
