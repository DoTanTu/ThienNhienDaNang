import express from 'express';
import controllers from '../controllers/userController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class UserRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): UserRouter {
    return new UserRouter(app);
  }

  setRoutes(controller: controllers) {
    this.app.get(
      '/admin/users',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-users',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.GetUser(req, res);
      }
    );

    this.app.get(
      '/admin/add-user',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      '/admin.addUser',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin]),
      async (req, res) => {
        controller.AddUser(req, res);
      }
    );

    this.app.post(
      '/admin.removeUser',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );


    this.app.get(
      '/admin/user-profile',
      isAuth,
      async (req, res) => {
        controller.InitProfile(req, res);
      }
    );

    this.app.post(
      '/admin.editProfile',
      isAuth,
      async (req, res) => {
        controller.EditProfile(req, res);
      }
    );

    this.app.post(
      '/admin.changePassword',
      isAuth,
      async (req, res) => {
        controller.ChangePassword(req, res);
      }
    );
  }
}
