import * as jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
    var  decrypt;
        try {
            if (!req.session || !req.session.user) {
              return res.redirect('/admin/login');
            }
            
            if (req.session == undefined || req.session.user == undefined || req.session.user.token == undefined || req.session.user.token == "") {
              return res.redirect('/admin/login');
            }

            decrypt =  jwt.verify(req.session.user.token, config.jwtSecret);
            
            if (decrypt.username){
              return next()
            }

            return res.redirect('/admin/login');
          
          } catch (err) {
            return res.redirect('/admin/login');
        }
}