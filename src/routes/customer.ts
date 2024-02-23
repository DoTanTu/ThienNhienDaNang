import express from 'express';
import controllers from '../controllers/customerController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
import isAuthCustomer from '../middlewares/isAuthCustomer';
const fs = require('fs');
const path = require('path');

export class CustomerRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): CustomerRouter {
    return new CustomerRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/customers',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-customers',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.GetCustomer(req, res);
      }
    );

    this.app.get(
      '/admin/add-customer',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      '/admin.addCustomer',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.AddCustomer(req, res);
      }
    );

    this.app.post(
      '/admin.removeCustomer',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );

    this.app.post(
      '/admin.activeCustomer',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.ActiveCustomer(req, res);
      }
    );

    this.app.get(
      '/activeCustomer',
      async (req, res) => {
        controller.ActiveCustomer(req, res);
      }
    );

    // this.app.get(
    //   '/signup',
    //   async (req, res) => {
    //     controller.InitSignUpCustomer(req, res);
    //   }
    // );

    this.app.post(
      '/signup',
      async (req, res) => {
        controller.SignUpCustomer(req, res);
      }
    );

    this.app.get(
      '/login',
      async (req, res) => {
        controller.InitLoginCustomer(req, res);
      }
    );

    this.app.post(
      '/login',
      async (req, res) => {
        controller.LoginCustomer(req, res);
      }
    );

    this.app.get(
      '/logout',
      isAuthCustomer,
      async (req, res) => {
        controller.LogoutCustomer(req, res);
      }
    );

    this.app.get(
      '/profile',
      isAuthCustomer,
      async (req, res) => {
        controller.InitProfile(req, res);
      }
    );

    this.app.post(
      '/editProfile',
      isAuthCustomer,
      async (req, res) => {
        controller.EditProfile(req, res);
      }
    );

    this.app.post(
      '/changePassword',
      isAuthCustomer,
      async (req, res) => {
        controller.ChangePassword(req, res);
      }
    );

    this.app.get(
      '/order-history',
      isAuthCustomer,
      async (req, res) => {
        controller.CustomerOrderHistory(req, res);
      }
    );

    this.app.post(
      '/reset-password',
      async (req, res) => {
        controller.ResendPassword(req, res);
      }
    );

    this.app.post(
      '/admin.lockCustomer',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.LockAndUnLockCustomer(req, res);
      }
    );
  }
}
