import express from 'express';
import controllers from '../controllers/siteController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class SiteRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): SiteRouter {
    return new SiteRouter(app);
  }

  setRoutes(controller: controllers) {

    this.app.get(
      '/admin/sites',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Init(req, res);
      }
    );

    this.app.get(
      '/admin/get-sites',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.GetSite(req, res);
      }
    );

    this.app.get(
      '/admin/site-add',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      '/admin.addSite',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.AddSite(req, res);
      }
    );

    this.app.get(
      '/admin/site-edit',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Edit(req, res);
      }
    );

    this.app.post(
      '/admin.editSite',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.EditSite(req, res);
      }
    );

    this.app.post(
      '/admin.removeSite',
      isAuth,
      checkRole([ROLE.Author]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}
