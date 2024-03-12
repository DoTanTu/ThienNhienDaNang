import express from 'express';
import controllers from '../controllers/fileController';
import * as multer from 'multer';
import isAuthCustomer from '../middlewares/isAuthCustomer';
import config from '../config';
const fs = require('fs');
const path = require('path');

export class FileContributeCustomRouter {
  constructor(private app: express.Application) {
    const imageExtensions = ['.png', '.jpg', '.gif', '.jpeg'];
    const videoExtensions = ['.mp3', '.mp4'];
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {

        var rootFolder = '';
        var ext = path.extname(file.originalname);
        if (imageExtensions.includes(ext)) {
          rootFolder = 'images';
        } else if (videoExtensions.includes(ext)) {
          rootFolder = 'videos';
        } else {
          rootFolder = 'document';
        }

        if (!fs.existsSync('./contribute/' + rootFolder)) {
          fs.mkdirSync('./contribute/' + rootFolder);
        }
        cb(null, 'contribute/' + rootFolder + '/');
      },
      filename: function (req, file, cb) {
        var rootFolder = '';
        let date_ob = new Date(Date.now());
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
       
        var ext = path.extname(file.originalname);
        if (imageExtensions.includes(ext)) {
          rootFolder = 'images';
        } else if (videoExtensions.includes(ext)) {
          rootFolder = 'videos';
        } else {
          rootFolder = 'document';
        }

        var folderName = path.join('./contribute/' + rootFolder + '/' + date + '-' + month + '-' + year);
        if (!fs.existsSync('./' + folderName)) {
          fs.mkdirSync('./' + folderName);
        }
        
        cb(null, date + '-' + month + '-' + year + '/' + file.originalname);
      },
      fileFilter: function(req, file, callback) {
          callback(null, true);
      }
    });
    const upload = multer({ storage: storage });
    this.setRoutes(new controllers(), storage, upload);
  }

  static init(app: express.Application): FileContributeCustomRouter {
    return new FileContributeCustomRouter(app);
  }

  setRoutes(controller: controllers, storage, upload) {
    this.app.post(
      '/uploadFileContribute',
      isAuthCustomer,
      upload.any(),
      async (req, res) => {
        controller.UploadContribute(req, res);
      }
    );

    this.app.post(
      '/removeFileContribute',
      isAuthCustomer,
      async (req, res) => {
        controller.RemoveCustomerFile(req, res);
      }
    );
  }
}
