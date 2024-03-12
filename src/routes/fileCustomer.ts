import express from 'express';
import controllers from '../controllers/fileController';
import * as multer from 'multer';
import isAuthCustomer from '../middlewares/isAuthCustomer';
import config from '../config';
const fs = require('fs');
const path = require('path');

export class FileCustomRouter {
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
        if (!fs.existsSync('./images/' + rootFolder)) {
          fs.mkdirSync('./images/' + rootFolder);
        }

        config.image.sizes.forEach(s => {
          let folderThumbnail = path.join(
            'thumbnail/' + s.name
          );
          if(!fs.existsSync('./' + folderThumbnail)){
            fs.mkdirSync('./' + folderThumbnail);
          }
          let folderResize = path.join(
            'thumbnail/' + s.name + "/" + rootFolder
          );
          if(!fs.existsSync('./' + folderResize)){
            fs.mkdirSync('./' + folderResize);
          }
        });
        
        cb(null, 'images/' + rootFolder + '/');
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
          'images/' + rootFolder + '/' + date + '-' + month + '-' + year
        );
        if (!fs.existsSync('./' + folderName)) {
          fs.mkdirSync('./' + folderName);
        }

        config.image.sizes.forEach(s => {
          let folderThumbnail = path.join(
            'thumbnail/' + s.name
          );
          if(!fs.existsSync('./' + folderThumbnail)){
            fs.mkdirSync('./' + folderThumbnail);
          }
          let folderResize = path.join(
            'thumbnail/' + s.name + "/" + rootFolder + '/' + date + '-' + month + '-' + year
          );
          if(!fs.existsSync('./' + folderResize)){
            fs.mkdirSync('./' + folderResize);
          }
        })
        
        cb(null, date + '-' + month + '-' + year + '/' + file.originalname);
      },
      fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback( /*res.end('Only images are allowed')*/ null, false)
        }

        callback(null, true)
      }
    });
    const upload = multer({ storage: storage });
    this.setRoutes(new controllers(), storage, upload);
  }

  static init(app: express.Application): FileCustomRouter {
    return new FileCustomRouter(app);
  }

  setRoutes(controller: controllers, storage, upload) {
    this.app.post(
      '/uploadAvatar',
      isAuthCustomer,
      upload.any(),
      async (req, res) => {
        controller.UploadFile(req, res);
      }
    );

    this.app.post(
      '/removeAvatar',
      isAuthCustomer,
      async (req, res) => {
        controller.RemoveCustomerFile(req, res);
      }
    );
  }
}
