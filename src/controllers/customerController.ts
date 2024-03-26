import { Container } from "typedi";
import config from "../config";
import { ICustomer, ICustomerInputDTO } from "../models/interfaces/ICustomer";
import AppService from "../services/app";
import ContactService from "../services/contact";
import CustomerService from "../services/customer";
import MailService from "../services/mail";
import PageService from "../services/page";
import SiteService from "../services/site";
import * as argon2 from "argon2";
const QRCode = require('qrcode');
const path = require('path');
var os = require("os");
export default class CustomerController {
  public async Init(req, res) {
    const serviceInstance = Container.get(PageService);
    let pages = await serviceInstance.getPages();
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();

    var urlProfile= ""
    if(app.module.isQr){
      const siteInstance = Container.get(SiteService);
      const siteProfile = await siteInstance.findSiteProfile();
      
      if (siteProfile) {
        urlProfile = "http://"+app.hostName+"/"+siteProfile.url
      }
    }

    res.render("./admin/customer/list", {
      router: "customers",
      siteConfig: config.siteConfig,
      app: app,
      pages: pages,
      urlProfile : urlProfile,
      role: req.session.user.role,
      username: req.session.user.name,
    });
  }

  public async GetCustomer(req, res) {
    const serviceInstance = Container.get(CustomerService);
    var responses = await serviceInstance.getCustomers({
      query: req.query.search.value,
      start: parseInt(req.query["start"]),
      limit: parseInt(req.query["length"]),
      role: req.session.user.role,
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
    let pages = await serviceInstance.getPages();
    res.render("./admin/systemCustomer/add", {
      router: "customers",
      siteConfig: config.siteConfig,
      role: req.session.user.role,
      pages: pages,
      username: req.session.user.name,
    });
  }

  public async AddCustomer(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      var username = req.body.username;
      if(!username){
        username = req.body.email;
      }
      
      const item = await serviceInstance.addCustomer({
        fullname: req.body.fullname,
        username: username,
        avatar: req.body.image,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
        phone: req.body.phone,
        address: req.body.address,
        country: req.body.country,
      } as ICustomerInputDTO);
      if (item) {
        const siteInstance = Container.get(SiteService);
        const siteProfile = await siteInstance.findSiteProfile();
        
        if (siteProfile) {
          const url = "http://"+req.body.host+"/"+siteProfile.url+"?cus="+ item._id;
          const folder = path.join('public/qr/'+item._id+".png");
          QRCode.toFile(folder, url, function (err) {
            if (err) console.log(err)
          })
        }
        const mailInstance = Container.get(MailService);
        await mailInstance.sendEmailActiveUser(item._id, item.email);

        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async Edit(req, res) {
    res.render("./admin/systemCustomer/edit", {
      router: "customers",
      siteConfig: config.siteConfig,
      // role: req.session.user.role,
      // username : req.session.user.name
    });
  }

  public async Delete(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      const data = await serviceInstance.removeCustomer({
        _id: req.body._id,
      } as ICustomer);
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async ActiveCustomer(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      var id = req.body._id;
      if (id == undefined || id == null || id == "") {
        id = req.query["code"];
      }
      const data = await serviceInstance.activeCustomer(id);
      if (data) {
        const siteInstance = Container.get(SiteService);
        const siteProfile = await siteInstance.findSiteProfile();
        
        if (siteProfile) {
          const url = "/"+siteProfile.url+"?cus="+ id;
          res.redirect(url)
        }else{
          res.status(200).json({ success: true, data: data });
        }
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async InitLoginCustomer(req, res) {
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    if (app.module.isAuthen) {
      res.render("./app/login", {});
    } else {
      res.render("./error/page-404");
    }
  }

  public async InitSignUpCustomer(req, res) {
    const appInstance = Container.get(AppService);
    let app = await appInstance.getApp();
    if (app.module.isAuthen) {
      res.render("./app/signup", {});
    } else {
      res.render("./error/page-404");
    }
  }

  public async  SignUpCustomer(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      const items = await serviceInstance.addCustomer({
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.email,
        password: req.body.password,
      } as ICustomerInputDTO);
      if (items) {
        const mailInstance = Container.get(MailService);
        const sendMail = await mailInstance.sendEmailActiveUser(items._id, items.email);
        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async LoginCustomer(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const serviceInstance = Container.get(CustomerService);
      const { user, token } = await serviceInstance.signInCustomer(
        email,
        password
      );

      req.session.customer = {
        customerId: user._id,
        email: user.email,
        role: user.role,
        token: token,
      };

      res.status(200).json({ success: true });
    } catch (e) {
      res.status(200).json({ success: false, error: "Register Error" });
    }
  }

  

  public async LogoutCustomer(req, res) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return res.redirect("/");
        } else {
          return res.redirect("/");
        }
      });
    }
  }

  public async InitProfile(req, res) {
    let session = req.session.customer;
    if (session) {
      const siteInstance = Container.get(CustomerService);

      const contactInstance = Container.get(ContactService);
      let dataContact = await contactInstance.getContact();

      let customer = await siteInstance.getCustomerInfo({
        _id: session.customerId,
      } as ICustomer);

      // res.render("./app/profile-default", {
      //   customer: customer,
      //   contact : dataContact
      // });
      res.status(200).json( {
        success: true,
        customer: customer,
        contact : dataContact
      });
    } else {
      res.render("./error/page-404");
    }
  }

  public async EditProfile(req, res) {
    try {
      let session = req.session.customer;
      const serviceInstance = Container.get(CustomerService);
    
      var links = []
      if (req.body.links) {
        links = JSON.parse(req.body.links)
      }

      const items = await serviceInstance.editProfile({
        _id: session.customerId,
        fullname: req.body.fullname,
        avatar: req.body.avatar,
        backgroundImage : req.body.backgroundImage,
        phone: req.body.phone,
        address: req.body.address,
        description : req.body.description,
        links : links
      } as ICustomer);
      if (items) {
        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async ChangePassword(req, res) {
    try {
      let session = req.session.customer;
      const serviceInstance = Container.get(CustomerService);
      const items = await serviceInstance.updatePassword(
        session.customerId,
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

  public async CustomerOrderHistory(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      let session = req.session.customer;
      let orders = await serviceInstance.getOrderByCustomer(
        session.customerId,
        session.email
      );

      if (orders) {
        var products = [];
        orders.forEach(element => {
          if (element.productList) {
            element.productList.forEach(product =>{
              product.createdAt = element.createdAt
              product.status = element.status
              products.push(product)
            })
          }
        });

        res.status(200).json({
          success: true,
          recordsTotal: products.length,
          recordsFiltered: products.length,
          data: {
            data: products,
            role: req.session.user.role,
          },
        });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async ResendPassword(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      let password =  Math.random().toString(36).slice(-8);
      const items = await serviceInstance.resetPassword(
        req.body.email,
        password
      );
      if (items) {
        const mailInstance = Container.get(MailService);
        await mailInstance.sendEmailPassword(items.email, password);
        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async LockAndUnLockCustomer(req, res) {
    try {
      const serviceInstance = Container.get(CustomerService);
      var id = req.body._id;
      const data = await serviceInstance.updateStatusCustomer(id, req.body.isLock);
      if (data) {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (e) {
      console.log(e);
      
      res.status(200).json({ success: false, data: "" });
    }
  }
}
