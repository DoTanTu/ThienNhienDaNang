import * as mongoose from 'mongoose';
import { ISite } from './interfaces/ISite';

const SiteSchema = new mongoose.Schema({
  url : {
    type: String,
    lowercase : true,
    unique : true,
    index: true,
  },
  name : { type: String , default: ""  },
  images : [String],
  cssPath : [String],
  jsPath : [String],
  htmlPath : { type: String , default: ""  },
  appId :  { type: String , default: ""  },
  pageData : {
    pageId: { type: String , default: ""  },
    isGetCategory :  {type: Boolean, default: false},
    isGetProduct : {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct :  {type: Number, default: 0},
  },
  pageOther1 : {
    pageId: { type: String , default: ""  },
    isGetCategory :  {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct :  {type: Number, default: 0},
  },
  pageOther2 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct :  {type: Number, default: 0},
  },
  pageOther3 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct :  {type: Number, default: 0},
  },
  pageOther4 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  pageOther5 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  pageOther6 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  pageOther7 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  pageOther8 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  pageOther9 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  pageOther10 : {
    pageId: { type: String , default: ""  },
    isGetCategory : {type: Boolean, default: false},
    isGetProduct :  {type: Boolean, default: false},
    isFullSizeProduct : {type: Boolean, default: false},
    isFullFieldProduct : {type: Boolean, default: false},
    limitSizeProduct : {type: Number, default: 0},
  },
  isShowInMenu :  {type: Boolean, default: false},
  isSubMenu :  {type: Boolean, default: false},
  isSiteCategoryDetail  : {type: Boolean, default: false},
  isSiteProductDetail  : {type: Boolean, default: false},
  isFullFieldProduct : {type: Boolean, default: true},
  isSiteGetDataOrder  : {type: Boolean, default: false},
  isSiteGetDataProfile  : {type: Boolean, default: false},
  subMenuCustom :[{
    name : {type: String, default: ""},
    url : {type: String, default: ""},
  }],
  seoTitle: { type: String,  default: "" } ,
  seoName: { type: String ,  default: "" },
  seoKeyWord : { type: String,  default: ""  },
  seoDesc : { type: String, default: "" },
  is_delete : {type: Boolean, default: false},
  status : { type: String , default: ""  }
 },
{ timestamps: true, 
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }},
);

SiteSchema.virtual('categories', {
  ref: 'Category', 
  localField: 'pageData.pageId', 
  foreignField: 'pageId', 
  justOne: false,
  // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

SiteSchema.virtual('products', {
  ref: 'Product', 
  localField: 'pageData.pageId', 
  foreignField: 'pageId', 
  justOne: false,
  options: { sort: { createdAt: -1 }, limit: 6 }
});

export default mongoose.model<ISite & mongoose.Document>('Site', SiteSchema);