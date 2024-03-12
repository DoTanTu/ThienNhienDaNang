const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
import config from "../config";
import { Utils } from "../utils/utils";

export default class FileController {
  public async UploadFile(req, res) {
    if (req.files != null && req.files.length > 0) {
      let image = req.files[0];

      const resize = (size) =>
        sharp(image.path)
          .metadata()
          .then(({ width }) => {
            if (width >= size.width) {
              return sharp(image.path)
                .resize({ width: size.width })
                .webp({ quality: config.image.quality })
                .toFile(Utils.covertToWebp(image.path, size.name));
            }
          });

      await Promise.all(config.image.sizes.map(resize)).then(() => {
        res.status(200).json({ success: true, data: req.files });
      });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async RemoveFile(req, res) {
    let pathFile = req.body.path;
    if (
      pathFile != undefined &&
      pathFile != null &&
      pathFile.indexOf("public") > -1
    ) {
      fs.unlink(path.join(pathFile), (err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ success: true });
      });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async RemoveCustomerFile(req, res) {
    let pathFile = req.body.path;

    if (
      pathFile != undefined &&
      pathFile != null &&
      pathFile.indexOf("images/customer") > -1
    ) {
      fs.unlink(path.join(pathFile), (err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ success: true });
      });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async UploadImage(req, res) {
    if (req.files != null && req.files.length > 0) {
      res.status(200).json({ success: true, data: req.files });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async UploadPDF(req, res) {
    if (req.files != null && req.files.length > 0) {
      res.status(200).json({ success: true, data: req.files });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async RemoveImage(req, res) {
    let pathFile = req.body.path;

    if (
      pathFile != undefined &&
      pathFile != null &&
      pathFile.indexOf("images/customerUpload") > -1
    ) {
      fs.unlink(path.join(pathFile), (err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ success: true });
      });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async UploaderCkEditor(req, res) {
    res.status(200).json({
      uploaded: true,
      url: "/" + req.files[0].path,
    });
  }

  public async GetImage(req, res) {
    let folderName = path.join("images/details/")
    if (!fs.existsSync('./' + folderName)) {
      fs.mkdirSync('./' + folderName);
    }
    const images = fs.readdirSync(folderName);
    var sorted = [];
    for (let item of images) {
      if (
        item.split(".").pop() === "png" ||
        item.split(".").pop() === "jpg" ||
        item.split(".").pop() === "jpeg" ||
        item.split(".").pop() === "svg"
      ) {
        var abc = {
          image: "/images/details/" + item,
          // "folder": "abc"
        };
        sorted.push(abc);
      }
    }
    res.send(sorted);
  }

  public async UploadContribute(req, res){
    if (req.files != null && req.files.length > 0) {
      res.status(200).json({ success: true, data: req.files });
    } else {
      res.status(400).json({ success: false });
    }
  }

  public async RemoveContribute(req, res){

  }

  
}
