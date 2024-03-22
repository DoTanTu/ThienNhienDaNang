import express from 'express';
import controllers from '../controllers/fileController';
import checkRole from '../middlewares/checkRole';
import isAuth from '../middlewares/isAuth';
import * as multer from 'multer';
import { ROLE } from '../utils/role';
const fs = require('fs');
const path = require('path');
import config from '../config';

export class FilePDFRouter {
  constructor(private app: express.Application) {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        var rootFolder = req.body.page;
        if (rootFolder != null && rootFolder != "") {
          let split = rootFolder.toString().split(',')
          if (split.length > 0) {
            rootFolder = split[0]
          }
        }
        if (!fs.existsSync('./pdf/' + rootFolder)) {
          fs.mkdirSync('./pdf/' + rootFolder);
        }
        

        cb(null, 'pdf/' + rootFolder + '/');
      },
      filename: function (req, file, cb) {
        var rootFolder = req.body.page;
        let date_ob = new Date(Date.now());
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        if (rootFolder != null && rootFolder != "") {
          let split = rootFolder.toString().split(',')
          if (split.length > 0) {
            rootFolder = split[0]
          }
        }
        var folderName = path.join(
          'pdf/' + rootFolder + '/' + date + '-' + month + '-' + year
        );
        if (!fs.existsSync('./' + folderName)) {
          fs.mkdirSync('./' + folderName);
        }
        

        cb(null, date + '-' + month + '-' + year + '/' + file.originalname);
      },
      fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.pdf') {
            return callback( /*res.end('Only pdf are allowed')*/ null, false)
        }

        callback(null, true)
      }
    });
    const upload = multer({ storage: storage });
    this.setRoutes(new controllers(), storage, upload);
  }

  static init(app: express.Application): FilePDFRouter {
    return new FilePDFRouter(app);
  }

  setRoutes(controller: controllers, storage, upload) {
    this.app.post(
      '/admin.uploadPDF',
      isAuth,
      upload.any(),
      async (req, res) => {
        controller.UploadPDF(req, res);
      }
    );

    this.app.post(
      '/admin.removePdf',
      isAuth,
      checkRole([ROLE.Author, ROLE.Admin, ROLE.Manager, ROLE.Content]),
      async (req, res) => {
        controller.RemovePdf(req, res);
      }
    );
  }
}
