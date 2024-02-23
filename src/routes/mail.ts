import express from 'express';
import controllers from '../controllers/mailController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class MailRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): MailRouter {
    return new MailRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/mail',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      '/admin.addOrEditmail',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.AddOrEditMail(req, res);
      }
    );
  }
}
