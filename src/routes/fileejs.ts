import express from 'express';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');

export class FileEjsRouter {
  constructor(private app: express.Application) {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        var rootFolder = req.body.folder;
        if (rootFolder != null && rootFolder != "") {
          let split = rootFolder.toString().split(',')
          if (split.length > 0) {
            rootFolder = split[0]
          }
        }
        if (!fs.existsSync('./views/app/' + rootFolder)) {
          fs.mkdirSync('./views/app/' + rootFolder);
        }
        cb(null, 'views/app/' + rootFolder + '/');
      },
      filename: function (req, file, cb) {
        var rootFolder = req.body.folder;
        if (rootFolder != null && rootFolder != "") {
          let split = rootFolder.toString().split(',')
          if (split.length > 0) {
            rootFolder = split[0]
          }
        }
        var folderName = path.join(
          'views/app/' + rootFolder + '/'
        );
        if (!fs.existsSync('./' + folderName)) {
          fs.mkdirSync('./' + folderName);
        }
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });
    this.setRoutes( storage, upload);
  }

  static init(app: express.Application): FileEjsRouter {
    return new FileEjsRouter(app);
  }

  setRoutes(storage, upload) {
    this.app.post(
      '/admin.uploadFileEjs',
      isAuth,
      checkRole([ROLE.Author]),
      upload.any(),
      async (req  : any, res) => {
        if(req.files != null && req.files.length > 0){
            res.status(200).json({"success":true , "data" : req.files});
        }else{
            res.status(400).json({"success":false});
        }
      }
    );
  }
}
