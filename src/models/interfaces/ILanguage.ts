export interface ILanguage {
  _id: string;
  name: string,
}

export interface ILanguageQuery {
  query : string;
  start: any;
  limit: any;
}