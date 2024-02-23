import * as mongoose from 'mongoose';
import { IPaymentMethod } from './interfaces/IPaymentMethod';
const shortid = require('shortid');

const PaymentMethodSchema = new mongoose.Schema({
    _id:{
        type: String,
        default: shortid.generate,
        unique : true,
    },
    name: String,
    accountName: String,
    accountNumber  : String,
    bankName : String,
    status : String,
    sKey : String,
    pKey : String,
    paymentMethod : { type: String, default: "" },
    type : { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<IPaymentMethod & mongoose.Document>('PaymentMethod', PaymentMethodSchema);