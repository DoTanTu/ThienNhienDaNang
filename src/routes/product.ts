import express from "express";
import controllers from "../controllers/productController";
import checkRole from "../middlewares/checkRole";
import isAuth from "../middlewares/isAuth";
import { ROLE } from "../utils/role";
const fs = require("fs");
const path = require("path");

export class ProductRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): ProductRouter {
    return new ProductRouter(app);
  }

  setRoutes(controller : controllers) {
    this.app.get("/admin.:page/products", isAuth,checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]), async (req, res) => {
      controller.Init(req, res);
    });

    this.app.get("/admin.:page/get-products", isAuth, checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]), async (req, res) => {
      controller.GetProducts(req, res);
    });

    this.app.get("/admin.:page/add-product", isAuth, checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]), async (req, res) => {
      controller.AddInit(req, res);
    });

    this.app.get("/admin.:page/edit-product", isAuth, checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]), async (req, res) => {
      controller.EditInit(req, res);
    });

    this.app.post(
      "/admin.addProduct",
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Add(req, res);
      }
    );

    this.app.post(
      "/admin.editProduct",
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Edit(req, res);
      }
    );


    this.app.post(
      "/admin.removeProduct",
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.Delete(req, res);
      }
    );
  }
}