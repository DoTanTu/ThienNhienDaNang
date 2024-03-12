 // @ts-nocheck
 import * as mongoose from 'mongoose';
 import { IContribute } from './interfaces/IContribute';
 const shortid = require('shortid');
 
 const ContributeSchema = new mongoose.Schema(
   {
        _id:{
        'type': String,
        'default': shortid.generate
        },
        title: {
            type: String,
        },
        customer : {
            customerId: { type : String },
            fullname : { type : String},
            copyright : { type : String},
            phone : { type : String},
            address : { type : String, default : ''},
            email : { type : String, default : ''}
        },
        copyright : { type : String},
        status: {  type : Boolean , default : false },
        type : { type : String, default : ''},
        content : { type : String, default : ''},
        date : { type : String, default : ''},
        address: { type : String, default : ''},
        files: [{
            _id : {
                'type': String,
                'default': shortid.generate
            },
            name: { type : String},
            title : { type : String},
            file: { type : String},
            content : { type : String},
            date : { type : String},
            address : { type : String},
        }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        },
        {
        timestamps: true, 
        toJSON: { virtuals: true }, 
        toObject: { virtuals: true }
        },
   );
 
   ContributeSchema.virtual('comments', {
     ref: 'Comment', 
     localField: '_id',  
     foreignField: 'productId', 
     justOne: false
   });
 
 export default mongoose.model<IContribute & mongoose.Document>('Contribute', ContributeSchema);
 