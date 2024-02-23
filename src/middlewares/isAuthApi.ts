import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from '../config';

export const isAuthApi = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  var token =  "";
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  }

  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtAPISecret);
    res.locals.jwtPayload = jwtPayload;
   
    
  } catch (error) {
    res.status(401).json({success: false, error: "unauthorized"});
    return;
  }

  next();
};