import { Container } from 'typedi';
import config from '../config';
import { IUser, IUserInputDTO } from '../models/interfaces/IUser';
import UserService from '../services/user';
import PageService from '../services/page';
import AppService from '../services/app';

export default class UserController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    res.render('./admin/user/list', {
      router : "users",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      role: req.session.user.role,
      username : req.session.user.name
    });
  }

  public async GetUser(req, res) {
    const serviceInstance = Container.get(UserService);
    var responses = await serviceInstance.getUsers({
      query: req.query.search.value,
      start: parseInt(req.query['start']),
      limit: parseInt(req.query['length']),
      role: req.session.user.role
    });
    
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

  public async Add(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()

    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();

    res.render('./admin/user/add', {
      router : "users",
      siteConfig : config.siteConfig,
      role: req.session.user.role,
      pages: pages,
      app : app,
      username : req.session.user.name
    });
  }

  public async AddUser(req, res) {
    try {      
      const serviceInstance = Container.get(UserService);
      const items = await serviceInstance.addUser({
        username: req.body.username,
        fullname: req.body.fullname,
        avatar : req.body.image,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
      } as IUserInputDTO);
      if (items) {
        res.status(200).json({ success: true, data: '' });
      } else {
        res.status(200).json({ success: false, data: '' });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }


  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(UserService);
      const data = await serviceInstance.removeUser({
        _id: req.body._id,
      } as IUser);
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: '' });
    }
  }

  public async InitProfile(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages()
    
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();

    const siteInstance = Container.get(UserService);
    let userInfo = await siteInstance.getUserInfo({
      _id: req.session.user.userId,
    } as IUser);

    res.render('./admin/user/profile', {
      router : "users",
      siteConfig : config.siteConfig,
      pages : pages,
      app : app,
      role: req.session.user.role,
      userInfo: userInfo,
      username : req.session.user.name
    });
  }

  public async EditProfile(req, res) {
    try {
      const serviceInstance = Container.get(UserService);
    
      const items = await serviceInstance.editProfile({
        _id:  req.session.user.userId,
        fullname: req.body.fullname,
        avatar: req.body.avatar,
      } as IUser);
      if (items) {
        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      console.log(e);
      
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async ChangePassword(req, res) {
    try {
      let session = req.session.customer;
      const serviceInstance = Container.get(UserService);
      const items = await serviceInstance.updatePassword(
        req.session.user.userId,
        req.body.oldPassword,
        req.body.password
      );
      if (items) {
        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }
}
