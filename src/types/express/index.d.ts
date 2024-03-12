import { Document, Model } from 'mongoose';
import { IApp } from '../../models/interfaces/IApp';
import { ICategory } from '../../models/interfaces/ICategory';
import { IContact } from '../../models/interfaces/IContact';
import { ICustomer } from '../../models/interfaces/ICustomer';
import { ILanguage } from '../../models/interfaces/ILanguage';
import { IMessage } from '../../models/interfaces/IMessage';
import { IPage } from '../../models/interfaces/IPage';
import { IProduct } from '../../models/interfaces/IProduct';
import { IComment } from '../../models/interfaces/IComment';
import { IContribute } from '../../models/interfaces/IContribute';
import { IAttribute } from '../../models/interfaces/IAttribute';
import { ISite } from '../../models/interfaces/ISite';
import { IUser } from '../../models/interfaces/IUser';
import { IOrder } from '../../models/interfaces/IOrder';
import { IPaymentMethod } from '../../models/interfaces/IPaymentMethod';
import { IShipMethod } from '../../models/interfaces/IShipMethod';
import { IMail } from '../../models/interfaces/IMail';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type PageModel = Model<IPage & Document>;
    export type CategoryModel = Model<ICategory & Document>;
    export type ProductModel = Model<IProduct & Document>;
    export type CommentModel = Model<IComment & Document>;
    export type CustomerModel = Model<ICustomer & Document>;
    export type SiteModel = Model<ISite & Document>;
    export type AppModel = Model<IApp & Document>;
    export type ContactModel = Model<IContact & Document>;
    export type ContributeModel = Model<IContribute & Document>;
    export type MessageModel = Model<IMessage & Document>;
    export type LanguageModel = Model<ILanguage & Document>;
    export type AttributeModel = Model<IAttribute & Document>;
    export type OrderModel = Model<IOrder & Document>;
    export type ShipMethodModel = Model<IShipMethod & Document>;
    export type PaymentMethodModel = Model<IPaymentMethod & Document>;
    export type MailModel = Model<IMail & Document>;
  }
}