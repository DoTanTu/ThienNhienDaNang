import expressLoader from './express';
import dependencyInjectorLoader from './di';
import mongooseLoader from './mongoose';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */
  
  const userModel = {
    name: 'userModel',
    model: require('../models/user').default,
  };

  const pageModel = {
    name: 'pageModel',
    model: require('../models/page').default,
  };

  const categoryModel = {
    name: 'categoryModel',
    model: require('../models/category').default,
  };

  const productModel = {
    name: 'productModel',
    model: require('../models/product').default,
  };

  const commentModel = {
    name: 'commentModel',
    model: require('../models/comment').default,
  }

  const contributeModel = {
    name: 'contributeModel',
    model: require('../models/contribute').default,
  }

  const customerModel = {
    name: 'customerModel',
    model: require('../models/customer').default,
  };

  const siteModel = {
    name: 'siteModel',
    model: require('../models/site').default,
  };

  const appModel = {
    name: 'appModel',
    model: require('../models/app').default,
  };

  const contactModel = {
    name: 'contactModel',
    model: require('../models/contact').default,
  };

  const messageModel = {
    name: 'messageModel',
    model: require('../models/message').default,
  };

  const languageModel = {
    name: 'languageModel',
    model: require('../models/language').default,
  };

  const productAttribute = {
    name: 'attributeModel',
    model: require('../models/attribute').default,
  };

  const orderModel = {
    name: 'orderModel',
    model: require('../models/order').default,
  };

  const shipMethodModel = {
    name: 'shipMethodModel',
    model: require('../models/shipMethod').default,
  };

  const paymentMethodModel = {
    name: 'paymentMethodModel',
    model: require('../models/paymentMethod').default,
  };

  const mailModel = {
    name: 'mailModel',
    model: require('../models/mail').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      pageModel,
      categoryModel,
      productModel,
      commentModel,
      contributeModel,
      customerModel,
      siteModel,
      appModel,
      contactModel,
      messageModel,
      languageModel,
      productAttribute,
      orderModel,
      shipMethodModel,
      paymentMethodModel,
      mailModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');
  Logger.info('✌️ Jobs loaded');
  await expressLoader({ app: expressApp, db : mongoConnection });
  Logger.info('✌️ Express loaded');
};