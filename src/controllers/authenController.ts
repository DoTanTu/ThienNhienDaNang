import AuthService from '../services/auth';
import { Container } from 'typedi';
import config from '../config';
import MailService from '../services/mail';

export default class AuthenController {
  public async Init(req, res) {
    res.render('./admin/auth/login', { siteConfig: config.siteConfig });
  }

  public async Login(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const authServiceInstance = Container.get(AuthService);
      const { user, token } = await authServiceInstance.SignIn(
        username,
        password
      );

      req.session.user = {
        userId: user._id,
        name: user.username,
        role: user.role,
        token: token,
      };

      res.status(200).json({ success: true });
    } catch (e) {
      res.status(200).json({ success: false, error: 'Register Error' });
    }
  }

  public async Logout(req, res) {
    if (req.session) {
      req.session.destroy(function (err) {
        return res.redirect('/admin/login');
      });
    }
  }


  public async ForgotPassword(req, res) {
    res.render('./admin/auth/forgotpassword', { siteConfig: config.siteConfig });
  }

  public async ResendPassword(req, res) {
    try {
      const serviceInstance = Container.get(AuthService);
      let password =  Math.random().toString(36).slice(-8);
      const items = await serviceInstance.resetPassword(
        req.body.email,
        password
      );
      if (items) {
        const mailInstance = Container.get(MailService);
        await mailInstance.sendEmailPassword(req.body.email, password);
        res.status(200).json({ success: true, data: "" });
      } else {
        res.status(200).json({ success: false, data: "" });
      }
    } catch (e) {
      console.log(e);
      
      res.status(200).json({ success: false, data: "" });
    }
  }
}
