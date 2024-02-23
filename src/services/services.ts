// import { IRepository } from "../repository/repository";
// import MongoDb from "../repository/mongodb";
// import * as Utils from "../utils/utils";

// export default class Service {
//   data: IRepository;

//   constructor() {
//     this.data = new MongoDb();
//   }

//   public async getUsers(): Promise<any[]> {
//     return this.data.getUsers();
//   }

//   public async getUserInfo(email : any): Promise<any> {
//     return this.data.getUserInfo(email);
//   }

//   public async removeUser(userId): Promise<any> {
//     return this.data.removeUser(userId);
//   }


//   //==========App==============
//   public async getApps(): Promise<any[]> {
//     return this.data.getApps();
//   }

//   public async insertApp(data): Promise<any> {
//     return this.data.insertApp(data);
//   }

//   public async editApp(data): Promise<any> {
//     return this.data.editApp(data);
//   }

//   public async removeApp(data): Promise<any> {
//     return this.data.removeApp(data);
//   }

//   public async getAppById(id): Promise<any> {
//     return this.data.getAppById(id);
//   }

//   //==========Category Report==============
//   public async getCategorieReports(): Promise<any[]> {
//     return this.data.getCategorieReports();
//   }

//   public async insertCategoryReport(category): Promise<any> {
//     return this.data.insertCategoryReport(category);
//   }

//   public async removeCategoryReport(category): Promise<any> {
//     return this.data.removeCategoryReport(category);
//   }

//   //==========Report==============

//   public async getReportByPackage(packageId): Promise<any[]> {
//     return this.data.getReportByPackage(packageId);
//   }

//   public async insertReport(data): Promise<any> {
//     return this.data.insertReport(data);
//   }

//   public async editReport(data): Promise<any> {
//     return this.data.editReport(data);
//   }

//   public async removeReport(data): Promise<any> {
//     return this.data.removeReport(data);
//   }

//   //==========Conversation=============
//   //Collection

//   public async getCourses(): Promise<any[]> {
//     return this.data.getCourses();
//   }

//   public async insertCourse(collection): Promise<any> {
//     return this.data.insertCourse(collection);
//   }

//   public async editCourse(collection): Promise<any> {
//     return this.data.editCourse(collection);
//   }

//   public async getCourseById(id): Promise<any> {
//     return this.data.getCourseById(id);
//   }

//   public async removeCourse(collection): Promise<any> {
//     return this.data.removeCourse(collection);
//   }
//   //Conversation
//   public async getTopLessons(role): Promise<any[]> {
//     return this.data.getTopLessons(role);
//   }

//   public async getLessons(): Promise<any[]> {
//     return this.data.getLessons();
//   }

//   public async insertLesson(productData): Promise<any> {
//     return this.data.insertLesson(productData);
//   }

//   public async editLesson(productData): Promise<any> {
//     return this.data.editLesson(productData);
//   }

//   public async removeLesson(productId): Promise<any> {
//     return this.data.removeLesson(productId);
//   }

//   public async forceUpdateAudio(lessonId): Promise<any> {
//     return this.data.forceUpdateAudio(lessonId, Date.now());
//   }

//   public async approveLesson(productId): Promise<any> {
//     return this.data.approveLesson(productId, Utils.STATUS.Approve.toString());
//   }

//   public async getLessonById(productId): Promise<any> {
//     return this.data.getLessonById(productId);
//   }

//   public async editIndexLesson(productId, index): Promise<any> {
//     return this.data.editIndexLesson(productId, index);
//   }

//   public async getLessonByCourse(id): Promise<any[]> {
//     return this.data.getLessonByCourse(id);
//   }

//   public async saveConfigTool(id, speakers, speed, pitch): Promise<any> {
//     return this.data.saveConfigTool(id, speakers, speed, pitch);
//   }
//   //=======================

//   //====LANGUAGE===========

//   public async getLanguages(): Promise<any[]> {
//     return this.data.getLanguages();
//   }

//   public async insertLanguage(language): Promise<any> {
//     return this.data.insertLanguage(language);
//   }

//   public async removeLanguage(language): Promise<any> {
//     return this.data.removeLanguage(language);
//   }

//   //=======================

//   //======API==============
//   public async getApiCourses(language): Promise<any[]> {
//     return this.data.getCourses();
//   }

//   public async getApiLessonByCourse(courseId, language, pos): Promise<any[]> {
//     return this.data.getApiLessonByCourse(courseId, language, pos);
//   }

//   //=====Translate Lesson======
//   public async getTranslateLessons(): Promise<any[]> {
//     return this.data.getTranslateLesson();
//   }

//   public async insertTranslateLesson(productData): Promise<any> {
//     return this.data.insertTranslateLesson(productData);
//   }

//   public async editTranslateLesson(productData): Promise<any> {
//     return this.data.editTranslateLesson(productData);
//   }

//   public async removeTranslateLesson(productId): Promise<any> {
//     return this.data.removeTranslateLesson(productId);
//   }

//   public async getTranslateLessonById(productId): Promise<any> {
//     return this.data.getTranslateLessonById(productId);
//   }

//   public async getTranslateById(id): Promise<any> {
//     return this.data.getTranslateById(id);
//   }

//   //==========Student==============
//   public async getStudents(): Promise<any[]> {
//     return this.data.getStudents();
//   }

//   public async insertStudent(data): Promise<any> {
//     return this.data.insertStudent(data);
//   }

//   public async editStudent(data): Promise<any> {
//     return this.data.editStudent(data);
//   }

//   public async removeStudent(data): Promise<any> {
//     return this.data.removeStudent(data);
//   }

//   public async getStudentById(id): Promise<any> {
//     return this.data.getStudentById(id);
//   }

//   public async getStudentByClass(id): Promise<any> {
//     return this.data.getStudentByClass(id);
//   }


//   public async activeTeacher(teacherId): Promise<any> {
//     return this.data.activeTeacher(teacherId);
//   }

//   public async assignClass(teacherId, dataClass): Promise<any> {
//     return this.data.assignClass(teacherId, dataClass);
//   }


//   //==========Class==============
//   public async getClasss(): Promise<any[]> {
//     return this.data.getClasss();
//   }

//   public async getClassByIds(ids : any): Promise<any[]> {
//     return this.data.getClassByIds(ids);
//   }

//   public async insertClass(data): Promise<any> {
//     return this.data.insertClass(data);
//   }

//   public async editClass(data): Promise<any> {
//     return this.data.editClass(data);
//   }

//   public async removeClass(data): Promise<any> {
//     return this.data.removeClass(data);
//   }

//   public async getClassById(id): Promise<any> {
//     return this.data.getClassById(id);
//   }


//   //==========Exam==============
//   public async getAllExams(): Promise<any[]> {
//     return this.data.getAllExams()
//   }

//   public async getExams(id : any): Promise<any[]> {
//     return this.data.getExams(id);
//   }

//   public async insertExam(data): Promise<any> {
//     return this.data.insertExam(data);
//   }

//   public async editExam(data): Promise<any> {
//     return this.data.editExam(data);
//   }

//   public async removeExam(data): Promise<any> {
//     return this.data.removeExam(data);
//   }

//   public async getExamById(id): Promise<any> {
//     return this.data.getExamById(id);
//   }

//    //==========Result Exam==============
//   public async getAllResults(): Promise<any[]> {
//     return this.data.getAllResults()
//   }

//   public async getResults(idUser : any): Promise<any[]> {
//     return this.data.getResults(idUser);
//   }

//   public async insertResultExam(data): Promise<any> {
//     return this.data.insertResultExam(data);
//   }

//   public async addCommentResultExam(data : any,text : any): Promise<any> {
//     return this.data.addCommentResultExam(data, text);
//   }

//    //==========Notification==============
//    public async getAllNotifications(): Promise<any[]> {
//     return this.data.getAllNotifications();
//   }

//    public async getAllNotificationsByTeacher(techerId : any): Promise<any[]> {
//     return this.data.getAllNotificationsByTeacher(techerId);
//   }

//    public async getNotifications(userId : any, classId: any): Promise<any[]> {
//     return this.data.getNotifications(userId, classId);
//   }

//   public async insertNotifications(dataResult: any): Promise<any> {
//     return this.data.insertNotifications(dataResult);
//   }

//   public async removeNotification(data): Promise<any> {
//     return this.data.removeNotification(data);
//   }
// }
