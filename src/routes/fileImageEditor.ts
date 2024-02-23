import express from 'express';
import controllers from '../controllers/fileController';
import * as multer from 'multer';
const fs = require('fs');
const path = require('path');
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import { ROLE } from '../utils/role';

export class FileImageEditorRouter {
  constructor(private app: express.Application) {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        var rootFolder = "details";
        if (rootFolder != null && rootFolder != "") {
          let split = rootFolder.toString().split(',')
          if (split.length > 0) {
            rootFolder = split[0]
          }
        }
        if (!fs.existsSync('./images/' + rootFolder)) {
          fs.mkdirSync('./images/' + rootFolder);
        }
        
        cb(null, 'images/' + rootFolder + '/');
      },
      filename: function (req, file, cb) {
        var rootFolder = "details";
        if (rootFolder != null && rootFolder != "") {
          let split = rootFolder.toString().split(',')
          if (split.length > 0) {
            rootFolder = split[0]
          }
        }
        var folderName = path.join(
          'images/' + rootFolder 
        );
        if (!fs.existsSync('./' + folderName)) {
          fs.mkdirSync('./' + folderName);
        }
        cb(null, '/' + file.originalname);
      },
      fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback( /*res.end('Only images are allowed')*/ null, false)
        }

        callback(null, true)
      }

    });
    const upload = multer({ storage: storage })
    this.setRoutes(new controllers(), storage, upload);
  }

  static init(app: express.Application): FileImageEditorRouter {
    return new FileImageEditorRouter(app);
  }

  setRoutes(controller: controllers, storage, upload) {
    this.app.get("/admin.getImages", isAuth,  checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
    async (req, res) => {
     controller.GetImage(req, res);
   });

   this.app.post(
     "/admin.uploaderCkEditor",
     isAuth,
     upload.any(),
     async (req, res) => {
       controller.UploaderCkEditor(req, res);
     }
   );
  }
}
