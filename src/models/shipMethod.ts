import * as mongoose from 'mongoose';
import { IShipMethod } from './interfaces/IShipMethod';
const shortid = require('shortid');

const ShipMethodSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate,
        unique : true,
    },
    name: String,
    image : String,
    price : String,
    status : String,
    isSelected: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IShipMethod & mongoose.Document>('ShipMethod', ShipMethodSchema);