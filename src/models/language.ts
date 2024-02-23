import * as mongoose from 'mongoose';
import { ILanguage } from './interfaces/ILanguage';

const LanguageSchema = new mongoose.Schema({
    _id : {
        type: String,
        unique : true,
        index: true,
    },
    name: String,
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<ILanguage & mongoose.Document>('Language', LanguageSchema);