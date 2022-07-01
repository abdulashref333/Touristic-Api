import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  getUpdatedDoc(oldDoc: any, newDoc: any) {
    Object.keys(newDoc).forEach((key) => {
      oldDoc[key] = newDoc[key];
    });
    return oldDoc;
  }
  parseQuery(query) {
    Object.keys(query).forEach((f) => (query[f] = JSON.parse(query[f])));
  }
}
