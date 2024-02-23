import express from 'express';
import controllers from '../controllers/contactController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class ContactRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): ContactRouter {
    return new ContactRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/contact',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      '/admin.addOrEditContact',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.AddOrEditContact(req, res);
      }
    );
  }
}
