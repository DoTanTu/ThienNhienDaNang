var mongoose = require('mongoose');
import config from '../config';

export default async (): Promise<any> => {
  const connection = await mongoose.connect(config.databaseURL, {
    user: config.databaseUser,
    pass: config.databasePass,
    keepAlive: true, 
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useCreateIndex : true,
  });
  return connection.connection;
};