import express from "express";
import controllers from "../controllers/dashboardController";
import checkRole from "../middlewares/checkRole";
import isAuth from "../middlewares/isAuth";

export class DashboardRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new controllers());
  }

  static init(app: express.Application): DashboardRouter {
    return new DashboardRouter(app);
  }

  setRoutes(controller : controllers) {
    this.app.get("/admin", isAuth, async (req, res) => {
      controller.Init(req, res);
    });
  }
}