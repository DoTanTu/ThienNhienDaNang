import * as mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  _id : {
    type: String,
    lowercase : true,
    unique : true,
    index: true,
  },
  name : { type: String ,  index: true, default: ""  },
  desc : { type: String ,  index: true, default: ""  },
  images : [String],
  setting: {
    isCategory : {type: Boolean, default: false},
    isAttribute: {type: Boolean, default: false},
    isImageDetail : {type: Boolean, default: false},
    isEcommerce: {type: Boolean, default: false},
    isPdf: {type: Boolean, default: false},
    isSlide: {type: Boolean, default: false},
    isLinkVideo: {type: Boolean, default: false},
    isProductContact: {type: Boolean, default: false},
    isLockDelete: {type: Boolean, default: false},
    isDescriptionPlus: {type: Boolean, default: false},
    isViewDemo: {type: Boolean, default: false},
    referencePageId : { type: String , default: ""  },
  },
  seoTitle: { type: String,  default: "" } ,
  seoName: { type: String ,  default: "" },
  seoKeyWord : { type: String,  default: ""  },
  seoDesc : { type: String, default: "" },
  is_delete : {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
}, {
  timestamps: true
});

export default mongoose.model('Page', PageSchema)