import * as mongoose from 'mongoose';
import { IContact } from './interfaces/IContact';

const ContactSchema = new mongoose.Schema({
    name: String,
    address : String,
    linkMap : String,
    description : String,
    phone1: String,
    phone2: String,
    email: String,
    address2 : String,
    email2: String,
    linkMap2 : String,
    phone3: String,
    address3 : String,
    email3 : String,
    linkMap3 : String,
    facebook: String,
    zalo : String,
    youtube : String,
    whatapp : String,
    viber : String,
    ggAnalytic : String,
    ggSearch : String,
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IContact & mongoose.Document>('Contact', ContactSchema);