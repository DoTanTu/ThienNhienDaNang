import * as mongoose from 'mongoose';
import { IMessage } from './interfaces/IMessage';

const MessageSchema = new mongoose.Schema({
    name: String,
    title : String,
    content : String, 
    address : String,
    message : String,
    phone: String,
    email: String,
    productIds : [String],
    categoryIds : [String],
    isRead : { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    userPost:  { type: String, default: ''},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IMessage & mongoose.Document>('Message', MessageSchema);