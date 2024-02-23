 // @ts-nocheck
import * as mongoose from 'mongoose';
import { IComment } from './interfaces/IComment';
const shortid = require('shortid');

const CommentSchema = new mongoose.Schema({
  _id:{
    'type': String,
    'default': shortid.generate
  },
  text : { type: String , index: true, default: ""  },
  isActive : { type: Boolean, default: false},
  is_delete : {type: Boolean, default: false},
  productId: { type: String, default: ""},
  userId: { type: String, default: ""},
  parentId: { type: String, default: ""},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
}, { timestamps: true, 
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }},
);

CommentSchema.virtual('products', {
  ref: 'Product', 
  localField: 'productId', 
  foreignField: '_id', 
  justOne: false
});


CommentSchema.virtual('customers', {
  ref: 'Customer', 
  localField: 'userId',  
  foreignField: '_id', 
  justOne: true
});

CommentSchema.virtual('users', {
  ref: 'Customer', 
  localField: 'userId',  
  foreignField: '_id', 
  justOne: true
});
export default mongoose.model<IComment & mongoose.Document>('Comment', CommentSchema)