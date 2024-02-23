import express from "express";
import APIController from "../controllers/apiController";
import { isAuthApi } from "../middlewares/isAuthApi";
import config from '../config';

export class APIRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new APIController());
  }

  static init(app: express.Application): APIRouter {
    return new APIRouter(app);
  }

  setRoutes(controller : APIController) {
    this.app.post(config.api.prefix + "token", async (req, res) => {
      controller.GetTokenApi(req, res);
    });
  }
}