import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import * as express from 'express';
import Logger from './setup/logger';
// const https = require("https");
const fs = require("fs");
const path = require('path');

async function startServer() {
  const app = express();

  await require('./setup/index').default({ expressApp: app });

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port}
          Please access http://localhost:${config.port}/admin/login
      🛡️ 
      ################################################
    `);
  });

  // const options = {
  //   key: fs.readFileSync(path.join(__dirname, './config/localhost-key.pem')),
  //   cert: fs.readFileSync(path.join(__dirname, './config/localhost.pem')),
  // };
  // https.createServer(options, app).listen(8080, () => {
  //   console.log(`HTTPS server started on port 8080`);
  // });
}

startServer();