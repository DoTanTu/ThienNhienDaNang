import * as mongoose from 'mongoose';
const shortid = require('shortid');

const CategorySchema = new mongoose.Schema({
  _id:{
    'type': String,
    'default': shortid.generate
  },
  url : { type: String, lowercase : true,  default: "" },
  pageId : {
    type: String,
    index: true,
  },
  name : { type: String ,  index: true,  default: ""  },
  desc : { type: String,  default: ""  },
  description: { type: String, text: true },
  images: [String],
  alts: [String],
  seoTitle: { type: String, default: "" } ,
  seoName: { type: String , default: "" },
  seoKeyWord : { type: String, default: ""  },
  seoDesc : { type: String, default: "" },
  parents : { type: String, default: "" },
  status : { type: String, default: "" },
  languages : [{
    code : { type: String ,  index: true,  default: ""  },
    name :{ type: String, default: ""},
    desc : { type: String,  default: ""  },
    description : { type: String, text: true },
    seoTitle: { type: String, default: "" } ,
    seoName: { type: String , default: "" },
    seoKeyWord : { type: String, default: ""  },
    seoDesc : { type: String, default: "" },
  }],
  level : { type: String, default: "" },
  showTop : {type: Boolean, default: false},
  is_delete : {type: Boolean, default: false},
  userPost:  { type: String, default: ''},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
},
{ timestamps: true, 
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }},
);

CategorySchema.virtual('products', {
  ref: 'Product', 
  localField: '_id', 
  foreignField: 'categoryIds', 
  justOne: false
});

CategorySchema.virtual('languagesOjb', {
  ref: 'Category', 
  localField: 'languages._id', 
  foreignField: 'languages._id', 
  justOne: true,
});

export default mongoose.model('Category', CategorySchema)