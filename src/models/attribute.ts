import * as mongoose from 'mongoose';
import { IAttribute } from './interfaces/IAttribute';
const shortid = require('shortid');

const AttributeSchema = new mongoose.Schema({
    _id:{
      'type': String,
      'default': shortid.generate
    },
    tag : String,
    name : String,
    pageId: {
        type: String,
      },
    values : [{
      code : String,
      value : String,
      images : [String],
    }],
    isMutipleSelection : { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IAttribute & mongoose.Document>('Attribute', AttributeSchema);