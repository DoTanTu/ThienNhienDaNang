import { Container } from 'typedi';
import config from '../config';
import AppService from '../services/app';
import PageService from '../services/page';
import CommentService from '../services/comment';
import { ICommentInputDTO, ICommentQuery } from '../models/interfaces/IComment';
import ProductService from '../services/product';
import { IProduct, IProductInputDTO } from '../models/interfaces/IProduct';
import { IComment } from './../models/interfaces/IComment';
import CustomerService from '../services/customer';

export default class CommentController {
    public async Init(req, res) {
      const serviceInstance = Container.get(PageService);
      let pages = await serviceInstance.getPages()
      const appInstance = Container.get(AppService);
      let app = await appInstance.getApp();
  
      res.render('./admin/comment/list', {
        router : "comment",
        siteConfig : config.siteConfig,
        pages : pages,
        app : app,
        role: req.session.user.role,
        username : req.session.user.name
      });
    };

    public async GetComments(req, res) {
      const serviceInstance = Container.get(CommentService);
      var responses = await serviceInstance.getComments({
        query: req.query.search.value,
        start: parseInt(req.query["start"]),
        limit: parseInt(req.query["length"]),
        role: req.session.user.role,
      } as ICommentQuery);
  
      if (responses) {
        res.status(200).json({
          success: true,
          recordsTotal: responses.total,
          recordsFiltered: responses.total,
          data: {
            data: responses.items,
            role: req.session.user.role,
          },
        });
      } else {
        res.status(200).json({ success: false });
      }
    }

    public async AddComment(req, res) {
      try {      
        const serviceInstance = Container.get(CommentService);
        const item = await serviceInstance.addComment({
          text: req.body.comment,
          productId: req.body.productId,
          userId: req.body.userId,
          parentId: req.body.parentId,
          is_delete: req.body.is_delete,
          userPost: req.body.userPost
        } as ICommentInputDTO);

        if(item){
            res.status(200).json({ success: true, data: item });
        }else {
          res.status(200).json({ success: false, data: '' });
        }
      } catch (e) {
        res.status(200).json({ success: false, data: '' });
      }
    }

    public async getCommentByProduct(req, res){
      try{
        const serviceInstance = Container.get(CommentService);
        const comments = await serviceInstance.getCommentByProductId({
          productId: req.query.productId
        } as IComment);
        
        const customerInstance = Container.get(CustomerService);
        const customers = await customerInstance.getFullCustomers();

        if(customers && comments){
          res.status(200).json({ success: true, data: {
            comments : comments.items,
            customers : customers.users
          }});
        }
        else{
          res.status(200).json({ success: false, data: '' });
        }
      }
      catch(e){
        res.status(200).json({ success: false, data: '' });
      }
    }

    public async ActiveComment(req, res){
      try {
        const serviceInstance = Container.get(CommentService);
        var id = req.body._id;
        if (id == undefined || id == null || id == "") {
          id = req.query["code"];
        }
        const data = await serviceInstance.activeComment(id);
        if (data) {
          res.status(200).json({ success: true, data: data });
        }else{
          res.status(200).json({ success: false, data: "" });
        }
      } catch (error) {
        res.status(200).json({ success: false, data: "" });
      }
    }

    public async Delete(req, res) {
      try {
        const serviceInstance = Container.get(CommentService);
        const data = await serviceInstance.removeComment({
          _id: req.body._id,
        } as IComment);
        if (data) {
          res.status(200).json({ success: true, data: data });
        } else {
          res.status(200).json({ success: false });
        }
      } catch (e) {
        res.status(200).json({ success: false, data: '' });
      }
    }
}  