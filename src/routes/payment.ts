import express from 'express';
import controllers from '../controllers/paymentController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class PaymentRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): PaymentRouter {
    return new PaymentRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.post(
      '/payment',
      async (req, res) => {
        controller.CreatePayment(req, res);
      }
    );

    this.app.get(
      '/paymentSuccess',
      async (req, res) => {
        controller.PaymentSuccess(req, res);
      }
    );

    this.app.get(
      '/paymentCancel',
      async (req, res) => {
        controller.PaymentCancel(req, res);
      }
    );
  }
}
