import express from 'express';
import controllers from '../controllers/shipMethodController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class ShipMethodRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): ShipMethodRouter {
    return new ShipMethodRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/shipMethod',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.post(
      '/admin.addOrEditShipMethod',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.AddOrEditShipMethod(req, res);
      }
    );

    this.app.post(
      '/admin.removeShipMethod',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
