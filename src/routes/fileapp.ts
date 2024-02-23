import express from 'express';
import controllers from '../controllers/fileController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');
var AdmZip = require("adm-zip");

export class FileAppRouter {
  constructor(private app: express.Application) {
    var storage = multer.diskStorage({
      destination: function (req, FileApp, cb) {
        var rootFolder = req.body.folder;
        if (!fs.existsSync('./public/app/' + rootFolder)) {
          fs.mkdirSync('./public/app/' + rootFolder);
        }
        cb(null, 'public/app/' + rootFolder + '/');
      },
      filename: function (req, file, cb) {
        var rootFolder = req.body.folder;        
        var folderName = path.join(
          'public/app/' + rootFolder + '/'
        );
        if (!fs.existsSync('./' + folderName)) {
          fs.mkdirSync('./' + folderName);
        }
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });
    this.setRoutes(new controllers(), storage, upload);
  }

  static init(app: express.Application): FileAppRouter {
    return new FileAppRouter(app);
  }

  setRoutes(controller: controllers, storage, upload) {
    this.app.post(
      '/admin.uploadFileApp',
      isAuth,
      checkRole([ROLE.Author]),
      upload.any(),
      async (req : any, res) => {
        if(req.files != null && req.files.length > 0){
          if (req.files[0].mimetype == 'application/zip' || req.files[0].mimetype == 'application/x-zip-compressed') {
            let pathFile = req.files[0].path;
            
            if (pathFile != undefined && pathFile != null && pathFile.indexOf("public/app")  > -1) {
              var zip = new AdmZip(path.join(pathFile));
              zip.extractAllTo(path.join("public/app"), true);
              fs.unlink(path.join(pathFile), (err) => {
                if (err) {
                    console.log(err);
                }
                res.status(200).json({"success":true , "data" : req.files});
             })
            }
          }else{
            res.status(200).json({"success":true , "data" : req.files});
          }
        }else{
            res.status(400).json({"success":false});
        }
      }
    );
  }
}
