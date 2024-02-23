import * as mongoose from 'mongoose';
import { ITicket } from './interfaces/ITicket';

const TicketSchema = new mongoose.Schema({
    title : String,
    description : String, 
    customerId: String,
    productIds : [String],
    message: [String],
    status : { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export default mongoose.model<ITicket & mongoose.Document>('Ticket', TicketSchema);