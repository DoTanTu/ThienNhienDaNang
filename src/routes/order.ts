import express from 'express';
import controllers from '../controllers/orderController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class OrderRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): OrderRouter {
    return new OrderRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/order',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-orders',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.GetOrders(req, res);
      }
    );

    this.app.get(
      '/admin/view-order',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.ViewOrders(req, res);
      }
    );

    this.app.get(
      '/admin/edit-order',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.EditOrdersInit(req, res);
      }
    );

    this.app.post(
      '/addOrder',
      async (req, res) => {
        controller.AddOrder(req, res);
      }
    );

    this.app.post(
      '/editOrder',
      async (req, res) => {
        controller.EditOrder(req, res);
      }
    );

    this.app.post(
      '/admin.removeOrder',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );

    this.app.post(
      '/admin.updateStatusOrder',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.UpdateStatusOrder(req, res);
      }
    );
  }
}
