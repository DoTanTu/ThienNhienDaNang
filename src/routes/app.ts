import express from 'express';
import controllers from '../controllers/appController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class AppRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): AppRouter {
    return new AppRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.post(
      '/admin.addOrEditApp',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.AddOrEditApp(req, res);
      }
    );

    this.app.post(
      '/admin.removeApp',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
