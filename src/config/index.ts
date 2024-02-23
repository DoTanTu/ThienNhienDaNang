import { resolve } from "path"

import { config } from "dotenv"

config({ path: resolve(__dirname, "../../.env.config") })

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.DB_HOST,
  databaseUser : process.env.DB_USER,
  databasePass : process.env.DB_PASS,
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  jwtCustomer: process.env.JWT_CUSTOMER_SECRET,
  
  jwtAPISecret: process.env.JWT_SECRET_API,

  secret : process.env.COOKIE_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  /**
   * Agendash config
   */
  agendash: {
    user: 'agendash',
    password: 'Fgdfgd345'
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api/v1/',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },

  admin:{
    user : process.env.DEV_USER,
    pass : process.env.DEV_PASS, //Alone531!123
  },

  siteConfig:{
    name: "COMCLICK",
    logo: "../public/admin/assets/img/comclick.svg",
  },

  image : {
    quality : 80,
    sizes : [
      {
        name : "1920",
        width: 1920,
        height: 1080
      },
     {
      name : "1280",
      width: 1280,
      height: 720
    },
    {
      name : "1200",
      width: 1200,
      height: 630
    },
    {
      name : "720",
      width: 720,
      height: 480
    },
    {
      name : "480",
      width: 480,
      height: 360
    },
    {
      name : "250",
      width: 250,
      height: 250
    },
    {
      name : "150",
      width: 150,
      height: 150
    }
  ]
  }
};