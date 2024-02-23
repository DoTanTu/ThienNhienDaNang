import * as jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
    var  decrypt;
        try {
            if (!req.session || !req.session.customer) {
              return res.status(200).json({ success: false});
            }
            
            if (req.session == undefined || req.session.customer == undefined || req.session.customer.token == undefined || req.session.customer.token == "") {
              return res.status(200).json({ success: false});
            }

            decrypt = jwt.verify(req.session.customer.token, config.jwtCustomer);
            
            if (decrypt.email){
              return next()
            }

            return res.status(200).json({ success: false});
          
          } catch (err) {
            return res.status(200).json({ success: false});
        }
}