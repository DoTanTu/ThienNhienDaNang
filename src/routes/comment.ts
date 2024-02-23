import express from 'express';
import checkRole from '../middlewares/checkRole';
import controllers from '../controllers/commentController';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class CommentRouter {
    constructor(private app: express.Application){
        this.setRoutes(new controllers());
    }

    static init(app : express.Application): CommentRouter {
        return new CommentRouter(app);
    }

    setRoutes(controller : controllers){
        this.app.get(
            '/admin/comment',
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async(req, res) => {
                controller.Init(req, res);
            }
        );

        this.app.get('/admin/get-comments', 
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async(req, res) => {
                controller.GetComments(req, res);
            });

        this.app.post('/addComment',
            async(req, res) => {
                controller.AddComment(req, res);
            }
        )

        this.app.get('/comments-product',
            async(req, res) => {
                controller.getCommentByProduct(req, res);
            }
        )

        this.app.post(
            '/admin.activeComment',
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager]),
            async (req, res) => {
              controller.ActiveComment(req, res);
            }
        );

        this.app.post(
            '/admin.removeComment',
            isAuth,
            checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
            async (req, res) => {
              controller.Delete(req, res);
            }
          );
    }
}