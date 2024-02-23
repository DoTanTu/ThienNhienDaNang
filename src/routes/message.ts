import express from 'express';
import controllers from '../controllers/messageController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class MessageRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): MessageRouter {
    return new MessageRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/message',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-messages',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.GetMessage(req, res);
      }
    );

    this.app.post(
      '/addMessage',
      async (req, res) => {
        controller.AddMessage(req, res);
      }
    );

    this.app.post(
      '/admin.removeMessage',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
