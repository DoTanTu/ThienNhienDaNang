import express from 'express';
import controllers from '../controllers/fileController';
import * as multer from 'multer';
const fs = require('fs');
const path = require('path');

export class FileImageRouter {
  constructor(private app: express.Application) {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        var rootFolder = "customerUpload";
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
        var rootFolder = "customerUpload";
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
    const upload = multer({ storage: storage })
    upload.array('image', 2);
    this.setRoutes(new controllers(), storage, upload);
  }

  static init(app: express.Application): FileImageRouter {
    return new FileImageRouter(app);
  }

  setRoutes(controller: controllers, storage, upload) {
    this.app.post(
      '/uploadImage',
      upload.any(),
      async (req, res) => {
        controller.UploadImage(req, res);
      }
    );

    this.app.post(
      '/removeImage',
      async (req, res) => {
        controller.RemoveCustomerFile(req, res);
      }
    );
  }
}
