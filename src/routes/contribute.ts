import express from 'express';
import checkRole from '../middlewares/checkRole';
import controllers from '../controllers/contributeController';
import isAuth from '../middlewares/isAuth';
import isAuthCustomer from '../middlewares/isAuthCustomer';
import { ROLE } from '../utils/role';

export class ContributeRouter {
    constructor(private app: express.Application){
        this.setRoutes(new controllers());
    }

    static init(app : express.Application): ContributeRouter {
        return new ContributeRouter(app);
    }

    setRoutes(controller : controllers){
        this.app.get(
            '/admin/contributes',
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async(req, res) => {
                controller.Init(req, res);
            }
        );

        this.app.get('/admin/get-contributes', 
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async(req, res) => {
                controller.GetContributes(req, res);
        });

        this.app.get('/admin.contribute/edit-contribute', 
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async(req, res) => {
                controller.EditInit(req, res);
        });

        this.app.post(
            "/admin.removeContribute",
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async (req, res) => {
              controller.Delete(req, res);
            }
        );

        // Customer
        this.app.post('/addContribute', 
            isAuthCustomer,
            async(req, res) => {
                controller.AddContribute(req, res);
        });
    }
}