import { IUser } from './interfaces/IUser';
import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please enter a full name'],
    },

    username: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    avatar : {
      type: String,
      default: "",
    },

    backgroundImage : {
      type: String,
      default: "",
    },

    phone : {
      type: String,
      default: "",
    },

    email: String,

    password: String,

    savePassword: String,

    salt: String,

    isDelete: {
      type: Boolean,
      default: false,
    },

    isBlock: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: 'user',
    }
  },
  { timestamps: true, 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }},
);


export default mongoose.model<IUser & mongoose.Document>('UserDB', UserSchema);