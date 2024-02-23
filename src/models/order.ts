import * as mongoose from 'mongoose';
import { IOrder } from './interfaces/IOrder';
const shortid = require('shortid');

const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
      unique: true,
    },

    customerId: { type: String, default :null },
    products: [
      {
        productId: { type: String, default :null },
        ecommercePlusId: { type: String, default :null },

        categoryId: { type: String, default :null },
        quantity: { type: String },
        price: { type: String },

        adult: { type: String },
        children: { type: String },
        timeStart: { type: Date },
        timeEnd: { type: Date },
        size: { type: String },
        color: { type: String },
        measures: { type: String },
        weight: { type: String },
        height: { type: String },
        width: { type: String },
      },
    ],

    note: { type: String },

    billingAddress: {
      fullname: { type: String },
      address: { type: String },
      phone: { type: String },
      email: { type: String },
    },

    shippingAddress: {
      shipCode: { type: String },
      fullname: { type: String },
      address: { type: String },
      phone: { type: String },
      email: { type: String },
    },

    customFields: [{
      displayName  : { type: String },
      fields : [{
         name : String,
         typeField: String,
         value : String
       }],
    }],

    shipId: { type: String, default :null },

    discount: {
      discount_code: { type: String },
      discount: { type: String },
    },

    paymendId: { type: String, default :null },

    subTotal: { type: String },
    total: { type: String },

    status: { type: String },
    paymentStatus: { type: String },

    is_delete: { type: Boolean, default: false },
    userPost:  { type: String, default: ''},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }},
  );

  OrderSchema.virtual('productList', {
    ref: 'Product', 
    localField: 'products.productId', 
    foreignField: '_id', 
    justOne: false,
    default: []
  });

  OrderSchema.virtual('categoryList', {
    ref: 'Category', 
    localField: 'products.categoryId', 
    foreignField: '_id', 
    justOne: false,
    default: []
  });

  OrderSchema.virtual('ship', {
    ref: 'ShipMethod', 
    localField: 'shipId', 
    foreignField: '_id', 
    justOne: true,
  });

  OrderSchema.virtual('paymend', {
    ref: 'PaymentMethod', 
    localField: 'paymendId', 
    foreignField: '_id', 
    justOne: true,
  });

export default mongoose.model<IOrder & mongoose.Document>('Order', OrderSchema);
