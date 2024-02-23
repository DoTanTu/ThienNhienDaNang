import express from 'express';
import controllers from '../controllers/attributeController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class AttributeRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): AttributeRouter {
    return new AttributeRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin.:page/attribute',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin.:page/get-attributes',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.getAttributes(req, res);
      }
    );
    // this.app.get("/get-attributes", isAuth, async (req, res) => {
    //   controller.Getattribute(req, res);
    // });

    // this.app.get("/attribute-add", isAuth, async (req, res) => {
    //   controller.Add(req, res);
    // });

    this.app.post(
      '/admin.addAttribute',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.AddOrEdit(req, res);
      }
    );

    this.app.post(
      '/admin.addDetailAttribute',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.AddOrEditValueAttribute(req, res);
      }
    );

    this.app.post(
      '/admin.removeDetailAttribute',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.RemoveValueAttribute(req, res);
      }
    );
    

    this.app.post(
      '/admin.removeAttribute',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
