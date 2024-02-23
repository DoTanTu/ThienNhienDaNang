import * as mongoose from 'mongoose';
import { IApp } from './interfaces/IApp';

const AppSchema = new mongoose.Schema({
  _id : {
    type: String,
    lowercase : true,
    unique : true,
    index: true,
  },
  url : {
    type: String,
    lowercase : true
  },
  name : { type: String , default: ""  },
  logo : { type: String, default: "" },
  platform : { type: String, default: "" },
  framework : { type: String, default: "" },
  module : {
    isOrder : {type: Boolean, default: false},
    isAuthen : {type: Boolean, default: false},
    isMail : {type: Boolean, default: false},
    isQr : {type: Boolean, default: false},
    isPaymentOnline : {type: Boolean, default: false},
  },
  setting:{
    queryProduct : { type: String, default: "" },
  },
  images : [String],
  cssPath : [String],
  jsPath : [String],
  htmlPath : [String],
  fontPath : [String],
  status : { type: String , default: ""  },
  hostName : { type: String , default: ""  }
}, {
  timestamps: true
});

export default mongoose.model<IApp & mongoose.Document>('App', AppSchema);