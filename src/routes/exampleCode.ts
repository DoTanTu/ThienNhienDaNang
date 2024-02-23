import express from 'express';
import controllers from '../controllers/exampleCodeController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class ExampleCodeRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): ExampleCodeRouter {
    return new ExampleCodeRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/example.payment',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.ExamplePayment(req, res);
      }
    );
  }
}
