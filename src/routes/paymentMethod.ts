import express from 'express';
import controllers from '../controllers/paymentMethodController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class PaymentMethodRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): PaymentMethodRouter {
    return new PaymentMethodRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/paymentMethod',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.post(
      '/admin.addOrEditPaymentMethod',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.AddOrEditPaymentMethod(req, res);
      }
    );

    this.app.post(
      '/admin.removePaymentMethod',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
