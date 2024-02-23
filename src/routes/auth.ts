import express from "express";
import AuthenController from "../controllers/authenController";
import isAuth from "../middlewares/isAuth";

export class AuthRouter {
  constructor(private app: express.Application) {
    this.setRoutes(new AuthenController());
  }

  static init(app: express.Application): AuthRouter {
    return new AuthRouter(app);
  }

  setRoutes(controller : AuthenController) {
    this.app.get("/admin/login", async (req, res) => {
      controller.Init(req, res);
    });

    this.app.post("/admin/login", async (req, res) => {
      controller.Login(req, res);
    });

    this.app.get("/admin/logout", isAuth, async (req, res) => {
      controller.Logout(req, res);
    });

    this.app.get("/admin/forgot-password", async (req, res) => {
      controller.ForgotPassword(req, res);
    });

    this.app.post(
      '/admin.forgot-password',
      async (req, res) => {
        controller.ResendPassword(req, res);
      }
    );
  }
}