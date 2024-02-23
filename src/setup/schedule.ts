const schedule = require('node-schedule');
import Logger from './logger';

//not run
export default class ScheduleIP {
  constructor(){
      // this.InitSchedule()
  }
  

  static init(): ScheduleIP {
      return new ScheduleIP();
  }

  public async InitSchedule() {
      schedule.scheduleJob("*/1 * * * *", this.MyTest);
      // schedule.scheduleJob("*/10 * * * *", this.ResetIp);
      Logger.info('✌️ Schedule running');
  }

  public async MyTest(){

  }
}