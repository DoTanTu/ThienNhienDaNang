import express from "express";
import checkRole from "../middlewares/checkRole";
import isAuth from "../middlewares/isAuth";
import * as multer from "multer";
import { ROLE } from "../utils/role";
const fs = require("fs");
const path = require("path");
var i18n = require("i18n");

export class BackLinkSiteRouter {
  constructor(private app: express.Application) {
    this.setRoutes();
  }

  static init(app: express.Application): BackLinkSiteRouter {
    return new BackLinkSiteRouter(app);
  }

  setRoutes() {
    this.app.get("*", function (req, res, next) {
      try {
        var isRedirect = false;
        var data = JSON.parse(
          fs.readFileSync(
            path.join(__dirname, "../../public/app/js/backlink.json")
          )
        );
        if (data) {
          data.forEach((element) => {
            if (element && decodeURI(req.url) == element.from) {
              if (element.to) {
                res.redirect(element.to);
                isRedirect = true;
                return;
              }
            }
          });
        }
        if (!isRedirect) {
          next();
        }
      } catch (error) {
        next();
      }
    });
  }
}
