
const fs = require("fs");
const path = require("path");
import { Container } from 'typedi';
import config from '../config';
import AppService from '../services/app';
import PageService from '../services/page';
import ContributeService from '../services/contribute';
import {  IContribute, IContributeCustomer, IContributeFile, IContributeInputDTO, IContributeQuery } from '../models/interfaces/IContribute';


export default class CommentController {
    public async Init(req, res) {
      const serviceInstance = Container.get(PageService);
      let pages = await serviceInstance.getPages();
      const appInstance = Container.get(AppService);
      let app = await appInstance.getApp();
  
      res.render('./admin/contribute/list', {
        router : "contributes",
        siteConfig : config.siteConfig,
        pages : pages,
        app : app,
        role: req.session.user.role,
        username : req.session.user.name
      });
    };


    public async EditInit(req, res) {
      const serviceInstance = Container.get(PageService);
      let pages = await serviceInstance.getPages()
      const contributeInstance = Container.get(ContributeService);
      let dataProduct = await contributeInstance.getContributeInfo({
        _id : req.query.contributeId,
      } as IContribute)

      const appServiceInstance = Container.get(AppService);
      let app = await appServiceInstance.getApp();
  
      res.render('./admin/contribute/edit', {
        router : 'edit-contribute',
        siteConfig : config.siteConfig,
        data : dataProduct,
        app : app,
        pages : pages,
        role: req.session.user.role,
        username : req.session.user.name
      });
    }

    public async GetContributes(req, res) {
      const serviceInstance = Container.get(ContributeService);
      var responses = await serviceInstance.getContributes({
        query: req.query.search.value,
        start: parseInt(req.query["start"]),
        limit: parseInt(req.query["length"]),
        role: req.session.user.role,
      } as IContributeQuery);
  
      if (responses) {
        res.status(200).json({
          success: true,
          recordsTotal: responses.total,
          recordsFiltered: responses.total,
          data: {
            data: responses.items,
            role: req.session.user.role,
          },
        });
      } else {
        res.status(200).json({ success: false });
      }
    }

    public async AddContribute(req, res) {
      try {    
        const serviceInstance = Container.get(ContributeService);
        const item = await serviceInstance.addContribute({
          title: req.body.title,
          customer : req.body.customer as IContributeCustomer,
          type : req.body.type,
          content : req.body.content,
          date : req.body.date,
          address: req.body.address,
          files: req.body.files ,
        } as IContributeInputDTO);
        if(item){
            res.status(200).json({ success: true, data: item });
        }else {
          res.status(200).json({ success: false, data: '' });
        }
      } catch (e) {
        res.status(200).json({ success: false, data: '' });
      }
    }

    public async Delete(req, res) {
      try {
        const serviceInstance = Container.get(ContributeService);
        const dataImages = await serviceInstance.getFilesIntoContribute({
          _id: req.body._id,
        } as IContribute);

        var ArrayImage = [];
      dataImages.images.forEach(item => {
          const image = item.image;
          const thumbnailSizes = [150, 250, 480, 720, 1200, 1280, 1920];
          thumbnailSizes.forEach(size => {
              console.log(image.replace('images/', `thumbnail/${size}/`).replace(/\.(png|jpg|jpeg)$/i, '.webp'));
              ArrayImage.push(image.replace('images/', `thumbnail/${size}/`).replace(/\.(png|jpg|jpeg)$/i, '.webp'));
          });
          ArrayImage.push(image);
      });

        await this.RemoveFileAny(ArrayImage);
        const data = await serviceInstance.removeContribute({
          _id: req.body._id,
        } as IContribute);
        if (data) {
          res.status(200).json({ success: true});
        } else {
          res.status(200).json({ success: false });
        }
      } catch (e) {
        res.status(200).json({ success: false, data: '' });
      }
    }

    public async RemoveFileAny(pathOject : any){
      if(pathOject != null){
        pathOject.forEach( pathLink =>{
          fs.unlink(path.join(pathLink), (err) => {
            if (err) {
              console.log(err);
            }
          });
        })
      }
    }


}  