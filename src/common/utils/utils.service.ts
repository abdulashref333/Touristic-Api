import { Injectable } from '@nestjs/common';

interface IQuery {
  filter: any;
  paging: any;
  sorting: any;
}
@Injectable()
export class UtilsService {
  getUpdatedDoc(oldDoc: any, newDoc: any) {
    Object.keys(newDoc).forEach((key) => {
      oldDoc[key] = newDoc[key];
    });
    return oldDoc;
  }
  parseQuery(query) {
    // console.log('query: ', query);
    Object.keys(query).forEach((f) => (query[f] = JSON.parse(query[f])));
    const newQuery: IQuery = {
      paging: {},
      filter: {},
      sorting: {},
    };
    Object.keys(query).forEach((f) => {
      if (f == 'paging') newQuery.paging = query[f];
      else if (f == 'sorting') newQuery.sorting = query[f];
      else newQuery.filter[f] = query[f];
    });
    // console.log('newQuery: ', newQuery);
    return newQuery;
  }
}
