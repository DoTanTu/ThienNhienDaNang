import * as mongoose from 'mongoose';
import { IMail } from './interfaces/IMail';

const EmailSchema = new mongoose.Schema({
  mail : {
    type: String,
    lowercase : true
  },
  urlHost : {
    type: String,
    lowercase : true
  },
  password : { type: String , default: ""  },
  status : { type: String , default: ""  }
}, {
  timestamps: true
});

export default mongoose.model<IMail & mongoose.Document>('Email', EmailSchema);