 // @ts-nocheck
import * as mongoose from 'mongoose';
import { IProduct } from './interfaces/IProduct';
const shortid = require('shortid');

const ProductSchema = new mongoose.Schema(
  {
    _id:{
      'type': String,
      'default': shortid.generate
    },
    url: {
      type: String,
    },
    pageId: {
      type: String,
    },
    categoryIds: [String],
    name: { type: String,text: true },
    linkVideo: String,
    desShort: { type: String,  default: ''},
    description: { type: String, text: true },
    descriptionPlus : [{
      title : { type: String,  default: ''},
      description: { type: String, text: true },
   }],
    images: [{
      _id:{
        'type': String,
        'default': shortid.generate
      },
      image: String,
      alt : String,
      name: String,
      author: String,
      address: String,
      copyright : String,
      source : String,
      year : String,
    }],
    pdf : { type: String,  default: ''},
    slide : { type: String,  default: ''},
    ecommerce: {
      _id: {
        type: String,
      },
      price: Number,
      priceSale: Number,
      quantity: Number,
      discount : Number,
      unit : String 
    },

    ecommercePlus: [{
      _id: {
        type: String,
      },
      images: [String],
      alts: [String],
      price: Number,
      priceSale: Number,
      quantity: Number,
      discount : Number,
      unit : String,
      atribute : [{
        id: {
          type: String,
        },
        code: {
          type: String,
        },
     }]
    }],
    additional : {
      _id:{
        'type': String,
        'default': shortid.generate
      },
      typeof : String,     
      copyright : String,
      publishYear : String,
      source : String,
      nameVn : String,
      nameEn : String,
      nameLa : String,
      typeEvent : String,
      dateStart : String,
      timeStart : String,
      dateEnd : String,
      timeEnd : String,
      address : String,
    },
    hashtags : [String],
    commentIds : [String],
    seoTitle: { type: String, intl: true, },
    seoName: { type: String, intl: true, },
    seoKeyWord: { type: String, intl: true, },
    seoDesc: { type: String, intl: true },
    status:  { type: String, default: ''},
    userPost:  { type: String, ref : 'UserDB'},
    authors : [{type : String, ref : 'Customer'}],
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    counter: { type: Number, default: 0 },
    languages : [{
      code : { type: String, default: ""},
      name :{ type: String, default: ""},
      desShort : { type: String,  default: ""  },
      description: { type: String, text: true },
      seoTitle: { type: String, default: "" } ,
      seoName: { type: String , default: "" },
      seoKeyWord : { type: String, default: ""  },
      seoDesc : { type: String, default: "" },
      price : { type: Number, default: 0 },
      unit : { type: String, default: "" },
      descriptionPlus : [{
        title : { type: String,  default: ''},
        description: { type: String, text: true },
     }],
    }],
    contact: {
      _id: {
        type: String,
      },
      name: String,
      email: String,
      phone: String,
      country: String,
    },
    showTop : {type: Boolean, default: false},
    label :  { type: String, default: "" },
    views : {type: Number, default: 0},
    likes : [String],
    shares : {type: Number, default: 0},
    downloads : {type: Number, default: 0}
  },
  { timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }},
  );

  ProductSchema.virtual('comments', {
    ref: 'Comment', 
    localField: '_id',  
    foreignField: 'productId', 
    justOne: false
  });

  ProductSchema.virtual('customers', {
    ref: 'Customer', 
    localField: 'additional.authorId',  
    foreignField: '_id', 
    justOne: false
  });
  

export default mongoose.model<IProduct & mongoose.Document>('Product', ProductSchema);
