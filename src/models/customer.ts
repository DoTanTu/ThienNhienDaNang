import { ICustomer } from './interfaces/ICustomer';
import * as mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please enter a full name'],
    },

    avatar : {
      type: String,
      default: "",
    },

    backgroundImage : {
      type: String,
      default: "",
    },

    username: {
      type: String,
      lowercase: true,
    },

    token: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address : {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    contributes: [{
      type: String
    }],

    links : [{
      option  : String,
      title : String,
      url : String,
    }],

    password: String,

    salt: String,

    isDelete: {
      type: Boolean,
      default: false,
    },

    isBlock: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    downloads : [{
      type: String,
      ref: 'Product',
    }],

    role: {
      type: String,
      default: 'Customer',
    },
    userPost:  { type: String, default: ''},
  },
  { timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }},
);

CustomerSchema.virtual('products', {
  ref: 'Product', 
  localField: '_id',  
  foreignField: 'additional.authorId', 
  justOne: false
});

CustomerSchema.virtual('downloadedProducts', {
  ref: 'Product',
  localField: 'downloads',
  foreignField: '_id',
  justOne: false,
});

CustomerSchema.virtual('contributeItems', {
  ref: 'Contribute', 
  localField: '_id',  
  foreignField: 'customer.customerId', 
  justOne: false
});

export default mongoose.model<ICustomer & mongoose.Document>('Customer', CustomerSchema);